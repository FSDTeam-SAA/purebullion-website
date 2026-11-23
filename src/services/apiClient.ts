import { getSession, signOut } from "next-auth/react";
import { ApiErrorResponse } from "@/types/auth.types";

/**
 * Fetch-based API client (no axios). Exposes a tiny axios-like surface
 * (`apiClient.get/post/put/patch/delete` -> `{ data }`) so services stay simple.
 * Auth: the access token comes from the NextAuth session; on 401 we try the
 * backend refresh endpoint once and retry, otherwise we sign the user out.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000/api/v1";

const DASHBOARD_PREFIXES = [
  "/dashboard", "/signals", "/stock-scanner", "/market-data", "/watchlist",
  "/news-research", "/alerts", "/community", "/ai-assistant", "/subscription", "/settings",
];

type Params = object;

export interface RequestConfig {
  params?: Params;
  headers?: Record<string, string>;
  responseType?: "json" | "blob" | "text";
  signal?: AbortSignal;
  timeout?: number;
}

export interface ApiClientResponse<T> {
  data: T;
  status: number;
  headers: Headers;
}

function isValidJwt(token: string | null | undefined): token is string {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    if (typeof payload.exp === "number" && Date.now() >= (payload.exp - 10) * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

function safeStorage() {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

async function getAccessToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  const store = safeStorage();
  const stored = store?.getItem("accessToken");
  if (isValidJwt(stored)) return stored;
  try {
    const session = await getSession();
    const token = (session?.user as { accessToken?: string | null } | undefined)?.accessToken;
    if (isValidJwt(token)) {
      store?.setItem("accessToken", token);
      return token;
    }
  } catch {
    /* ignore */
  }
  store?.removeItem("accessToken");
  return null;
}

function buildUrl(url: string, params?: Params) {
  const full = /^https?:\/\//.test(url) ? url : `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  if (!params) return full;
  const qs = new URLSearchParams();
  Object.entries(params as Record<string, unknown>).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") qs.append(k, String(v));
  });
  const s = qs.toString();
  return s ? `${full}${full.includes("?") ? "&" : "?"}${s}` : full;
}

function extractMessage(data: ApiErrorResponse | null, fallback: string): string {
  if (!data) return fallback;
  if (Array.isArray(data.errorSources) && data.errorSources.length > 0) {
    const msgs = data.errorSources.map((s) => s.message).filter(Boolean);
    if (msgs.length) return msgs.join(", ");
  }
  if (data.error?.message) return data.error.message;
  if (Array.isArray(data.message)) return data.message.join(", ");
  if (typeof data.message === "string" && data.message) return data.message;
  return fallback;
}

let refreshing: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    const store = safeStorage();
    let refreshToken = store?.getItem("refreshToken") ?? null;
    if (!refreshToken) {
      try {
        const session = await getSession();
        refreshToken = (session?.user as { refreshToken?: string | null } | undefined)?.refreshToken ?? null;
      } catch {
        /* ignore */
      }
    }
    if (!refreshToken) return null;
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh-access-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const json = await res.json().catch(() => null);
      const access = json?.data?.accessToken;
      if (res.ok && isValidJwt(access)) {
        store?.setItem("accessToken", access);
        if (json.data.refreshToken) store?.setItem("refreshToken", json.data.refreshToken);
        return access;
      }
    } catch {
      /* ignore */
    }
    return null;
  })().finally(() => {
    refreshing = null;
  });
  return refreshing;
}

async function request<T>(
  method: string,
  url: string,
  body?: unknown,
  config: RequestConfig = {},
  retried = false
): Promise<ApiClientResponse<T>> {
  const headers: Record<string, string> = { ...(config.headers ?? {}) };
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  if (body !== undefined && !isForm && !headers["Content-Type"]) headers["Content-Type"] = "application/json";

  if (!headers.Authorization) {
    const token = await getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.timeout ?? 15000);
  config.signal?.addEventListener("abort", () => controller.abort());

  let res: Response;
  try {
    res = await fetch(buildUrl(url, config.params), {
      method,
      headers,
      body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    if ((err as Error)?.name === "AbortError") throw new Error("Request timed out. Please check your connection.");
    throw new Error("Cannot connect to the server. Please ensure the backend is running.");
  }
  clearTimeout(timer);

  const isAuthRoute = url.includes("/auth/login") || url.includes("/auth/refresh-access-token");
  if (res.status === 401 && !retried && !isAuthRoute) {
    const fresh = await refreshAccessToken();
    if (fresh) {
      return request<T>(method, url, body, { ...config, headers: { ...config.headers, Authorization: `Bearer ${fresh}` } }, true);
    }
    const store = safeStorage();
    store?.removeItem("accessToken");
    store?.removeItem("refreshToken");
    if (typeof window !== "undefined" && DASHBOARD_PREFIXES.some((p) => window.location.pathname.startsWith(p))) {
      signOut({ callbackUrl: "/login?error=SessionExpired" });
    }
  }

  if (!res.ok) {
    const errJson = (await res.json().catch(() => null)) as ApiErrorResponse | null;
    throw new Error(extractMessage(errJson, "An unexpected error occurred. Please try again."));
  }

  let data: unknown;
  if (config.responseType === "blob") data = await res.blob();
  else if (config.responseType === "text") data = await res.text();
  else {
    const text = await res.text();
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }
  }
  return { data: data as T, status: res.status, headers: res.headers };
}

export const apiClient = {
  get: <T = unknown>(url: string, config?: RequestConfig) => request<T>("GET", url, undefined, config),
  delete: <T = unknown>(url: string, config?: RequestConfig) => request<T>("DELETE", url, undefined, config),
  post: <T = unknown>(url: string, body?: unknown, config?: RequestConfig) => request<T>("POST", url, body, config),
  put: <T = unknown>(url: string, body?: unknown, config?: RequestConfig) => request<T>("PUT", url, body, config),
  patch: <T = unknown>(url: string, body?: unknown, config?: RequestConfig) => request<T>("PATCH", url, body, config),
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "Something went wrong. Please try again.";
}
