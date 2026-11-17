"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { PanelCard } from "../../_components/shared/PanelCard";
import { plans, type Plan } from "./data";
import { useSubscriptionModals } from "./SubscriptionModals";

type Cycle = "monthly" | "yearly";

function PlanCard({ plan, cycle }: { plan: Plan; cycle: Cycle }) {
  const { open } = useSubscriptionModals();
  const current = plan.id === "professional";
  const price = cycle === "monthly" ? plan.monthly : plan.yearly;
  return (
    <div
      className={cn(
        "flex min-h-[506px] flex-col justify-between rounded-xl border p-4 backdrop-blur-[6px]",
        current ? "border-[rgba(255,195,0,0.5)] bg-[rgba(192,146,72,0.15)]" : "border-white/50 bg-white/10"
      )}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-[24px] font-semibold text-white">{plan.name}</h3>
            <p className="text-[20px] text-[#e5e5e5]">{plan.blurb}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-white">{price}</span>
            <span
              className={cn(
                "rounded px-2 py-1 text-[16px] shadow-[inset_0_-2px_6px_rgba(255,255,255,0.1)]",
                current ? "bg-[rgba(214,172,42,0.25)] text-[#d6ac2a]" : "bg-black/40 text-white"
              )}
            >
              {cycle === "monthly" ? "/Month" : "/Year"}
            </span>
          </div>
        </div>
        <ul className="flex flex-col gap-3">
          {plan.features.map((f, i) => (
            <li key={`${f}-${i}`} className="flex items-center gap-2 text-[20px] text-[#e5e5e5]">
              <Image src="/icons/subscription/check-circle.svg" alt="" width={20} height={20} className="shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      {plan.id === "essential" && (
        <button type="button" onClick={() => open("downgrade")} className="h-[51px] w-full rounded-lg bg-white text-[16px] font-medium text-black">
          Downgrade Plan
        </button>
      )}
      {current && (
        <button
          type="button"
          disabled
          className="h-[51px] w-full rounded-lg bg-gold-gradient-soft text-[16px] font-medium"
        >
          <span className="gold-gradient-text">Current Plan</span>
        </button>
      )}
      {plan.id === "elite" && (
        <button type="button" onClick={() => open("upgrade")} className="gold-gradient-btn h-[51px] w-full rounded-lg text-[16px]">
          Upgrade Plan
        </button>
      )}
    </div>
  );
}

export function ComparePlans() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  return (
    <PanelCard title="Compare plans" bodyClassName="flex flex-col items-center gap-6 p-6">
      <div
        role="tablist"
        aria-label="Billing cycle"
        className="flex items-center gap-[10px] rounded-3xl bg-[#312b28] p-2 shadow-[inset_0_-2px_5px_2px_rgba(255,255,255,0.15)]"
      >
        {(["monthly", "yearly"] as const).map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={cycle === c}
            onClick={() => setCycle(c)}
            className={cn(
              "w-[84px] rounded-3xl py-2 text-[16px] capitalize text-white transition-colors",
              cycle === c && "bg-[rgba(217,178,54,0.6)] shadow-[inset_0_-2px_6px_rgba(255,255,255,0.1)]"
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <PlanCard key={p.id} plan={p} cycle={cycle} />
        ))}
      </div>
    </PanelCard>
  );
}
