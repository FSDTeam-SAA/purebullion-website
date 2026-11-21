"use client";

import { Button } from "@/components/ui/button";
import { FormModal } from "../../../_components/shared/FormModal";
import { useSubscribe } from "@/hooks/useSubscription";
import { fmtDate } from "@/lib/format";
import { btn, btnLight } from "../btn";
import { money, nextChargeDate, planPrice } from "../plan-utils";
import type { ModalTarget } from "../SubscriptionModals";

type Props = { open: boolean; onOpenChange: (o: boolean) => void; target?: ModalTarget };

export function UpgradeModal({ open, onOpenChange, target }: Props) {
  const subscribe = useSubscribe();
  const plan = target?.plan;
  const cycle = target?.cycle ?? "monthly";
  const price = plan ? planPrice(plan, cycle) : 0;
  const summary = plan
    ? [
        { label: "New rate", value: `${money(price)} / ${cycle === "yearly" ? "year" : "month"}` },
        { label: "Charged today", value: `${money(price)}` },
        { label: "Effective", value: "Immediately" },
        { label: "Next full charge", value: fmtDate(nextChargeDate(cycle)) },
      ]
    : [];

  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={plan ? `Upgrade to ${plan.name}` : "Upgrade plan"}
      iconSrc="/icons/subscription/crown.svg"
      footer={
        <>
          <Button variant="light" className={btnLight} onClick={() => onOpenChange(false)}>
            Not now
          </Button>
          <Button
            variant="gold"
            className={btn}
            disabled={!plan || subscribe.isPending}
            onClick={() =>
              plan && subscribe.mutate({ planId: plan._id, billingCycle: cycle }, { onSuccess: () => onOpenChange(false) })
            }
          >
            {subscribe.isPending ? "Processing..." : "Confirm upgrade"}
          </Button>
        </>
      }
    >
      <p className="text-[12px] font-bold leading-[1.2] text-[#8a9499]">
        {plan?.description ?? "Select a plan to continue."}
      </p>
      {plan && plan.benefits.length > 0 && (
        <p className="text-[12px] font-bold leading-[1.2] text-[#8a9499]">Includes: {plan.benefits.join(", ")}.</p>
      )}
      <div className="flex flex-col gap-4 p-4">
        {summary.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-[18px] leading-normal text-pb-muted">{row.label}</span>
            <span className="text-[20px] font-bold leading-[1.2] text-pb-text">{row.value}</span>
          </div>
        ))}
      </div>
    </FormModal>
  );
}
