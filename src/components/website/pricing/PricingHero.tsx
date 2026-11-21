"use client";

import Image from "next/image";
import { useState } from "react";
import GoldButton from "@/components/website/shared/GoldButton";
import HeroBackdrop from "@/components/website/shared/HeroBackdrop";
import SectionBadge from "@/components/website/shared/SectionBadge";
import { PRICING_PLANS } from "@/data/website/pricing";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Billing = "monthly" | "yearly";

export default function PricingHero() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="relative overflow-hidden bg-[#090803]">
      <HeroBackdrop />
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-4 pb-16 pt-36 sm:px-8 sm:pt-40 lg:gap-[60px] lg:px-[60px] lg:pb-[120px] lg:pt-[167px]">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center gap-4 text-center">
            <SectionBadge>Pricing</SectionBadge>
            <h1 className="text-balance text-[32px] font-semibold leading-[1.2] text-white sm:text-[40px] lg:text-[52px]">
              Choose the Plan That Fits Your Goals
            </h1>
            <p className="max-w-[642px] text-base leading-[1.5] text-pb-body sm:text-lg lg:text-xl">
              Get the market intelligence, AI-powered research, and tracking tools you
              need to make better-informed decisions.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Billing period"
            className="flex items-center gap-2.5 rounded-3xl bg-[#312b28] p-2 shadow-[inset_0_-2px_5px_2px_rgba(255,255,255,0.15)]"
          >
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                type="button"
                role="tab"
                aria-selected={billing === b}
                onClick={() => setBilling(b)}
                className={cn(
                  "cursor-pointer rounded-3xl px-3 py-2 text-base capitalize text-white transition-colors",
                  b === "yearly" ? "min-w-[84px]" : "",
                  billing === b
                    ? "bg-[rgba(217,178,54,0.6)] shadow-[inset_0_-2px_6px_rgba(255,255,255,0.1)]"
                    : "hover:bg-white/5",
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col items-stretch gap-6 lg:flex-row lg:items-center">
          {PRICING_PLANS.map((plan) => {
            const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const hl = plan.highlighted;
            return (
              <div
                key={plan.name}
                className={cn(
                  "flex flex-1 flex-col justify-between gap-10 rounded-xl border p-6 backdrop-blur-[6px] sm:p-10 lg:min-w-px",
                  hl
                    ? "border-[rgba(255,195,0,0.5)] bg-[rgba(192,146,72,0.15)] lg:h-[600px]"
                    : "border-white/50 bg-white/10 lg:h-[520px]",
                )}
              >
                <div className="flex w-full flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                      <p className="text-lg text-[#e5e5e5] lg:text-xl">{plan.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[40px] font-medium leading-[48px] tracking-[-0.8px] text-white">
                        ${price}
                      </span>
                      <span
                        className={cn(
                          "rounded px-2 py-1 text-base shadow-[inset_0_-2px_6px_rgba(255,255,255,0.1)]",
                          hl ? "bg-[rgba(214,172,42,0.25)] text-[#d6ac2a]" : "bg-black/40 text-white",
                        )}
                      >
                        {billing === "monthly" ? "/Month" : "/Year"}
                      </span>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((f, i) => (
                      <li key={`${f}-${i}`} className="flex items-center gap-2">
                        <Image src="/icons/website/pricing/check.svg" alt="" width={20} height={20} />
                        <span className="text-lg text-[#e5e5e5] lg:text-xl">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {hl ? (
                  <GoldButton href="/register" arrow className="w-full">
                    Get Started
                  </GoldButton>
                ) : (
                  <Link
                    href="/register"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-medium leading-[1.2] tracking-[-0.16px] text-black transition hover:bg-white/90"
                  >
                    Get started
                    <Image
                      src="/icons/website/pricing/arrow-dark.svg"
                      alt=""
                      width={20}
                      height={20}
                      className="-rotate-90"
                    />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
