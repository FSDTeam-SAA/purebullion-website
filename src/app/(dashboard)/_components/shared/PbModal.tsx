"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PbModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  /** optional leading icon tile next to the title */
  icon?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

/** Shared dark modal shell (blurred backdrop, title row w/ close, footer actions). */
export function PbModal({ open, onOpenChange, title, icon, description, children, footer, className }: PbModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "pb-dashboard fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[#2a3236] bg-[#0c1011] font-raleway text-pb-text shadow-2xl focus:outline-none",
            className
          )}
        >
          <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-6">
            <div className="flex items-center gap-3">
              {icon && (
                <span className="flex size-9 items-center justify-center rounded border border-[#2a3236] bg-[#121719]">
                  {icon}
                </span>
              )}
              <div>
                <DialogPrimitive.Title className="text-[20px] font-semibold leading-normal">{title}</DialogPrimitive.Title>
                {description && (
                  <DialogPrimitive.Description className="mt-1 text-[16px] text-pb-muted">{description}</DialogPrimitive.Description>
                )}
              </div>
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center rounded border border-[#2a3236] bg-[#121719] text-pb-muted hover:text-white"
            >
              <XCircle className="size-4" />
            </DialogPrimitive.Close>
          </div>
          {children && <div className="px-6 pb-4">{children}</div>}
          {footer && <div className="flex justify-end gap-3 border-t border-[#2a3236] px-6 py-4">{footer}</div>}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
