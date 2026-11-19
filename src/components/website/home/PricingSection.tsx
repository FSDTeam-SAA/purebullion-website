"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GoldButton from "@/components/website/shared/GoldButton";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionHeading from "@/components/website/shared/SectionHeading";
import { PRICING_PLANS } from "@/data/website/home";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <PageContainer as="section" className="relative flex flex-col items-center gap-10 lg:gap-[60px]">
      <div className="flex flex-col items-center gap-5">
        <SectionHeading
          badge="Pricing"
          title="Choose the Plan That Fits Your Goals"
          description="Get the market intelligence, AI-powered research, and tracking tools you need to make better-informed decisions."
          descriptionClassName="max-w-[642px]"
        />
        <div
          role="tablist"
          className="flex items-center gap-2.5 rounded-3xl bg-[#312b28] p-2 shadow-[inset_0_-2px_5px_2px_rgba(255,255,255,0.15)]"
        >
          {(["Monthly", "Yearly"] as const).map((label) => {
            const active = (label === "Yearly") === yearly;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setYearly(label === "Yearly")}
                className={cn(
                  "rounded-3xl px-3 py-2 text-base text-white transition",
                  label === "Yearly" && "min-w-[84px]",
                  active && "bg-[rgba(217,178,54,0.6)] shadow-[inset_0_-2px_6px_rgba(255,255,255,0.1)]",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid w-full items-center gap-6 md:grid-cols-3">
        {PRICING_PLANS.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          const f = plan.featured;
          return (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col justify-between gap-8 rounded-xl border p-6 backdrop-blur-[6px] sm:p-10",
                f
                  ? "border-[rgba(255,195,0,0.5)] bg-[rgba(192,146,72,0.15)] md:h-[600px]"
                  : "border-white/50 bg-white/10 md:h-[520px]",
              )}
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-2xl font-semibold text-white">{plan.name}</p>
                    <p className="text-xl text-[#e5e5e5]">{plan.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-white">
                      ${price}
                    </span>
                    <span
                      className={cn(
                        "rounded px-2 py-1 text-base shadow-[inset_0_-2px_6px_rgba(255,255,255,0.1)]",
                        f ? "bg-[rgba(214,172,42,0.25)] text-[#d6ac2a]" : "bg-black/40 text-white",
                      )}
                    >
                      /{yearly ? "Month, billed yearly" : "Month"}
                    </span>
                  </div>
                </div>
                <ul className="flex flex-col gap-3">
                  {plan.features.map((feat, i) => (
                    <li key={`${feat}-${i}`} className="flex items-center gap-2 text-xl text-[#e5e5e5]">
                      <Image src="/icons/website/home/pricing-check.svg" alt="" width={20} height={20} className="shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
              {f ? (
                <GoldButton href="/register" arrow className="w-full">
                  Get Started
                </GoldButton>
              ) : (
                <Link
                  href="/register"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-medium tracking-[-0.16px] text-black transition hover:bg-white/90"
                >
                  Get started
                  <Image src="/icons/website/home/pricing-arrow.svg" alt="" width={20} height={20} className="-rotate-90" />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
