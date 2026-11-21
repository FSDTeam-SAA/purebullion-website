"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import GoldButton from "@/components/website/shared/GoldButton";
import { mockRegister } from "@/lib/mock-auth";
import { isEmail, validatePassword } from "@/lib/validators";
import AuthCheckbox from "./AuthCheckbox";
import AuthField from "./AuthField";
import AuthFooterLink from "./AuthFooterLink";
import AuthShell from "./AuthShell";

type Errors = Partial<Record<"fullName" | "email" | "password" | "confirm" | "terms", string>>;

export default function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    if (form.fullName.trim().length < 2) next.fullName = "Enter your full name";
    if (!isEmail(form.email)) next.email = "Enter a valid email address";
    const pw = validatePassword(form.password);
    if (pw) next.password = pw;
    if (form.confirm !== form.password) next.confirm = "Passwords do not match";
    if (!agree) next.terms = "You must accept the terms to continue";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const res = await mockRegister(form);
    setLoading(false);
    if (!res.ok) return toast.error(res.message ?? "Sign up failed");
    toast.success("Account created. Check your email for the code.");
    router.push(`/verify-email?email=${encodeURIComponent(form.email)}&next=login`);
  }

  const legal = "text-pb-bronze hover:underline";

  return (
    <AuthShell title="Sign Up" description="Complete your information below." compact>
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <AuthField label="Full name" placeholder="Enter your full name" autoComplete="name"
            value={form.fullName} onChange={set("fullName")} error={errors.fullName} />
          <AuthField label="Email" type="email" placeholder="Enter your email" autoComplete="email"
            value={form.email} onChange={set("email")} error={errors.email} />
          <AuthField label="New Password" type="password" placeholder="********************"
            autoComplete="new-password" value={form.password} onChange={set("password")} error={errors.password} />
          <AuthField label="Confirm Password" type="password" placeholder="********************"
            autoComplete="new-password" value={form.confirm} onChange={set("confirm")} error={errors.confirm} />
        </div>

        <div className="flex flex-col gap-1">
          <AuthCheckbox checked={agree} onChange={(e) => setAgree(e.target.checked)}>
            I agree to the{" "}
            <Link href="/terms-of-service" className={legal}>Terms of service</Link>,{" "}
            <Link href="/privacy-policy" className={legal}>Privacy policy</Link> and{" "}
            <Link href="/privacy-policy" className={legal}>Risk disclosure</Link>, and I understand
            Pure Bullion does not execute trades or provide investment advice.
          </AuthCheckbox>
          {errors.terms && <p className="text-sm text-red-400">{errors.terms}</p>}
        </div>

        <GoldButton type="submit" disabled={loading} className="w-full">
          {loading ? "Creating account..." : "Sign in"}
        </GoldButton>

        <AuthFooterLink text="Already have an account?" linkText="Log in" href="/login" />
      </form>
    </AuthShell>
  );
}
