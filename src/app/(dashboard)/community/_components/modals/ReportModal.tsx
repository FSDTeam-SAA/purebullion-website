"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { REPORT_REASONS } from "../data";
import { ModalShell } from "./ModalShell";

type Props = { open: boolean; onOpenChange: (o: boolean) => void; onSubmit: (reasons: string[], details: string) => void };

export function ReportModal({ open, onOpenChange, onSubmit }: Props) {
  const [picked, setPicked] = useState<string[]>([]);
  const [details, setDetails] = useState("");

  const handleOpen = (o: boolean) => {
    if (!o) { setPicked([]); setDetails(""); }
    onOpenChange(o);
  };
  const toggle = (r: string) => setPicked((p) => (p.includes(r) ? p.filter((x) => x !== r) : [...p, r]));

  return (
    <ModalShell
      open={open}
      onOpenChange={handleOpen}
      title="Report Content"
      description="Focused moderation report state launched from a community post or comment."
      confirmLabel="Submit Report"
      confirmDisabled={picked.length === 0}
      onConfirm={() => { onSubmit(picked, details); handleOpen(false); }}
    >
      <p className="text-[20px] font-medium leading-normal text-pb-text">Why are you reporting this content?</p>
      <div className="flex flex-col gap-4">
        {REPORT_REASONS.map((r) => (
          <label key={r} className="flex cursor-pointer items-start gap-2 py-2">
            <Checkbox
              checked={picked.includes(r)}
              onCheckedChange={() => toggle(r)}
              className="size-[18px] rounded-[4px] border-[#697370] bg-[#121719] shadow-none data-[state=checked]:border-pb-gold data-[state=checked]:bg-pb-gold data-[state=checked]:text-black"
            />
            <span className="flex-1 text-[13px] font-normal leading-normal text-pb-muted">{r}</span>
          </label>
        ))}
        <Textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Tell us what happened…"
          className="min-h-0 resize-none rounded-none border-0 bg-transparent px-0 py-2 text-[13px] text-pb-muted shadow-none placeholder:text-pb-muted focus-visible:ring-0"
          rows={2}
        />
      </div>
    </ModalShell>
  );
}
