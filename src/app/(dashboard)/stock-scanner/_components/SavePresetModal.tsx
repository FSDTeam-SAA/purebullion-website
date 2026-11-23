"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormModal } from "../../_components/shared/FormModal";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onSave: (name: string) => void;
  saving?: boolean;
};

export function SavePresetModal({ open, onOpenChange, onSave, saving }: Props) {
  const [name, setName] = useState("");
  useEffect(() => {
    if (open) setName("");
  }, [open]);
  const valid = name.trim().length > 0;
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Save preset"
      iconSrc="/icons/stock-scanner/filter.svg"
      footer={
        <>
          <Button variant="light" onClick={() => onOpenChange(false)} className="h-11 rounded-[4px] px-6">
            Cancel
          </Button>
          <Button variant="gold" disabled={!valid || saving} onClick={() => onSave(name.trim())} className="h-11 rounded-[4px] px-6">
            {saving ? "Saving…" : "Save preset"}
          </Button>
        </>
      }
    >
      <label className="flex flex-col gap-2 text-[14px] text-pb-text">
        Preset name
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && valid && onSave(name.trim())}
          placeholder="e.g. Momentum Breakouts"
          className="h-11 rounded border border-[#293033] bg-[#171d1f] px-3 text-pb-text placeholder:text-pb-muted focus:outline-none focus:ring-1 focus:ring-pb-gold"
        />
      </label>
    </FormModal>
  );
}
