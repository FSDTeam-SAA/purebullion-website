"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import GoldButton from "@/components/website/shared/GoldButton";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/services/apiClient";
import { isEmail } from "@/lib/validators";
import AuthField from "./AuthField";
import AuthShell from "./AuthShell";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEmail(email)) return setError("Enter a valid email address");
    setError(undefined);
    setLoading(true);

    try {
      await authService.forgotPassword({ email: email.trim() });
      toast.success("Verification code sent to your email.");
      router.push(`/verify-email?email=${encodeURIComponent(email.trim())}&next=reset-password`);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Forgot Password?"
      description="Enter your email and we’ll send you a code to reset your password"
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
        <AuthField
          label="Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
        />
        <GoldButton type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Continue"}
        </GoldButton>
      </form>
    </AuthShell>
  );
}
