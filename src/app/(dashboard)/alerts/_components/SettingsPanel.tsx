"use client";

import { useEffect, useState } from "react";
import { PanelError, PanelLoading } from "../../_components/shared/QueryState";
import { useNotificationSettings, useUpdateNotificationSettings } from "@/hooks/useAlerts";
import type { NotificationSettingsDto } from "@/services/alerts.service";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import type { ToggleSetting } from "./data";

function GoldSwitch({ checked, onCheckedChange, label }: { checked: boolean; onCheckedChange: (v: boolean) => void; label: string }) {
  return (
    <Switch
      aria-label={label}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="h-8 w-14 rounded-full border border-pb-gold-dark p-0 shadow-none data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#4a4a3a] data-[state=checked]:to-[#9b8a4a] data-[state=unchecked]:bg-[#0c0f10] [&>span]:size-[28px] [&>span]:rounded-full [&>span]:bg-gold-gradient data-[state=checked]:[&>span]:translate-x-[25px] data-[state=unchecked]:[&>span]:translate-x-px"
    />
  );
}

function SettingRow({ s, onToggle }: { s: ToggleSetting; onToggle: (k: string, v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-[#293033] px-4 py-2">
      <div className="flex items-center gap-2">
        <p className="whitespace-nowrap text-[18px] font-semibold leading-[1.2] text-pb-text">{s.label}</p>
        {s.soon && <span className="rounded border border-[#697370] px-2 py-1 text-[12px] font-semibold leading-[1.2] text-[#e7e9e8]">Soon</span>}
      </div>
      <GoldSwitch label={s.label} checked={s.on} onCheckedChange={(v) => onToggle(s.key, v)} />
    </div>
  );
}

export function SettingsPanel({ panelRef }: { panelRef?: React.Ref<HTMLElement> }) {
  const { data, isLoading, isError, refetch } = useNotificationSettings();
  const update = useUpdateNotificationSettings();
  const [from, setFrom] = useState("20:00");
  const [to, setTo] = useState("06:30");

  useEffect(() => {
    if (data?.quietHours) {
      setFrom(data.quietHours.from);
      setTo(data.quietHours.to);
    }
  }, [data?.quietHours]);

  const t = data?.toggles;
  const c = data?.channels;
  const notifs: (ToggleSetting & { field: keyof NotificationSettingsDto["toggles"] })[] = [
    { key: "new-signals", field: "newSignals", label: "New signals", on: !!t?.newSignals },
    { key: "proximity", field: "signalProximity", label: "Signal proximity", on: !!t?.signalProximity },
    { key: "closed", field: "signalClosed", label: "Signal closed", on: !!t?.signalClosed },
    { key: "market", field: "marketConditionChange", label: "Market condition change", on: !!t?.marketConditionChange },
    { key: "watchlist", field: "watchlistMovers", label: "Watchlist movers", on: !!t?.watchlistMovers },
    { key: "community", field: "communityReplies", label: "Community replies", on: !!t?.communityReplies },
    { key: "announcements", field: "announcements", label: "Announcements", on: !!t?.announcements },
    { key: "weekly", field: "weeklyWrapEmail", label: "Weekly wrap email", on: !!t?.weeklyWrapEmail },
  ];
  const channels: (ToggleSetting & { field: keyof NotificationSettingsDto["channels"] })[] = [
    { key: "in-platform", field: "inPlatform", label: "In-platform", on: !!c?.inPlatform },
    { key: "email", field: "email", label: "Email", on: !!c?.email },
    { key: "push", field: "browserPush", label: "Browser push", on: !!c?.browserPush },
    { key: "sms", field: "sms", label: "SMS", on: !!c?.sms, soon: true },
  ];

  const toggleNotif = (key: string, on: boolean) => {
    const f = notifs.find((x) => x.key === key)?.field;
    if (f) update.mutate({ toggles: { [f]: on } as unknown as NotificationSettingsDto["toggles"] });
  };
  const toggleChannel = (key: string, on: boolean) => {
    const f = channels.find((x) => x.key === key)?.field;
    if (f) update.mutate({ channels: { [f]: on } as unknown as NotificationSettingsDto["channels"] });
  };
  const saveQuiet = (patch: Partial<NotificationSettingsDto["quietHours"]>) => {
    if (patch.from !== undefined && !/^([01]\d|2[0-3]):[0-5]\d$/.test(patch.from)) return;
    if (patch.to !== undefined && !/^([01]\d|2[0-3]):[0-5]\d$/.test(patch.to)) return;
    update.mutate({ quietHours: patch as NotificationSettingsDto["quietHours"] });
  };
  const timeInput = "h-12 rounded-lg border border-[#a37b3c] bg-transparent px-3 py-2 text-[16px] text-pb-muted focus-visible:ring-pb-gold-dark";

  return (
    <section ref={panelRef} className="flex w-full shrink-0 flex-col self-start rounded-lg bg-pb-head lg:w-[417px]">
      <h2 className="border-b-2 border-[#293033] p-4 text-[24px] font-semibold leading-[1.2] text-pb-text">Notification settings</h2>
      {isLoading ? (
        <PanelLoading rows={8} />
      ) : isError ? (
        <PanelError message="Could not load notification settings." onRetry={() => refetch()} />
      ) : (
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-4 border-b border-[#697370] pb-4">
          {notifs.map((s) => (
            <SettingRow key={s.key} s={s} onToggle={toggleNotif} />
          ))}
        </div>
        <p className="text-[18px] font-semibold leading-[1.2] text-pb-muted">Channels</p>
        <div className="flex flex-col gap-4">
          {channels.map((s) => (
            <SettingRow key={s.key} s={s} onToggle={toggleChannel} />
          ))}
        </div>
        <div className="rounded-lg bg-pb-head">
          <h3 className="border-b-2 border-[#293033] p-4 text-[24px] font-medium leading-[1.2] text-pb-text">Quiet hours</h3>
          <div className="flex flex-col gap-4 p-4">
            <p className="text-[14px] font-bold leading-[1.2] text-[#e5e5e5]">Alerts outside these hours are queued and delivered at the open.</p>
            <div className="flex gap-4">
              <label className="flex min-w-0 flex-1 flex-col gap-2 text-[16px] leading-[1.2] text-pb-muted">
                From
                <Input value={from} onChange={(e) => setFrom(e.target.value)} onBlur={() => saveQuiet({ from })} className={timeInput} />
              </label>
              <label className="flex min-w-0 flex-1 flex-col gap-2 text-[16px] leading-[1.2] text-pb-muted">
                To
                <Input value={to} onChange={(e) => setTo(e.target.value)} onBlur={() => saveQuiet({ to })} className={timeInput} />
              </label>
            </div>
          </div>
        </div>
      </div>
      )}
    </section>
  );
}
