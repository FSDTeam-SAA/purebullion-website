"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { btn, btnLight } from "./btn";
import { PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { useCurrentUser, useUpdateProfile, useUploadAvatar } from "@/hooks/useProfile";
import { toast } from "sonner";
import { ianaToTz, timezones, tzToIana } from "./data";

const tagTone = {
  green: "border-[#20a978] bg-[rgba(32,169,120,0.1)] text-[#20a978]",
  gold: "border-[#d7a43a] bg-[rgba(215,164,58,0.1)] text-[#d7a43a]",
};

const field =
  "h-12 rounded-lg border-[#a37b3c] bg-transparent px-3 text-[16px] text-pb-muted shadow-none focus-visible:ring-0";

type Values = { fullName: string; displayName: string; email: string; timezone: string };

export function ProfileCard() {
  const { data: user, isLoading, isError, error, refetch } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  const fileRef = useRef<HTMLInputElement>(null);

  const initial: Values = {
    fullName: user?.name ?? "",
    displayName: user?.username ?? "",
    email: user?.email ?? "",
    timezone: ianaToTz(user?.timezone),
  };
  const [values, setValues] = useState<Values>(initial);
  // Re-sync the form whenever the server copy of the profile changes.
  useEffect(() => {
    if (user) {
      setValues({
        fullName: user.name ?? "",
        displayName: user.username ?? "",
        email: user.email ?? "",
        timezone: ianaToTz(user.timezone),
      });
    }
  }, [user]);
  const set = (k: keyof Values) => (v: string) => setValues((s) => ({ ...s, [k]: v }));

  if (isLoading) {
    return (
      <section className="overflow-hidden rounded-lg border border-pb-gold-dark bg-[#171d1f]">
        <PanelLoading rows={5} />
      </section>
    );
  }
  if (isError || !user) {
    return (
      <section className="overflow-hidden rounded-lg border border-pb-gold-dark bg-[#171d1f]">
        <PanelError message={error?.message} onRetry={() => refetch()} />
      </section>
    );
  }

  const tags: { label: string; tone: "green" | "gold" }[] = [];
  if (user.subscriptionTier) tags.push({ label: user.subscriptionTier, tone: "green" });
  if (user.isFoundingMember) {
    tags.push({ label: `Founding member${user.customUserId ? ` ${user.customUserId}` : ""}`, tone: "gold" });
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return void toast.error("Please choose an image file");
    if (file.size > 10 * 1024 * 1024) return void toast.error("Image must be under 10MB");
    uploadAvatar.mutate({ file, hasExisting: !!user.profileImage });
  };

  return (
    <section className="overflow-hidden rounded-lg border border-pb-gold-dark bg-[#171d1f]">
      <div className="flex flex-wrap items-center gap-4 border-b-2 border-[#293033] p-4">
        <div className="relative size-20 shrink-0">
          <Image
            src={user.profileImage || "/images/settings/avatar.png"}
            alt={user.name}
            width={80}
            height={80}
            unoptimized={!!user.profileImage}
            className="size-20 rounded-full object-cover"
          />
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
          <button
            type="button"
            aria-label="Change photo"
            onClick={() => fileRef.current?.click()}
            className="absolute left-14 top-14 flex size-7 items-center justify-center rounded-full border border-[#cbd5e1] bg-white shadow-md"
          >
            <Image src="/icons/settings/camera.svg" alt="" width={12} height={12} />
          </button>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h2 className="text-[24px] font-semibold leading-[1.2] text-pb-text">{user.name}</h2>
          <p className="text-[12px] leading-[1.2] text-pb-muted">{user.email}</p>
          <div className="flex flex-wrap items-center gap-3">
            {tags.map((t) => (
              <span key={t.label} className={`rounded-[3px] border px-[9px] py-1 text-[12px] font-medium leading-[1.2] ${tagTone[t.tone]}`}>
                {t.label}
              </span>
            ))}
          </div>
        </div>
        <Button variant="light" className={btnLight} disabled={uploadAvatar.isPending} onClick={() => fileRef.current?.click()}>
          {uploadAvatar.isPending ? "Uploading..." : "Change Photo"}
        </Button>
      </div>

      <form
        className="flex flex-col gap-6 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!values.fullName.trim()) return void toast.error("Full name is required");
          updateProfile.mutate({
            name: values.fullName.trim(),
            username: values.displayName.trim(),
            timezone: tzToIana[values.timezone] ?? "America/New_York",
          });
        }}
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
            <Input id="email" type="email" value={values.email} readOnly className={`${field} opacity-70`} />
            <p className="text-[16px] leading-[1.2] text-pb-muted">Contact support to change your email address.</p>
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
          <Button type="submit" variant="gold" className={btn} disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Saving..." : "Save Changes"}
          </Button>
          <Button type="reset" variant="light" className={`${btn} border border-white bg-[#697370] text-[#0f172a] hover:bg-[#7a8481]`}>
            Discard
          </Button>
        </div>
      </form>
    </section>
  );
}
