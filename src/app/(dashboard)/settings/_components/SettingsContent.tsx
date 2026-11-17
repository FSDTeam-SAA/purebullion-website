import { ProfileCard } from "./ProfileCard";
import { SecurityCard } from "./SecurityCard";
import { NotificationPreferences } from "./NotificationPreferences";
import { PrivacyCard } from "./PrivacyCard";

export function SettingsContent() {
  return (
    <div className="flex max-w-[1229px] flex-col gap-6 p-6">
      <ProfileCard />
      <SecurityCard />
      <NotificationPreferences />
      <PrivacyCard />
    </div>
  );
}
