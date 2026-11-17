"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  cancelLabel?: string;
  confirmLabel: string;
  onConfirm: () => void;
  confirmDisabled?: boolean;
  className?: string;
};

/** Community modal shell: #121719 card, blurred backdrop, title + close, Cancel / gold confirm footer. */
export function ModalShell({
  open, onOpenChange, title, description, children, cancelLabel = "Cancel", confirmLabel, onConfirm, confirmDisabled, className,
}: Props) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[11px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "pb-dashboard fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100vh-32px)] w-[calc(100%-2rem)] max-w-[605px] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 overflow-y-auto rounded-xl border border-[#293033] bg-[#121719] p-6 font-raleway text-pb-text focus:outline-none",
            className
          )}
        >
          <div className="flex items-center justify-between pb-5 pt-7">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <DialogPrimitive.Title className="text-[24px] font-bold leading-[1.2] text-pb-text">{title}</DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="pr-4 text-[16px] text-pb-muted">{description}</DialogPrimitive.Description>
              ) : (
                <DialogPrimitive.Description className="sr-only">{title}</DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close
              aria-label="Close"
              className="flex size-9 shrink-0 items-center justify-center rounded-[6px] border border-[#222a2d] text-pb-muted hover:text-white"
            >
              <XCircle className="size-[14px]" />
            </DialogPrimitive.Close>
          </div>
          {children}
          <div className="flex flex-col gap-3">
            <div className="h-px w-full bg-white/10" />
            <div className="flex items-start justify-end gap-3">
              <Button variant="outline-white" className="h-[51px] rounded-lg px-8 text-[16px]" onClick={() => onOpenChange(false)}>
                {cancelLabel}
              </Button>
              <Button variant="gold" className="h-[51px] rounded-lg px-8 text-[16px]" onClick={onConfirm} disabled={confirmDisabled}>
                {confirmLabel}
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
