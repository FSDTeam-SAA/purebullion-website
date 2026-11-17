"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { SettingsCard } from "./SettingsCard";
import { notifications } from "./data";

export function NotificationPreferences() {
  const [state, setState] = useState<Record<string, boolean>>(() => Object.fromEntries(notifications.map((n) => [n.id, n.on])));
  return (
    <SettingsCard title="Notification preferences" subtitle="The same controls appear on the Alerts screen.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-center justify-between rounded-lg bg-[#293033] p-4">
            <label htmlFor={n.id} className="text-[18px] font-semibold leading-[1.2] text-pb-text">
              {n.label}
            </label>
            <Switch
              id={n.id}
              checked={state[n.id]}
              onCheckedChange={(v) => setState((s) => ({ ...s, [n.id]: v }))}
              className="h-8 w-14 border border-pb-gold-dark bg-[#101415] shadow-none data-[state=checked]:bg-[linear-gradient(90deg,#4a4f4a_0%,#8a7430_100%)] data-[state=unchecked]:bg-[#101415] [&>span]:ml-[3px] [&>span]:size-6 [&>span]:bg-gold-gradient [&>span]:shadow-none data-[state=checked]:[&>span]:translate-x-6"
            />
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}
