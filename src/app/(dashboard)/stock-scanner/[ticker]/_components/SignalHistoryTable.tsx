import { SideTag } from "../../../_components/shared";
import { CardHeader } from "./CardHeader";
import { HISTORY } from "./data";

const COLS = ["ID", "Signal", "Entry", "Last / exit", "Return", "Outcome", "Closed"];

export function SignalHistoryTable({ ticker }: { ticker: string }) {
  return (
    <section className="overflow-hidden rounded-[8px] border border-[#171d1f] bg-[#121719]">
      <CardHeader title={`Signal history for ${ticker}`} action={{ label: "151 total" }} />
      <div className="overflow-x-auto pb-scroll">
        <table className="w-full min-w-[640px] table-fixed border-collapse text-[14px] text-pb-text">
          <thead>
            <tr className="h-[49px] bg-[#171d1f] text-[16px] font-medium">
              {COLS.map((c, i) => (
                <th key={c} className={`px-4 font-medium ${i === 0 ? "text-left" : "text-center"}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORY.map((r, i) => (
              <tr key={r.id} className={`h-12 ${i % 2 === 1 ? "bg-[#0d1112]" : ""}`}>
                <td className="px-4 text-left">{r.id}</td>
                <td className="px-4 text-center">
                  <SideTag side={r.side} className="rounded-[4px] px-2 py-1" />
                </td>
                <td className="px-4 text-center">{r.entry}</td>
                <td className="px-4 text-center">{r.last}</td>
                <td className="px-4 text-center">{r.ret}</td>
                <td className="px-4 text-center">{r.outcome}</td>
                <td className="px-4 text-center">{r.closed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
