"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { CancelSubscriptionModal } from "./modals/CancelSubscriptionModal";
import { UpgradeModal } from "./modals/UpgradeModal";
import { DowngradeModal } from "./modals/DowngradeModal";
import { PaymentMethodModal } from "./modals/PaymentMethodModal";

type ModalName = "cancel" | "upgrade" | "downgrade" | "payment" | null;

const Ctx = createContext<{ open: (m: Exclude<ModalName, null>) => void }>({ open: () => {} });

export const useSubscriptionModals = () => useContext(Ctx);

/** Holds open/close state for the four subscription dialogs and renders them. */
export function SubscriptionModalsProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ModalName>(null);
  const value = useMemo(() => ({ open: (m: Exclude<ModalName, null>) => setActive(m) }), []);
  const onOpenChange = (name: Exclude<ModalName, null>) => (o: boolean) => setActive(o ? name : null);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CancelSubscriptionModal open={active === "cancel"} onOpenChange={onOpenChange("cancel")} />
      <UpgradeModal open={active === "upgrade"} onOpenChange={onOpenChange("upgrade")} />
      <DowngradeModal open={active === "downgrade"} onOpenChange={onOpenChange("downgrade")} />
      <PaymentMethodModal open={active === "payment"} onOpenChange={onOpenChange("payment")} />
    </Ctx.Provider>
  );
}
