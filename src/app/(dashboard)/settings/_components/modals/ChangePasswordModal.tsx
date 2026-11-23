"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormModal } from "../../../_components/shared/FormModal";
import { useChangePassword } from "@/hooks/useProfile";
import { btn, btnLight } from "../btn";
import { passwordFields } from "../data";

type Props = { open: boolean; onOpenChange: (o: boolean) => void };

const empty = { current: "", new: "", confirm: "" };

export function ChangePasswordModal({ open, onOpenChange }: Props) {
  const [values, setValues] = useState<Record<string, string>>(empty);
  const change = useChangePassword();

  const close = (o: boolean) => {
    if (!o) setValues(empty);
    onOpenChange(o);
  };

  const submit = () => {
    if (!values.current || !values.new) return void toast.error("Please fill in all fields");
    if (values.new.length < 6) return void toast.error("New password must be at least 6 characters");
    if (values.new !== values.confirm) return void toast.error("New passwords do not match");
    change.mutate(
      { currentPassword: values.current, newPassword: values.new },
      { onSuccess: () => close(false) }
    );
  };

  return (
    <FormModal
      open={open}
      onOpenChange={close}
      title="Change password"
      iconSrc="/icons/settings/lock-bold.svg"
      footer={
        <>
          <Button variant="light" className={btnLight} onClick={() => close(false)}>
            Cancel
          </Button>
          <Button variant="gold" className={btn} disabled={change.isPending} onClick={submit}>
            {change.isPending ? "Changing..." : "Change password"}
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
              value={values[f.id]}
              onChange={(e) => setValues((s) => ({ ...s, [f.id]: e.target.value }))}
              autoComplete={f.id === "current" ? "current-password" : "new-password"}
              className="h-12 rounded-lg border-[#a37b3c] bg-transparent pl-10 pr-3 text-[16px] text-[#c8c8c8] shadow-none placeholder:text-[#c8c8c8] focus-visible:ring-0"
            />
          </div>
        </div>
      ))}
    </FormModal>
  );
}
