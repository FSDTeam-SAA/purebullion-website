"use client";

import { Button } from "@/components/ui/button";
import { SettingRow, SettingsCard } from "./SettingsCard";
import { btn, btnLight } from "./btn";
import { useState } from "react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { getErrorMessage } from "@/services/apiClient";
import { profileService } from "@/services/profile.service";
import { useCloseAccount, useCurrentUser, useDeleteConversations, useReopenAccount } from "@/hooks/useProfile";
import { fmtDate } from "@/lib/format";

export function PrivacyCard() {
  const [exporting, setExporting] = useState(false);
  const { data: user } = useCurrentUser();
  const delConv = useDeleteConversations();
  const close = useCloseAccount();
  const reopen = useReopenAccount();

  const onExport = async () => {
    setExporting(true);
    try {
      const data = await profileService.exportData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "purebullion-data-export.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success("Your data export is ready");
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setExporting(false);
    }
  };

  const onDelete = () => {
    if (!window.confirm("Delete all your AI conversations and community posts/comments? This cannot be undone.")) return;
    delConv.mutate();
  };

  const onClose = () => {
    if (!window.confirm("Close your account? It will be permanently deleted after 90 days. You can reopen it before then.")) return;
    close.mutate({}, { onSuccess: () => signOut({ callbackUrl: "/login" }) });
  };

  return (
    <SettingsCard title="Privacy and data">
      <SettingRow
        title="Export my data"
        description="Download everything we hold about you as JSON."
        action={
          <Button variant="light" className={btnLight} disabled={exporting} onClick={onExport}>
            {exporting ? "Preparing..." : "Export"}
          </Button>
        }
      />
      <SettingRow
        title="Delete AI conversation history"
        description="Removes all assistant conversations from your account."
        action={
          <Button
            disabled={delConv.isPending}
            onClick={onDelete}
            className={`${btn} border border-transparent bg-[#d94f59] text-pb-text hover:bg-[#d94f59]/90`}
          >
            {delConv.isPending ? "Deleting..." : "Delete"}
          </Button>
        }
      />
      {user?.isClosed ? (
        <SettingRow
          title="Reopen account"
          description={`Scheduled for deletion on ${fmtDate(user.scheduledDeletionDate)}. Reopen to cancel.`}
          action={
            <Button variant="light" className={btnLight} disabled={reopen.isPending} onClick={() => reopen.mutate()}>
              {reopen.isPending ? "Reopening..." : "Reopen account"}
            </Button>
          }
        />
      ) : (
        <SettingRow
          title="Close account"
          description="Permanently deletes your account after 90 days."
          action={
            <Button
              variant="outline-danger"
              disabled={close.isPending}
              onClick={onClose}
              className={`${btn} border-[#d94f59] bg-[rgba(217,79,89,0.2)] text-[#d94f59] hover:bg-[rgba(217,79,89,0.3)]`}
            >
              {close.isPending ? "Closing..." : "Close account"}
            </Button>
          }
        />
      )}
    </SettingsCard>
  );
}
