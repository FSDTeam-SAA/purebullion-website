import type { BillingCycle, MySubscription, SubscriptionPlan, UserSubscription } from "@/services/subscription.service";

export const planPrice = (plan: SubscriptionPlan, cycle: BillingCycle) =>
  cycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

export const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

/** The user's active subscription (plan populated), or null. */
export function activeSub(my?: MySubscription): (UserSubscription & { plan: SubscriptionPlan }) | null {
  if (!my?.hasActiveSubscription || !my.subscription) return null;
  if (typeof my.subscription.plan === "string") return null;
  return my.subscription as UserSubscription & { plan: SubscriptionPlan };
}

export const sortPlans = (plans: SubscriptionPlan[] = []) =>
  [...plans].filter((p) => p.isActive).sort((a, b) => a.sortOrder - b.sortOrder);

export const nextChargeDate = (cycle: BillingCycle) => {
  const d = new Date();
  if (cycle === "yearly") d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1);
  return d;
};
