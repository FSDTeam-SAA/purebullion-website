"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { earlierChats, todayChats, type ChatItem } from "./data";

type Props = { activeId: string; onSelect: (id: string) => void; onNewChat: () => void };

function GroupLabel({ children }: { children: React.ReactNode }) {
  return <p className="bg-[#293033] px-4 py-2 text-[14px] leading-normal text-pb-muted backdrop-blur-[15px]">{children}</p>;
}

function ChatRow({ item, active, onSelect }: { item: ChatItem; active: boolean; onSelect: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={cn(
        "relative flex w-full items-center overflow-hidden px-4 py-2 text-left text-[14px] font-medium leading-normal text-pb-text",
        active && "border-y border-l border-pb-gold-dark"
      )}
    >
      {active && (
        <>
          <Image src="/images/ai-assistant/tab-bg.png" alt="" fill sizes="332px" className="object-cover" />
          <span className="absolute inset-0 bg-black/70" />
        </>
      )}
      <span className={cn("relative flex-1", active && "gold-gradient-text")}>{item.title}</span>
    </button>
  );
}

export function ChatSidebar({ activeId, onSelect, onNewChat }: Props) {
  return (
    <aside className="pb-scroll flex w-full shrink-0 flex-col gap-4 rounded-lg bg-pb-head p-4 lg:min-h-0 lg:w-[364px] lg:overflow-y-auto">
      <button
        type="button"
        onClick={onNewChat}
        className="gold-gradient-btn flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-8 py-4 text-[16px] font-medium text-black"
      >
        <Image src="/icons/ai-assistant/add.svg" alt="" width={20} height={20} />
        New Chat
      </button>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <GroupLabel>TODAY</GroupLabel>
          <div className="flex flex-col gap-2">
            {todayChats.map((c) => (
              <ChatRow key={c.id} item={c} active={c.id === activeId} onSelect={onSelect} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <GroupLabel>EARLIER</GroupLabel>
          <div className="flex flex-col gap-2">
            {earlierChats.map((c) => (
              <ChatRow key={c.id} item={c} active={c.id === activeId} onSelect={onSelect} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
