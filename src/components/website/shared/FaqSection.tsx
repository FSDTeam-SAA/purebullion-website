"use client";

import Image from "next/image";
import { useState } from "react";
import { FAQ_ITEMS, type FaqItem } from "@/data/website/faq";
import { cn } from "@/lib/utils";
import PageContainer from "./PageContainer";
import SectionHeading from "./SectionHeading";

interface FaqSectionProps {
  items?: FaqItem[];
  className?: string;
}

/** "Frequently Asked Questions" block with the Figma accordion styling. */
export default function FaqSection({ items = FAQ_ITEMS, className }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className={cn(
        "bg-gradient-to-b from-[#050d14] to-[#04090f] py-12 lg:py-[48px]",
        className,
      )}
    >
      <PageContainer className="flex flex-col items-center gap-10 lg:gap-[60px]">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Find answers about Pure Bullion, its market intelligence tools, AI research, membership, and community."
        />

        <div className="flex w-full flex-col gap-4">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.question}
                className={cn(
                  "overflow-hidden rounded-[20px] border-[2.5px] transition-colors lg:rounded-[28px]",
                  open
                    ? "border-pb-bronze bg-[rgba(192,146,72,0.1)]"
                    : "border-[#383838] bg-[#0a0e14]",
                )}
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left lg:px-10 lg:py-8"
                >
                  <span
                    className={cn(
                      "text-lg font-semibold leading-[1.2] sm:text-xl lg:text-2xl",
                      open ? "text-[#d1a828]" : "text-pb-body",
                    )}
                  >
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-full lg:size-12",
                      open ? "bg-[rgba(192,146,72,0.15)]" : "bg-white/5",
                    )}
                  >
                    <Image
                      src={
                        open
                          ? "/icons/website/faq-close.svg"
                          : "/icons/website/faq-plus.svg"
                      }
                      alt=""
                      width={28}
                      height={28}
                      className={cn("transition-transform", open && "rotate-45")}
                    />
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-6 lg:px-10 lg:pb-10">
                    <div className="h-0.5 w-full bg-[rgba(200,130,10,0.15)]" />
                    <p className="pt-6 text-base leading-[1.2] text-pb-body lg:pt-8 lg:text-lg">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
