"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MessageView, type Message } from "./ChatMessages";
import { CANNED_REPLY, suggestedPrompts } from "./data";

const initial: Message[] = [
  { id: "u1", role: "user", text: "Why is Microsoft moving today?", time: "Tue, Sep 15 at 2:58 PM", label: true },
  { id: "a1", role: "ai", kind: "brief" },
  { id: "u2", role: "user", text: "What are the major risks in this sector?" },
  { id: "a2", role: "ai", kind: "loading" },
];

export function ChatPanel({ resetKey }: { resetKey: number }) {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (resetKey > 0) setMessages([]);
  }, [resetKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  useEffect(() => () => clearTimeout(timer.current), []);

  function send(text: string) {
    const t = text.trim();
    if (!t) return;
    const id = String(Date.now());
    setMessages((m) => [...m.filter((x) => !(x.role === "ai" && x.kind === "loading")), { id: `u${id}`, role: "user", text: t }, { id: `l${id}`, role: "ai", kind: "loading" }]);
    setValue("");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setMessages((m) => m.map((x) => (x.id === `l${id}` ? { id: `r${id}`, role: "ai", kind: "text", text: CANNED_REPLY } : x)));
    }, 1600);
  }

  return (
    <section className="flex min-h-[640px] min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-pb-head backdrop-blur-[10px]">
      <header className="flex items-center justify-between gap-4 border-b-2 border-pb-text p-4">
        <div className="flex items-start gap-2">
          <Image src="/icons/ai-assistant/news.svg" alt="" width={24} height={24} />
          <div className="flex flex-col gap-2 leading-[1.2]">
            <h2 className="whitespace-nowrap text-[24px] font-medium text-pb-text">AI financial research assistant </h2>
            <p className="text-[12px] text-pb-muted">Research only — cannot place trades or give personalized advice</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded border border-pb-gold-dark bg-[rgba(8,11,12,0.32)] px-2 py-1 font-[Montserrat,sans-serif] text-[12px] font-medium text-pb-text">
            Sources on
          </button>
          <button type="button" aria-label="More" className="flex items-center justify-center rounded border border-pb-gold-dark bg-[rgba(8,11,12,0.32)] px-2 py-1">
            <Image src="/icons/ai-assistant/more.svg" alt="" width={16} height={16} />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <div className="pb-scroll flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto border-b border-pb-muted pb-2">
          {messages.map((m) => (
            <MessageView key={m.id} m={m} />
          ))}
          <div ref={endRef} />
        </div>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {suggestedPrompts.map((p) => (
              <button key={p} type="button" onClick={() => send(p)} className="rounded-lg bg-pb-surface p-2 text-[11px] font-bold tracking-[0.6px] text-[#657282]">
                {p}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(value);
            }}
            className="flex items-center gap-4 overflow-hidden rounded-lg border border-pb-gold-dark bg-[rgba(231,192,66,0.1)] px-6 py-3"
          >
            <Image src="/icons/ai-assistant/attach.svg" alt="Attach" width={24} height={24} />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Ask about any covered stock, ETF, sector or session…"
              className="min-w-0 flex-1 bg-transparent font-['Space_Grotesk',sans-serif] text-[16px] text-pb-text outline-none placeholder:text-pb-muted"
            />
            <button type="button" aria-label="Voice input" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(241,244,243,0.2)]">
              <Image src="/icons/ai-assistant/mic.svg" alt="" width={24} height={24} />
            </button>
            <button type="submit" aria-label="Send" className="gold-gradient-btn flex size-10 shrink-0 items-center justify-center rounded-full">
              <Image src="/icons/ai-assistant/send.svg" alt="" width={24} height={24} />
            </button>
          </form>
          <p className="text-[12px] leading-normal text-pb-muted">The assistant can be wrong. It provides research, not investment advice, and cannot place trades.</p>
        </div>
      </div>
    </section>
  );
}
