import { SignalsHeaderBar } from "./_components/SignalsHeaderBar";
import { SignalsFilterChips } from "./_components/SignalsFilterChips";
import { SignalsTabs } from "./_components/SignalsTabs";
import { SignalsFilterBar } from "./_components/SignalsFilterBar";
import { OpenSignalCards } from "./_components/OpenSignalCards";
import { AllSignalsTable } from "./_components/AllSignalsTable";
import { SignalsFilterProvider } from "./_components/SignalsFilterContext";
import { SignalsDisclaimer } from "./_components/SignalsDisclaimer";

export default function SignalsPage() {
  return (
    <SignalsFilterProvider>
    <div className="flex min-h-full flex-col">
      <SignalsHeaderBar />
      <SignalsFilterChips />
      <div className="flex flex-col gap-6 px-6 pb-10 pt-6">
        <SignalsTabs />
        <SignalsFilterBar />
        <OpenSignalCards />
        <AllSignalsTable />
        <SignalsDisclaimer />
      </div>
    </div>
    </SignalsFilterProvider>
  );
}
