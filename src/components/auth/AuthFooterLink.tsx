import Link from "next/link";

export default function AuthFooterLink({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <p className="flex flex-wrap items-center justify-center gap-2 text-base leading-normal">
      <span className="text-[#c8c8c8]">{text}</span>
      <Link href={href} className="font-semibold text-pb-bronze-dark hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
