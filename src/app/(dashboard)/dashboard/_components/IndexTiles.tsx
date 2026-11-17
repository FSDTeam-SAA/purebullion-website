import { StatTile } from "../../_components/shared";
import { indexTiles } from "./data";

export function IndexTiles() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-5">
      {indexTiles.map((t) => (
        <StatTile key={t.label} label={t.label} value={t.value} change={t.change} trend={t.trend} spark className="h-[110px]" />
      ))}
    </div>
  );
}
