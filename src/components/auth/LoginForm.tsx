"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import GoldButton from "@/components/website/shared/GoldButton";
import { DASHBOARD_URL, mockLogin } from "@/lib/mock-auth";
import { isEmail } from "@/lib/validators";
import AuthCheckbox from "./AuthCheckbox";
import AuthField from "./AuthField";
import AuthFooterLink from "./AuthFooterLink";
import AuthShell from "./AuthShell";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!isEmail(email)) next.email = "Enter a valid email address";
    if (!password) next.password = "Password is required";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const res = await mockLogin(email, password);
    setLoading(false);
    if (!res.ok) return toast.error(res.message ?? "Login failed");
    toast.success("Welcome back!");
    if (DASHBOARD_URL.startsWith("http")) window.location.href = DASHBOARD_URL;
    else router.push(DASHBOARD_URL);
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
