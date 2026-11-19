import Image from "next/image";
import Link from "next/link";

/** Gold underlined "Label ↗" link used across the home sections. */
export default function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center justify-center gap-1 border-b border-pb-bronze pb-0.5 text-lg font-medium leading-[1.2] text-pb-bronze transition hover:opacity-80"
    >
      <span>{children}</span>
      <Image src="/icons/website/home/arrow-up-right-gold.svg" alt="" width={20} height={20} />
    </Link>
  );
}
