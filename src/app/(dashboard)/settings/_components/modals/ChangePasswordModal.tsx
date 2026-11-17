"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormModal } from "../../../_components/shared/FormModal";
import { btn, btnLight } from "../btn";
import { passwordFields } from "../data";

type Props = { open: boolean; onOpenChange: (o: boolean) => void };

export function ChangePasswordModal({ open, onOpenChange }: Props) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Change password"
      iconSrc="/icons/settings/lock-bold.svg"
      footer={
        <>
          <Button variant="light" className={btnLight} onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="gold" className={btn} onClick={() => onOpenChange(false)}>
            Change password
          </Button>
        </>
      }
    >
      {passwordFields.map((f) => (
        <div key={f.id} className="flex flex-col gap-2">
          <label htmlFor={`pw-${f.id}`} className="text-[16px] leading-[1.2] text-pb-muted">
            {f.label}
          </label>
          <div className="relative">
            <Image src="/icons/settings/lock.svg" alt="" width={20} height={20} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              id={`pw-${f.id}`}
              type="password"
              placeholder="*********"
              autoComplete={f.id === "current" ? "current-password" : "new-password"}
              className="h-12 rounded-lg border-[#a37b3c] bg-transparent pl-10 pr-3 text-[16px] text-[#c8c8c8] shadow-none placeholder:text-[#c8c8c8] focus-visible:ring-0"
            />
          </div>
        </div>
      ))}
    </FormModal>
  );
}
