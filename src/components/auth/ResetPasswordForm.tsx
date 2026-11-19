"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import GoldButton from "@/components/website/shared/GoldButton";
import { mockResetPassword } from "@/lib/mock-auth";
import { validatePassword } from "@/lib/validators";
import AuthField from "./AuthField";
import AuthShell from "./AuthShell";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    const pw = validatePassword(password);
    if (pw) next.password = pw;
    if (confirm !== password) next.confirm = "Passwords do not match";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    const res = await mockResetPassword(password);
    setLoading(false);
    if (!res.ok) return toast.error(res.message ?? "Could not reset password");
    toast.success("Password updated. Please log in.");
    router.push("/login");
  }

  return (
    <AuthShell
      title="Reset Password?"
      description="Please enter a new password for your account. Use a strong password to keep your account secure."
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <AuthField label="New Password" type="password" placeholder="********************"
            autoComplete="new-password" value={password}
            onChange={(e) => setPassword(e.target.value)} error={errors.password} />
          <AuthField label="Confirm Password" type="password" placeholder="********************"
            autoComplete="new-password" value={confirm}
            onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} />
        </div>
        <GoldButton type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Change Password"}
        </GoldButton>
      </form>
    </AuthShell>
  );
}
