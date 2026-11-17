"use client";

import { Button } from "@/components/ui/button";
import { FormModal } from "../../../_components/shared/FormModal";
import { btn, btnLight } from "../btn";
import { upgradeSummary } from "../data";

type Props = { open: boolean; onOpenChange: (o: boolean) => void };

export function UpgradeModal({ open, onOpenChange }: Props) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Upgrade to Institutional"
      iconSrc="/icons/subscription/crown.svg"
      footer={
        <>
          <Button variant="light" className={btnLight} onClick={() => onOpenChange(false)}>
            Not now
          </Button>
          <Button variant="gold" className={btn} onClick={() => onOpenChange(false)}>
            Confirm upgrade
          </Button>
        </>
      }
    >
      <p className="text-[12px] font-bold leading-[1.2] text-[#8a9499]">
        You get signal proximity alerts, the extended historical database, saved scanner presets, Peter’s commentary archive and 4-hour
        support.
      </p>
      <div className="flex flex-col gap-4 p-4">
        {upgradeSummary.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-[18px] leading-normal text-pb-muted">{row.label}</span>
            <span className="text-[20px] font-bold leading-[1.2] text-pb-text">{row.value}</span>
          </div>
        ))}
      </div>
    </FormModal>
  );
}
