export const TABS = ["All", "With signal", "Movers"] as const;
export type Tab = (typeof TABS)[number];

export const TAB_TO_API = { All: "all", "With signal": "with_signal", Movers: "movers" } as const;

export const PAGE_SIZE = 10;
