"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { toast } from "sonner";
import GoldButton from "@/components/website/shared/GoldButton";
import { isEmail } from "@/lib/validators";
import AuthCheckbox from "./AuthCheckbox";
import AuthField from "./AuthField";
import AuthFooterLink from "./AuthFooterLink";
import AuthShell from "./AuthShell";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  // Pre-fill the email (and tick the box) for users who chose "Remember me" last time.
  useEffect(() => {
    try {
      if (localStorage.getItem("pb_remember") === "1") {
        setRemember(true);
        setEmail(localStorage.getItem("pb_remember_email") ?? "");
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    if (errorParam === "CredentialsSignin") {
      toast.error("Invalid email or password");
    } else if (errorParam === "SessionExpired") {
      toast.error("Your session has expired. Please log in again.");
    } else if (errorParam) {
      toast.error(decodeURIComponent(errorParam));
    }
  }, [errorParam]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = "Enter a valid email address";
    if (!password) next.password = "Password is required";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setLoading(false);
        return toast.error(res.error || "Invalid email or password");
      }

      // Sync access and refresh tokens to localStorage for apiClient
      try {
        const session = await getSession();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sessionUser = session?.user as any;
        const token = sessionUser?.accessToken;
        const refreshToken = sessionUser?.refreshToken;
        if (token) {
          localStorage.setItem("accessToken", token);
        }
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }
        if (sessionUser?.role) {
          localStorage.setItem("userRole", sessionUser.role);
        }
      } catch {
        // ignore storage fallback
      }

      // "Remember me": keep the login across browser restarts. Otherwise RememberGuard
      // ends the session once the browser/tab session is closed.
      try {
        localStorage.setItem("pb_remember", remember ? "1" : "0");
        if (remember) localStorage.setItem("pb_remember_email", email.trim());
        else localStorage.removeItem("pb_remember_email");
        sessionStorage.setItem("pb_session_active", "1");
      } catch {
        /* storage unavailable */
      }

      toast.success("Welcome back!");
      if (callbackUrl.startsWith("http")) {
        window.location.href = callbackUrl;
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      description="Please enter your email & password to access your account."
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <AuthField
            label="Email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <AuthField
            label="Password"
            type="password"
            placeholder="********************"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <div className="flex items-center justify-between">
            <AuthCheckbox checked={remember} onChange={(e) => setRemember(e.target.checked)}>
              Remember me
            </AuthCheckbox>
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-pb-bronze-dark hover:underline"
            >
              Forgot Password
            </Link>
          </div>
        </div>

        <GoldButton type="submit" disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Log in"}
        </GoldButton>

        <AuthFooterLink text="Don’t have an account?" linkText="Create account" href="/register" />
      </form>
    </AuthShell>
  );
}
