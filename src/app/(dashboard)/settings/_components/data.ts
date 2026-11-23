/** UI select value -> IANA zone stored on the user. */
export const tzToIana: Record<string, string> = {
  et: "America/New_York",
  ct: "America/Chicago",
  mt: "America/Denver",
  pt: "America/Los_Angeles",
  gmt: "GMT",
};
export const ianaToTz = (iana?: string) =>
  Object.entries(tzToIana).find(([, v]) => v === iana)?.[0] ?? "et";

export const timezones = [
  { value: "et", label: "Eastern Time (ET)" },
  { value: "ct", label: "Central Time (CT)" },
  { value: "mt", label: "Mountain Time (MT)" },
  { value: "pt", label: "Pacific Time (PT)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
];

/** Settings toggles mapped onto backend `toggles` keys. */
export const notifications = [
  { id: "newSignals", label: "New signals" },
  { id: "signalClosed", label: "Signal closed" },
  { id: "signalProximity", label: "Signal proximity" },
  { id: "marketConditionChange", label: "Market condition change" },
  { id: "watchlistMovers", label: "Watchlist movers" },
  { id: "communityReplies", label: "Community replies" },
  { id: "dailyBriefingEmail", label: "Daily briefing email" },
  { id: "weeklyWrapEmail", label: "Weekly wrap email" },
] as const;

export const passwordFields = [
  { id: "current", label: "Current password" },
  { id: "new", label: "New password" },
  { id: "confirm", label: "Confirm new password" },
];
