"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import GoldButton from "@/components/website/shared/GoldButton";
import { mockRequestResetCode, mockVerifyCode } from "@/lib/mock-auth";
import { cn } from "@/lib/utils";
import AuthShell from "./AuthShell";

const LENGTH = 6;
const RESEND_SECONDS = 30;

export default function VerifyEmailForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "you@gmail.com";
  const next = params.get("next") === "reset-password" ? "/reset-password" : "/login";

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
    await mockRequestResetCode(email);
    setSeconds(RESEND_SECONDS);
    toast.success("A new code has been sent");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await mockVerifyCode(digits.join(""));
    setLoading(false);
    if (!res.ok) return toast.error(res.message ?? "Invalid code");
    toast.success("Email verified");
    router.push(next);
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
