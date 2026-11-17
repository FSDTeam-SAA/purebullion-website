export function ConditionsBanner() {
  return (
    <section className="flex items-center justify-between gap-6 rounded-[2px] border border-pb-gold-dark bg-[linear-gradient(135deg,#1f150d_0%,#18120a_100%)] px-4 py-4">
      <div className="flex items-start gap-4">
        <span className="mt-3 inline-flex items-center gap-2 rounded-[4px] border border-pb-up bg-[rgba(0,122,85,0.2)] px-2 py-1 text-[12px] leading-none text-pb-up">
          <span className="size-2 rounded-full bg-pb-up" />
          Risk-On
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="text-[24px] font-normal leading-[1.2] text-pb-text">Conditions favour long setups</h2>
          <p className="text-[12px] leading-[1.5] text-pb-muted">
            Breadth 2.1:1 · index trend intact above the 50-day · VIX 14.62, contained. The model is permitted to publish long and short signals; short publication threshold is raised.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-[12px] text-pb-muted">Condition score</span>
        <span className="gold-gradient-text text-[24px] font-semibold leading-none">72</span>
      </div>
    </section>
  );
}
