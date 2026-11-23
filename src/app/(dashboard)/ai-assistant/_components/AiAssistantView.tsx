"use client";

import { useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { ChatSidebar } from "./ChatSidebar";
import { ContextColumn } from "./ContextColumn";

export function AiAssistantView() {
  const [activeId, setActiveId] = useState("msft");
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="flex flex-col gap-6 p-6 lg:h-full lg:min-h-0 lg:flex-row lg:items-stretch">
      <ChatSidebar
        activeId={activeId}
        onSelect={setActiveId}
        onNewChat={() => {
          setActiveId("");
          setResetKey((k) => k + 1);
        }}
      />
      <ChatPanel resetKey={resetKey} />
      <ContextColumn />
    </div>
  );
}
