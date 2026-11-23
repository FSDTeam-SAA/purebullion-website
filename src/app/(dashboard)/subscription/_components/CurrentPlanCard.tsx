"use client";

import { Button } from "@/components/ui/button";
import { btn, btnLight } from "./btn";
import { PanelEmpty, PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { useMySubscription, usePlans } from "@/hooks/useSubscription";
import { fmtDate } from "@/lib/format";
import { activeSub, money, sortPlans } from "./plan-utils";
import { useSubscriptionModals } from "./SubscriptionModals";

const tagTone = {
  green: "border-[#20a978] bg-[rgba(32,169,120,0.1)] text-[#20a978]",
  gold: "border-[#d7a43a] bg-[rgba(215,164,58,0.1)] text-[#d7a43a]",
};

export function CurrentPlanCard() {
  const { open } = useSubscriptionModals();
  const my = useMySubscription();
  const plans = usePlans();

  const shell = (children: React.ReactNode) => (
    <section className="overflow-hidden rounded-lg border border-pb-gold-dark bg-[#171d1f]">{children}</section>
  );
  if (my.isLoading) return shell(<PanelLoading rows={3} />);
  if (my.isError) return shell(<PanelError message={my.error?.message} onRetry={() => my.refetch()} />);

  const sub = activeSub(my.data);
  if (!sub) {
    return shell(<PanelEmpty>You don&apos;t have an active subscription. Choose a plan below to get started.</PanelEmpty>);
  }

  const sorted = sortPlans(plans.data);
  const idx = sorted.findIndex((p) => p._id === sub.plan._id);
  const higher = idx >= 0 ? sorted[idx + 1] : undefined;
  const lower = idx > 0 ? sorted[idx - 1] : undefined;
  const cycle = sub.billingCycle;
  const currentPlan = {
    name: sub.plan.name,
    tags: [{ label: sub.status, tone: "green" as const }],
    description: sub.plan.description,
    price: money(sub.amount),
    priceNote: cycle === "yearly" ? "per year" : "per month",
    meta: [
      { label: "Billing cycle", value: cycle === "yearly" ? "Yearly" : "Monthly" },
      { label: "Status", value: sub.status.charAt(0) + sub.status.slice(1).toLowerCase() },
      { label: "Next billing date", value: fmtDate(sub.renewalDate) },
      { label: "Payment method", value: (sub.paymentMethod || "card").replace(/^./, (c) => c.toUpperCase()) },
    ],
  };

  return (
    <section className="overflow-hidden rounded-lg border border-pb-gold-dark bg-[#171d1f]">
      <div className="flex items-center justify-between gap-4 border-b-2 border-[#293033] p-4">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[24px] font-semibold leading-[1.2] text-pb-text">{currentPlan.name}</h2>
            <div className="flex items-center gap-3">
              {currentPlan.tags.map((t) => (
                <span key={t.label} className={`rounded-[3px] border px-[9px] py-1 text-[12px] font-medium leading-[1.2] ${tagTone[t.tone]}`}>
                  {t.label}
                </span>
              ))}
            </div>
          </div>
          <p className="text-[12px] leading-[1.2] text-pb-muted">{currentPlan.description}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2 leading-[1.2]">
          <p className="text-[32px] font-semibold text-pb-text">{currentPlan.price}</p>
          <p className="text-[12px] text-pb-muted">{currentPlan.priceNote}</p>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-4">
        <dl className="flex flex-wrap items-center justify-between gap-4">
          {currentPlan.meta.map((m) => (
            <div key={m.label} className="flex flex-col gap-2 leading-[1.2]">
              <dt className="text-[12px] text-pb-muted">{m.label}</dt>
              <dd className="text-[18px] font-semibold text-pb-text">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {higher && (
            <Button variant="gold" className={btn} onClick={() => open("upgrade", { plan: higher, cycle })}>
              Upgrade to {higher.name}
            </Button>
          )}
          {lower && (
            <Button variant="light" className={btnLight} onClick={() => open("downgrade", { plan: lower, cycle })}>
              Downgrade to {lower.name}
            </Button>
          )}
          <Button variant="light" className={btnLight} onClick={() => open("payment")}>
            Update payment method
          </Button>
          <Button variant="outline-danger" className={`${btn} border-[#d94f59] text-[#d94f59]`} onClick={() => open("cancel")}>
            Cancel subscription
          </Button>
        </div>
      </div>
    </section>
  );
}
