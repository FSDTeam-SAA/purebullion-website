"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { BillingCycle, SubscriptionPlan } from "@/services/subscription.service";
import { CancelSubscriptionModal } from "./modals/CancelSubscriptionModal";
import { UpgradeModal } from "./modals/UpgradeModal";
import { DowngradeModal } from "./modals/DowngradeModal";
import { PaymentMethodModal } from "./modals/PaymentMethodModal";

type ModalName = "cancel" | "upgrade" | "downgrade" | "payment" | null;
export type ModalTarget = { plan?: SubscriptionPlan; cycle?: BillingCycle };

const Ctx = createContext<{ open: (m: Exclude<ModalName, null>, target?: ModalTarget) => void }>({ open: () => {} });

export const useSubscriptionModals = () => useContext(Ctx);

/** Holds open/close state for the four subscription dialogs and renders them. */
export function SubscriptionModalsProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ModalName>(null);
  const [target, setTarget] = useState<ModalTarget>({});
  const value = useMemo(
    () => ({
      open: (m: Exclude<ModalName, null>, t?: ModalTarget) => {
        setTarget(t ?? {});
        setActive(m);
      },
    }),
    []
  );
  const onOpenChange = (name: Exclude<ModalName, null>) => (o: boolean) => setActive(o ? name : null);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CancelSubscriptionModal open={active === "cancel"} onOpenChange={onOpenChange("cancel")} />
      <UpgradeModal open={active === "upgrade"} onOpenChange={onOpenChange("upgrade")} target={target} />
      <DowngradeModal open={active === "downgrade"} onOpenChange={onOpenChange("downgrade")} target={target} />
      <PaymentMethodModal open={active === "payment"} onOpenChange={onOpenChange("payment")} />
    </Ctx.Provider>
  );
}
