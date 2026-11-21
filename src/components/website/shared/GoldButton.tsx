import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GoldButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  href?: string;
  /** Show the Figma "arrow right" icon after the label. */
  arrow?: boolean;
  size?: "default" | "sm";
  className?: string;
}

/** Primary gold-gradient call-to-action (Figma "Button / Primary"). */
export default function GoldButton({
  href,
  arrow = false,
  size = "default",
  className,
  children,
  ...props
}: GoldButtonProps) {
  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-gold-gradient-btn font-medium text-black transition hover:brightness-110 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60",
    size === "default" ? "px-8 py-4 text-base" : "px-6 py-3 text-base",
    className,
  );

  const content = (
    <>
      <span className="whitespace-nowrap leading-normal">{children}</span>
      {arrow && (
        <Image src="/icons/website/arrow-right.svg" alt="" width={20} height={20} />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
