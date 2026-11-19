"use client";

import Image from "next/image";
import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AuthFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/** Gold-outlined input (Figma "Input Field"). Password type gets the eye toggle. */
const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  ({ label, error, id, type = "text", className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex w-full flex-col justify-center gap-3">
        <label htmlFor={inputId} className="text-base leading-normal text-white">
          {label}
        </label>
        <div
          className={cn(
            "flex h-12 items-center gap-2 rounded-lg border bg-transparent px-3 py-2 transition-colors focus-within:border-pb-gold",
            error ? "border-red-500" : "border-pb-bronze-dark",
          )}
        >
          <input
            ref={ref}
            id={inputId}
            type={isPassword && visible ? "text" : type}
            className={cn(
              "min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-[#c8c8c8]",
              className,
            )}
            aria-invalid={!!error}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Hide password" : "Show password"}
              className="relative size-6 shrink-0"
            >
              <Image
                src="/icons/auth/eye-slash.svg"
                alt=""
                width={24}
                height={24}
                className={cn("transition-opacity", visible && "opacity-100 brightness-150")}
              />
            </button>
          )}
        </div>
        {error && <p className="-mt-1 text-sm text-red-400">{error}</p>}
      </div>
    );
  },
);
AuthField.displayName = "AuthField";

export default AuthField;
