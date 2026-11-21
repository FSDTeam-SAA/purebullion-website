"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FormModal } from "../../../_components/shared/FormModal";
import { btn, btnLight } from "../btn";
import { downgradeLosses } from "../data";

import { useMySubscription, useSubscribe } from "@/hooks/useSubscription";
import { activeSub } from "../plan-utils";
import type { ModalTarget } from "../SubscriptionModals";

type Props = { open: boolean; onOpenChange: (o: boolean) => void; target?: ModalTarget };

export function DowngradeModal({ open, onOpenChange, target }: Props) {
  const subscribe = useSubscribe();
  const sub = activeSub(useMySubscription().data);
  const plan = target?.plan;
  const cycle = target?.cycle ?? sub?.billingCycle ?? "monthly";
  const currentName = sub?.plan.name ?? "your current plan";
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={`Downgrade to ${plan?.name ?? "a lower plan"}?`}
      iconSrc="/icons/subscription/cancel-flag.svg"
      iconSize={[17, 15]}
      footer={
        <>
          <Button variant="light" className={btnLight} onClick={() => onOpenChange(false)}>
            Keep {sub?.plan.name ?? "Plan"}
          </Button>
          <Button
            variant="gold"
            className={btn}
            disabled={!plan || subscribe.isPending}
            onClick={() =>
              plan && subscribe.mutate({ planId: plan._id, billingCycle: cycle }, { onSuccess: () => onOpenChange(false) })
            }
          >
            {subscribe.isPending ? "Processing..." : "Confirm downgrade"}
          </Button>
        </>
      }
    >
      <p className="text-[12px] font-bold leading-[1.2] text-[#8a9499]">
        Your plan changes from {currentName} to {plan?.name ?? "the lower plan"} immediately. You would lose:
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
