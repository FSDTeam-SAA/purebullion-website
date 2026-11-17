import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  action?: { label: string; href?: string };
  extra?: React.ReactNode;
};

/** Raised-card header: signals icon + 24px title + optional gold underlined link. */
export function CardHeader({ title, action, extra }: Props) {
  return (
    <header className="flex items-center justify-between gap-4 border-b-2 border-[#293033] p-4">
      <div className="flex items-center gap-4">
        <Image src="/icons/nav/signals.svg" alt="" width={24} height={24} />
        <h2 className="text-[24px] font-medium leading-[1.2] text-pb-text">{title}</h2>
      </div>
      {extra}
      {action &&
        (action.href ? (
          <Link href={action.href} className="gold-gradient-text text-[12px] underline underline-offset-2">
            {action.label}
          </Link>
        ) : (
          <span className="gold-gradient-text text-[12px] underline underline-offset-2">{action.label}</span>
        ))}
    </header>
  );
}
