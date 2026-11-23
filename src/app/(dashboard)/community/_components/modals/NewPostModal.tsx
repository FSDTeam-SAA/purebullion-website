"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { POST_TOPICS } from "../data";
import { ModalShell } from "./ModalShell";

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onPublish: (p: { title: string; body: string; category: (typeof POST_TOPICS)[number]; file?: File }) => void;
  publishing?: boolean;
};

const label = "text-[16px] font-normal leading-normal text-white";
const field = "rounded-lg border-white/10 bg-transparent px-3 text-[16px] text-[#c8c8c8] placeholder:text-[#c8c8c8] focus-visible:ring-1 focus-visible:ring-pb-gold/60";

export function NewPostModal({ open, onOpenChange, onPublish, publishing }: Props) {
  const [topic, setTopic] = useState<(typeof POST_TOPICS)[number]>("Signals");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState<File | undefined>();
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setTopic("Signals"); setTitle(""); setBody(""); setFile(undefined); setFileName("");
  };
  const handleOpen = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };
  const publish = () => {
    onPublish({ category: topic, title: title.trim(), body: body.trim(), file });
    handleOpen(false);
  };
  const onFile = (f?: File) => {
    if (!f) return;
    setFileName(f.name);
    setFile(f);
  };

  return (
    <ModalShell
      open={open}
      onOpenChange={handleOpen}
      title="New Post"
      confirmLabel="Publish post"
      onConfirm={publish}
      confirmDisabled={!title.trim() || !body.trim() || publishing}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-center gap-3">
          <label className={label}>Topic</label>
          <Select value={topic} onValueChange={(v) => setTopic(v as typeof topic)}>
            <SelectTrigger className="h-12 rounded-lg border-white/10 bg-transparent px-3 text-[16px] font-bold text-[#c8c8c8] focus:ring-pb-gold/60">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[#293033] bg-[#121719] text-white">
              {POST_TOPICS.map((t) => (
                <SelectItem key={t} value={t} className="focus:bg-white/10 focus:text-white">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col justify-center gap-3">
          <label htmlFor="np-title" className={label}>Title</label>
          <Input id="np-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="title" className={`h-12 ${field}`} />
        </div>
        <div className="flex flex-col justify-center gap-3">
          <label htmlFor="np-body" className={label}>Post</label>
          <Textarea id="np-body" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Enter your post" className={`h-[149px] resize-none py-2 ${field}`} />
        </div>
        <div className="flex flex-col justify-center gap-3">
          <label className={label}>Upload Photo (optional)</label>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0])} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex h-[149px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#fdfdfd]/10 px-3 py-2 hover:border-pb-gold/40"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/community/upload.svg" alt="" className="size-12" />
            {fileName && <span className="text-[12px] text-pb-muted">{fileName}</span>}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
