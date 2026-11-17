import { STATS } from "./data";

/** Three gradient metric tiles (Total Members / Your total Post / Total Likes). */
export function StatTiles() {
  return (
    <div className="flex items-stretch gap-6 pl-4">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="flex min-w-0 flex-1 flex-col gap-[3px] rounded-lg border border-[#ffe8d9] bg-[linear-gradient(90deg,rgba(0,0,0,0.86),rgba(0,0,0,0.86)),linear-gradient(143deg,#A48226_0%,#E7C042_31%,#FFF5CA_45%,#D5AB29_61%,#A78424_82%)] p-4 text-pb-text"
        >
          <p className="font-['Montserrat',sans-serif] text-[12px] font-medium">{s.label}</p>
          <p className="text-[20px] font-bold leading-[1.2]">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
