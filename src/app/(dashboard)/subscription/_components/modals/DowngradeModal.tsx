"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormModal } from "../../../_components/shared/FormModal";
import { btn, btnLight } from "../btn";
import { downgradeLosses } from "../data";

type Props = { open: boolean; onOpenChange: (o: boolean) => void };

export function DowngradeModal({ open, onOpenChange }: Props) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Downgrade to Essential?"
      iconSrc="/icons/subscription/cancel-flag.svg"
      iconSize={[17, 15]}
      footer={
        <>
          <Button variant="light" className={btnLight} onClick={() => onOpenChange(false)}>
            Keep Professional
          </Button>
          <Button variant="gold" className={btn} onClick={() => onOpenChange(false)}>
            Downgrade at renewal
          </Button>
        </>
      }
    >
      <p className="text-[12px] font-bold leading-[1.2] text-[#8a9499]">
        Your Professional access continues until Oct 19, 2026. From that date you would lose:
      </p>
      <ul className="flex flex-col gap-4">
        {downgradeLosses.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Image src="/icons/subscription/x-circle-red.svg" alt="" width={14} height={14} />
            <span className="text-[18px] leading-normal text-pb-muted">{item}</span>
          </li>
        ))}
      </ul>
      <p className="text-[12px] font-bold leading-[1.2] text-[#8a9499]">
        Your founding rate applies to whichever plan you hold. Downgrading does not forfeit founding status, but returning to Professional
        later restores it at the founding rate only if your subscription has stayed active.
      </p>
    </FormModal>
  );
}
