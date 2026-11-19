import { cn } from "@/lib/utils";

/**
 * Decorative hero background: black base, vertical pillar texture and soft gold glows.
 * Place inside a `relative overflow-hidden` wrapper.
 */
export default function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-[#090803]", className)}
    >
      {/* top glow */}
      <div
        className="absolute left-1/2 top-[-350px] h-[700px] w-[1440px] -translate-x-1/2 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/website/shared/glow-ellipse-2.svg)" }}
      />
      {/* pillars */}
      <div className="pb-pillars absolute inset-0 mix-blend-multiply" />
      {/* floating blobs */}
      <div
        className="absolute left-[calc(33%+57px)] top-[54px] hidden size-[420px] bg-contain bg-no-repeat mix-blend-plus-lighter lg:block"
        style={{ backgroundImage: "url(/images/website/shared/glow-ellipse-5.svg)" }}
      />
      <div
        className="absolute left-[calc(66%+30px)] top-[203px] hidden size-[420px] bg-contain bg-no-repeat mix-blend-plus-lighter lg:block"
        style={{ backgroundImage: "url(/images/website/shared/glow-ellipse-5.svg)" }}
      />
      {/* bottom glow */}
      <div
        className="absolute bottom-[-181px] left-1/2 h-[299px] w-[1706px] -translate-x-1/2 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/website/shared/glow-ellipse-11.svg)" }}
      />
    </div>
  );
}
