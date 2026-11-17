"use client";

import { Button } from "@/components/ui/button";
import { SettingRow, SettingsCard } from "./SettingsCard";
import { btn, btnLight } from "./btn";

export function PrivacyCard() {
  return (
    <SettingsCard title="Privacy and data">
      <SettingRow
        title="Export my data"
        description="Download everything we hold about you as JSON."
        action={
          <Button variant="light" className={btnLight}>
            Export
          </Button>
        }
      />
      <SettingRow
        title="Delete AI conversation history"
        description="Removes all assistant conversations from your account."
        action={
          <Button className={`${btn} border border-transparent bg-[#d94f59] text-pb-text hover:bg-[#d94f59]/90`}>Delete</Button>
        }
      />
      <SettingRow
        title="Close account"
        description="Permanently deletes your account after 90 days."
        action={
          <Button
            variant="outline-danger"
            className={`${btn} border-[#d94f59] bg-[rgba(217,79,89,0.2)] text-[#d94f59] hover:bg-[rgba(217,79,89,0.3)]`}
          >
            Close account
          </Button>
        }
      />
    </SettingsCard>
  );
}
