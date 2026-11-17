import { SubscriptionModalsProvider } from "./SubscriptionModals";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { BillingHistory } from "./BillingHistory";
import { ComparePlans } from "./ComparePlans";
import { SideCards } from "./SideCards";

export function SubscriptionContent() {
  return (
    <SubscriptionModalsProvider>
      <div className="grid grid-cols-1 items-start gap-6 p-6 xl:grid-cols-[minmax(0,1181px)_minmax(0,407px)]">
        <div className="flex min-w-0 flex-col gap-6">
          <CurrentPlanCard />
          <BillingHistory />
          <ComparePlans />
        </div>
        <SideCards />
      </div>
    </SubscriptionModalsProvider>
  );
}
