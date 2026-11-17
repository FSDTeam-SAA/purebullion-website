import Image from "next/image";
import { Sparkline } from "../../_components/shared";
import { actionChips, marketCards, sparkData } from "./data";

export type Message =
  | { id: string; role: "user"; text: string; time?: string; label?: boolean }
  | { id: string; role: "ai"; kind: "brief" }
  | { id: string; role: "ai"; kind: "text"; text: string }
  | { id: string; role: "ai"; kind: "loading" };

export function UserBubble({ text, time, label }: { text: string; time?: string; label?: boolean }) {
  return (
    <div className="flex max-w-[409px] items-end justify-end gap-3 self-end">
      <div className="flex flex-col items-end gap-3 leading-[1.2]">
        <div className="flex flex-col items-end gap-1 rounded-l-2xl rounded-tr-2xl border border-[#f5f7ff] bg-pb-text p-3">
          {label && <p className="self-end text-[12px] font-semibold text-[#697370]">YOU</p>}
          <p className={label ? "text-[14px] font-medium text-[#080b0c]" : "text-[12px] leading-normal text-[#080b0c]"}>{text}</p>
        </div>
        {time && <p className="text-[10px] text-pb-muted">{time}</p>}
      </div>
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white font-['Space_Grotesk',sans-serif] text-[20px] font-medium text-[#5b7ff0] shadow-[0_0_4px_rgba(0,0,0,0.25)]">
        RH
      </div>
    </div>
  );
}

function AiAvatar() {
  return (
    <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-[#8b93b8]">
      <Image src="/images/ai-assistant/ai-avatar.png" alt="Pure Bullion AI" fill sizes="36px" className="object-cover" />
    </div>
  );
}

function AiBubble({ children, time }: { children: React.ReactNode; time?: string }) {
  return (
    <div className="flex max-w-[668px] items-start gap-3">
      <AiAvatar />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-[11px] rounded-r-2xl rounded-bl-2xl bg-pb-surface p-4">{children}</div>
        {time && <p className="text-[10px] leading-[1.2] text-pb-muted">{time}</p>}
      </div>
    </div>
  );
}

const Hl = ({ children }: { children: React.ReactNode }) => <span className="text-pb-text">{children}</span>;

export function BriefMessage() {
  return (
    <AiBubble time="Tue, Sep 15 at 2:58 PM">
      <p className="text-[12px] font-semibold leading-[1.2] text-[#697370]">PURE BULLION AI</p>
      <p className="text-[14px] leading-[1.2] text-pb-muted">
        Microsoft is up <Hl>1.19% to $518.36</Hl> on volume roughly 1.3x its 30-day average. Three contributing factors:
      </p>
      <div className="flex flex-col gap-[3px] text-[14px] leading-[1.2] text-pb-muted">
        <p>
          1. <Hl>Sector strength.</Hl> Technology is the second-best sector today at +1.08%, and MSFT is moving in line with it rather than leading.
        </p>
        <p>
          2. <Hl>A technical level held.</Hl> Price pulled back into the rising 20-day moving average and has closed above it for three sessions with a
        </p>
        <p>contracting daily range.</p>
        <p>
          3. <Hl>An open Pure Bullion signal.</Hl> Signal PB-2480 (BUY, entry $509.40) published Sept 16 is open and currently 1.76% above entry.
        </p>
      </div>
      <p className="text-[14px] leading-[1.2] text-pb-muted">There is no company-specific news in today’s feed that explains the move on its own.</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        {marketCards.map((c) => (
          <div key={c.symbol} className="flex h-[95px] min-w-0 flex-1 flex-col gap-[5px] rounded-lg border border-pb-head bg-[#0c0f10] px-[13px] pb-[10px] pt-[13px]">
            <div className="flex items-center justify-between">
              <p className="text-[16px] font-semibold leading-[1.2] text-pb-text">{c.symbol}</p>
              <p className="font-[Arimo,sans-serif] text-[11px]" style={{ color: c.color }}>{c.change}</p>
            </div>
            <p className="text-[16px] font-bold leading-[1.2] text-pb-text">{c.price}</p>
            <Sparkline data={sparkData[c.symbol as keyof typeof sparkData]} trend={c.trend} width={92} height={25} className="h-[25px] w-[92px]" />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {actionChips.map((a) => (
          <button key={a} type="button" className="rounded-[3px] border border-pb-head bg-[#0c0f10] px-[10px] py-[6px] text-[16px] font-semibold leading-[1.2] text-pb-text">
            {a}
          </button>
        ))}
      </div>
      <p className="text-[12px] leading-[1.5] text-pb-muted">
        Sources: Pure Bullion market data (Sep 19, 16:00 ET) · Signal PB-2480 · Sector performance snapshot · Daily briefing Sep 19
      </p>
    </AiBubble>
  );
}

export function TextMessage({ text }: { text: string }) {
  return (
    <AiBubble>
      <p className="text-[12px] font-semibold leading-[1.2] text-[#697370]">PURE BULLION AI</p>
      <p className="text-[14px] leading-[1.2] text-pb-muted">{text}</p>
    </AiBubble>
  );
}

export function LoadingMessage() {
  return (
    <AiBubble>
      <p className="text-[11px] font-bold tracking-[0.6px] text-[#657282]">PURE BULLION AI</p>
      <p className="gold-gradient-text text-[14px] leading-[1.2]">Reading sector data.......</p>
    </AiBubble>
  );
}

export function MessageView({ m }: { m: Message }) {
  if (m.role === "user") return <UserBubble text={m.text} time={m.time} label={m.label} />;
  if (m.kind === "brief") return <BriefMessage />;
  if (m.kind === "text") return <TextMessage text={m.text} />;
  return <LoadingMessage />;
}
