"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { btn, btnLight } from "./btn";
import { profile, timezones } from "./data";

const tagTone = {
  green: "border-[#20a978] bg-[rgba(32,169,120,0.1)] text-[#20a978]",
  gold: "border-[#d7a43a] bg-[rgba(215,164,58,0.1)] text-[#d7a43a]",
};

const field =
  "h-12 rounded-lg border-[#a37b3c] bg-transparent px-3 text-[16px] text-pb-muted shadow-none focus-visible:ring-0";

const initial = { fullName: profile.fullName, displayName: profile.displayName, email: profile.email, timezone: profile.timezone };

export function ProfileCard() {
  const [values, setValues] = useState(initial);
  const set = (k: keyof typeof initial) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

  return (
    <section className="overflow-hidden rounded-lg border border-pb-gold-dark bg-[#171d1f]">
      <div className="flex flex-wrap items-center gap-4 border-b-2 border-[#293033] p-4">
        <div className="relative size-20 shrink-0">
          <Image src="/images/settings/avatar.png" alt="Jordan Reyes" width={80} height={80} className="size-20 rounded-full object-cover" />
          <button
            type="button"
            aria-label="Change photo"
            className="absolute left-14 top-14 flex size-7 items-center justify-center rounded-full border border-[#cbd5e1] bg-white shadow-md"
          >
            <Image src="/icons/settings/camera.svg" alt="" width={12} height={12} />
          </button>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h2 className="text-[24px] font-semibold leading-[1.2] text-pb-text">{profile.fullName}</h2>
          <p className="text-[12px] leading-[1.2] text-pb-muted">{profile.email}</p>
          <div className="flex flex-wrap items-center gap-3">
            {profile.tags.map((t) => (
              <span key={t.label} className={`rounded-[3px] border px-[9px] py-1 text-[12px] font-medium leading-[1.2] ${tagTone[t.tone]}`}>
                {t.label}
              </span>
            ))}
          </div>
        </div>
        <Button variant="light" className={btnLight}>
          Change Photo
        </Button>
      </div>

      <form
        className="flex flex-col gap-6 p-4"
        onSubmit={(e) => e.preventDefault()}
        onReset={(e) => {
          e.preventDefault();
          setValues(initial);
        }}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="full-name" className="text-[16px] leading-[1.2] text-pb-muted">Full Name</label>
            <Input id="full-name" value={values.fullName} onChange={(e) => set("fullName")(e.target.value)} className={field} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="display-name" className="text-[16px] leading-[1.2] text-pb-muted">Display Name in Community</label>
            <Input id="display-name" value={values.displayName} onChange={(e) => set("displayName")(e.target.value)} className={field} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[16px] leading-[1.2] text-pb-muted">Email</label>
            <Input id="email" type="email" value={values.email} onChange={(e) => set("email")(e.target.value)} className={field} />
            <p className="text-[16px] leading-[1.2] text-pb-muted">Changing this requires re-verification.</p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="timezone" className="text-[16px] leading-[1.2] text-pb-muted">Time zone</label>
            <Select value={values.timezone} onValueChange={set("timezone")}>
              <SelectTrigger id="timezone" className={`${field} data-[placeholder]:text-pb-muted`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="pb-dashboard border-[#293033] bg-[#121719] font-raleway text-pb-text">
                {timezones.map((z) => (
                  <SelectItem key={z.value} value={z.value} className="focus:bg-white/10 focus:text-white">
                    {z.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Button type="submit" variant="gold" className={btn}>
            Save Changes
          </Button>
          <Button type="reset" variant="light" className={`${btn} border border-white bg-[#697370] text-[#0f172a] hover:bg-[#7a8481]`}>
            Discard
          </Button>
        </div>
      </form>
    </section>
  );
}
