/** Raised card with 24px title row (+ optional subtitle) and hairline divider, shared by the settings sections. */
export function SettingsCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-lg bg-[#171d1f]">
      <header className="flex flex-col gap-2 border-b-2 border-[#293033] p-4">
        <h2 className="text-[24px] font-semibold leading-[1.2] text-pb-text">{title}</h2>
        {subtitle && <p className="text-[12px] leading-[1.2] text-pb-muted">{subtitle}</p>}
      </header>
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </section>
  );
}

/** Grey row: title + helper text on the left, action on the right. */
export function SettingRow({ title, description, action }: { title: string; description: string; action: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-[#293033] px-4 py-2">
      <div className="flex min-h-[51px] flex-col justify-center gap-2">
        <p className="text-[18px] font-semibold leading-[1.2] text-pb-text">{title}</p>
        <p className="text-[12px] leading-[1.2] text-pb-muted">{description}</p>
      </div>
      {action}
    </div>
  );
}
