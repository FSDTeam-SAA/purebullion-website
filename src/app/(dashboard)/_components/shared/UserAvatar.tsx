"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/** First letters of the first two words of a name (e.g. "Jordan Reyes" -> "JR"). */
export function getInitials(name?: string | null) {
  const words = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "U";
  return (words.length === 1 ? words[0].slice(0, 2) : words[0][0] + words[1][0]).toUpperCase();
}

/** Profile picture, falling back to the user's initials when there is no image (or it fails to load). */
export function UserAvatar({
  name,
  src,
  className,
}: {
  name?: string | null;
  src?: string | null;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = !!src && !failed;

  return (
    <span
      className={cn(
        "flex size-full items-center justify-center overflow-hidden rounded-full bg-gold-gradient text-[14px] font-bold text-black",
        className
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name ?? "Profile"} onError={() => setFailed(true)} className="size-full object-cover" />
      ) : (
        <span aria-label={name ?? "Profile"}>{getInitials(name)}</span>
      )}
    </span>
  );
}
