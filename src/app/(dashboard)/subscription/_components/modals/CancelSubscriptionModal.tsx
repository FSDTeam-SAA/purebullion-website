"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormModal } from "../../../_components/shared/FormModal";
import { btn, btnLight } from "../btn";
import { useCancelSubscription, useMySubscription } from "@/hooks/useSubscription";
import { activeSub } from "../plan-utils";
import { cancelReasons } from "../data";

type Props = { open: boolean; onOpenChange: (o: boolean) => void };

export function CancelSubscriptionModal({ open, onOpenChange }: Props) {
  const cancel = useCancelSubscription();
  const sub = activeSub(useMySubscription().data);
  const planName = sub?.plan.name ?? "current";
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title="Cancel your subscription?"
      iconSrc="/icons/subscription/cancel-flag.svg"
      iconSize={[17, 15]}
      footer={
        <>
          <Button variant="gold" className={btn} onClick={() => onOpenChange(false)}>
            Keep My Plan
          </Button>
          <Button
            variant="light"
            className={btnLight}
            disabled={cancel.isPending || !sub}
            onClick={() => cancel.mutate(undefined, { onSuccess: () => onOpenChange(false) })}
          >
            {cancel.isPending ? "Cancelling..." : "Cancel Subscription"}
          </Button>
        </>
      }
    >
      <div className="text-[12px] font-bold leading-[1.2] text-[#8a9499]">
        <p>
          Cancelling ends your {planName} plan. You lose signals, the scanner and alerts. Watchlists and community history are kept for 90
          days.
        </p>
        <p className="mt-3">
          Your founding rate is released when the subscription ends and cannot be reclaimed once the 1,000 spots are filled.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[16px] leading-[1.2] text-pb-muted">What made you cancel? (optional)</label>
        <Select>
          <SelectTrigger className="h-12 rounded-lg border-[#a37b3c] bg-transparent px-3 text-[16px] text-[#c8c8c8] shadow-none focus:ring-0 data-[placeholder]:text-[#c8c8c8]">
            <SelectValue placeholder="Choose a reason" />
          </SelectTrigger>
          <SelectContent className="pb-dashboard border-[#293033] bg-[#121719] font-raleway text-pb-text">
            {cancelReasons.map((r) => (
              <SelectItem key={r} value={r} className="focus:bg-white/10 focus:text-white">
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </FormModal>
  );
}
