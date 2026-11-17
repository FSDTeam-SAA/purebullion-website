"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SettingRow, SettingsCard } from "./SettingsCard";
import { btnLight } from "./btn";
import { ChangePasswordModal } from "./modals/ChangePasswordModal";

export function SecurityCard() {
  const [open, setOpen] = useState(false);
  return (
    <SettingsCard title="Security">
      <SettingRow
        title="Password"
        description="Last changed 4 months ago"
        action={
          <Button variant="light" className={btnLight} onClick={() => setOpen(true)}>
            Change password
          </Button>
        }
      />
      <SettingRow
        title="Active sessions"
        description="3 devices · Chrome on macOS, Safari on iPhone, Chrome on Windows"
        action={
          <Button variant="outline-gold" className="h-auto rounded-lg px-8 py-4 text-base font-medium">
            <span className="gold-gradient-text">Sign out others</span>
          </Button>
        }
      />
      <ChangePasswordModal open={open} onOpenChange={setOpen} />
    </SettingsCard>
  );
}
