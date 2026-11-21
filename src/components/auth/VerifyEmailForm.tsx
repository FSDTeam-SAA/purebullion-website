"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import GoldButton from "@/components/website/shared/GoldButton";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/services/apiClient";
import { cn } from "@/lib/utils";
import AuthShell from "./AuthShell";

const LENGTH = 6;
const RESEND_SECONDS = 30;

export default function VerifyEmailForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "you@gmail.com";
  const isResetFlow = params.get("next") === "reset-password";

  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  function update(index: number, value: string) {
    const v = value.replace(/\D/g, "").slice(-1);
    setDigits((d) => d.map((x, i) => (i === index ? v : x)));
    if (v && index < LENGTH - 1) refs.current[index + 1]?.focus();
  }

  function onKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[index] && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowLeft" && index > 0) refs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < LENGTH - 1) refs.current[index + 1]?.focus();
  }

  function onPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!text) return;
    e.preventDefault();
    setDigits(Array.from({ length: LENGTH }, (_, i) => text[i] ?? ""));
    refs.current[Math.min(text.length, LENGTH - 1)]?.focus();
  }

  async function resend() {
    if (seconds > 0) return;
    try {
      if (isResetFlow) {
        await authService.forgotPassword({ email });
      } else {
        await authService.resendVerification({ email });
      }
      setSeconds(RESEND_SECONDS);
      toast.success("A new 6-digit code has been sent to your email");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < LENGTH) {
      return toast.error("Please enter the complete 6-digit code");
    }

    setLoading(true);
    try {
      if (isResetFlow) {
        const res = await authService.verifyResetCode({ email, code });
        const resetToken = res.data?.resetToken;
        if (typeof window !== "undefined" && resetToken) {
          sessionStorage.setItem("pb_reset_token", resetToken);
        }
        toast.success("Code verified! You can now set a new password.");
        router.push(
          `/reset-password?email=${encodeURIComponent(email)}${resetToken ? `&token=${encodeURIComponent(resetToken)}` : ""}`
        );
      } else {
        await authService.verifyEmail({ email, code });
        toast.success("Email verified successfully! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Verify your email" description={`we sent a 6-digit code to ${email}`}>
      <form onSubmit={onSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex w-full items-center gap-2 sm:gap-4" onPaste={onPaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                value={d}
                inputMode="numeric"
                autoComplete={i === 0 ? "one-time-code" : "off"}
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
                onChange={(e) => update(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                className={cn(
                  "h-14 min-w-0 flex-1 rounded-xl bg-[rgba(245,247,255,0.2)] text-center text-2xl text-white outline-none transition-colors focus:ring-1 focus:ring-pb-gold sm:h-16 sm:text-[32px]",
                  d && "bg-[rgba(245,247,255,0.3)]",
                )}
              />
            ))}
          </div>
          <p className="flex items-center justify-center gap-3 text-base">
            <span className="text-[#c8c8c8]">Didn&apos;t receive it ?</span>
            <button
              type="button"
              onClick={resend}
              disabled={seconds > 0}
              className="text-pb-bronze-dark hover:underline disabled:no-underline"
            >
              {seconds > 0 ? `Resend code (${seconds}s)` : "Resend code"}
            </button>
          </p>
        </div>
        <GoldButton type="submit" disabled={loading || digits.some((d) => !d)} className="w-full">
          {loading ? "Verifying..." : "Verify"}
        </GoldButton>
      </form>
    </AuthShell>
  );
}
