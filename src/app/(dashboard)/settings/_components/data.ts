export const profile = {
  fullName: "Jordan Reyes",
  displayName: "Jordan R.",
  email: "jordan@email.com",
  timezone: "et",
  tags: [
    { label: "Professional", tone: "green" as const },
    { label: "Founding member #388", tone: "gold" as const },
  ],
};

export const timezones = [
  { value: "et", label: "Eastern Time (ET)" },
  { value: "ct", label: "Central Time (CT)" },
  { value: "mt", label: "Mountain Time (MT)" },
  { value: "pt", label: "Pacific Time (PT)" },
  { value: "gmt", label: "Greenwich Mean Time (GMT)" },
];

export const notifications = [
  { id: "new-signals", label: "New signals", on: true },
  { id: "signal-closed", label: "Signal closed", on: true },
  { id: "signal-closed-2", label: "Signal closed", on: true },
  { id: "market-condition", label: "Market condition change", on: true },
  { id: "watchlist-movers", label: "Watchlist movers", on: false },
  { id: "community-replies", label: "Community replies", on: true },
  { id: "daily-briefing", label: "Daily briefing email", on: true },
  { id: "weekly-wrap", label: "Weekly wrap email", on: false },
];

export const passwordFields = [
  { id: "current", label: "Current password" },
  { id: "new", label: "New password" },
  { id: "confirm", label: "Confirm new password" },
];
