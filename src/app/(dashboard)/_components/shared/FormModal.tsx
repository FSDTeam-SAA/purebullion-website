"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

type FormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** path of a 24px svg shown in the leading icon tile */
  iconSrc: string;
  /** intrinsic icon size, default 24x24 */
  iconSize?: [number, number];
  children: React.ReactNode;
  /** action buttons, right aligned in the footer */
  footer: React.ReactNode;
  className?: string;
};

/** Exact Figma dialog (500px, #121719, header + footer hairlines) used by subscription and settings modals. */
export function FormModal({ open, onOpenChange, title, iconSrc, iconSize = [24, 24], children, footer, className }: FormModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[11px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "pb-dashboard fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-lg border border-[#293033] bg-[#121719] font-raleway text-pb-text focus:outline-none",
            className
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#697370] px-6 pb-5 pt-7">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[#222a2d]">
                <Image src={iconSrc} alt="" width={iconSize[0]} height={iconSize[1]} />
              </span>
              <DialogPrimitive.Title className="text-[24px] font-bold leading-[1.2] text-pb-text">{title}</DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center rounded-md border border-[#222a2d] hover:bg-white/5"
            >
              <Image src="/icons/subscription/x-circle.svg" alt="" width={14} height={14} />
            </DialogPrimitive.Close>
          </div>
          <div className="flex flex-col gap-4 px-6 pb-4 pt-6">{children}</div>
          <div className="flex justify-end gap-4 border-t border-[#293033] pb-5 pr-6 pt-4">{footer}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
