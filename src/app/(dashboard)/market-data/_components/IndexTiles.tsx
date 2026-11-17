import { StatTile } from "../../_components/shared";
import { indexTiles } from "./data";

export function IndexTiles() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 2xl:grid-cols-6">
      {indexTiles.map((t) => (
        <StatTile key={t.label} label={t.label} value={t.value} change={t.change} trend={t.trend} spark className="h-[100px]" />
      ))}
    </div>
  );
}
