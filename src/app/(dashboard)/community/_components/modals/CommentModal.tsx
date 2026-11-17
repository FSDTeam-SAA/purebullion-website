"use client";

import { useState } from "react";
import { ModalShell } from "./ModalShell";

type Props = { open: boolean; onOpenChange: (o: boolean) => void; onSave: (text: string) => void };

export function CommentModal({ open, onOpenChange, onSave }: Props) {
  const [text, setText] = useState("");
  const handleOpen = (o: boolean) => {
    if (!o) setText("");
    onOpenChange(o);
  };
  return (
    <ModalShell
      open={open}
      onOpenChange={handleOpen}
      title="Write  your comment"
      confirmLabel="Save comment"
      confirmDisabled={!text.trim()}
      onConfirm={() => { onSave(text.trim()); handleOpen(false); }}
    >
      <div className="rounded-lg bg-[rgba(200,200,200,0.1)] p-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="type comment…"
          className="block h-[107px] w-full resize-none bg-transparent py-2 text-[13px] text-pb-text outline-none placeholder:text-pb-muted"
        />
      </div>
    </ModalShell>
  );
}
