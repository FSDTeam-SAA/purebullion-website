"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface ConsentCheckboxProps {
  prefix: string;
  link: string;
  suffix?: string;
}

export default function ConsentCheckbox({ prefix, link, suffix }: ConsentCheckboxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label className="flex w-full cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="peer sr-only"
      />
      <span className="flex size-4 shrink-0 items-center justify-center rounded border border-white text-black transition-colors peer-checked:border-pb-gold peer-checked:bg-pb-gold peer-focus-visible:ring-2 peer-focus-visible:ring-pb-gold/60 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
        <Check className="size-3" strokeWidth={3} />
      </span>
      <span className="text-sm leading-[1.2] text-white">
        {prefix}
        <span className="text-pb-bronze">{link}</span>
        {suffix}
      </span>
    </label>
  );
}
