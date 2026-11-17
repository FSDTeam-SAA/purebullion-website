import { CardHeader } from "./CardHeader";
import { KEY_DATA } from "./data";

export function KeyDataCard() {
  return (
    <section className="overflow-hidden rounded-[8px] bg-[#121719]">
      <CardHeader title="Key data" />
      <dl className="p-2">
        {KEY_DATA.map((k) => (
          <div key={k.label} className="flex h-[46px] items-center justify-between px-4">
            <dt className="text-[20px] text-pb-muted">{k.label}</dt>
            <dd className="text-[20px] font-bold text-pb-text">{k.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
