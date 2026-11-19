import Image from "next/image";
import Link from "next/link";
import {
  FOOTER_LEGAL_LINKS,
  FOOTER_QUICK_LINKS,
  FOOTER_RESOURCE_LINKS,
  SOCIAL_LINKS,
  type NavItem,
} from "@/data/website/navigation";
import BrandLogo from "./BrandLogo";

function LinkColumn({ title, links }: { title: string; links: NavItem[] }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-xl font-medium leading-[1.2] text-white">{title}</p>
      <ul className="flex flex-col gap-4">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-base leading-[1.2] text-pb-body transition-colors hover:text-pb-gold sm:text-xl"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-pb-footer pt-16 lg:pt-20">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-10 px-4 sm:px-8 lg:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[102px]">
          <div className="flex flex-col gap-6 lg:w-[427px] lg:shrink-0">
            <div className="flex flex-col gap-4">
              <BrandLogo withMark={false} />
              <p className="text-base leading-[1.5] text-pb-body">
                Premium market intelligence, AI-powered research, and financial
                insights all in one place.
              </p>
            </div>
            <div className="flex gap-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex rounded-[30px] bg-[rgba(192,146,72,0.15)] p-3 transition hover:bg-[rgba(192,146,72,0.3)]"
                >
                  <Image src={s.icon} alt="" width={20} height={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:justify-between">
            <LinkColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
            <LinkColumn title="Resources" links={FOOTER_RESOURCE_LINKS} />
            <div className="lg:w-[298px]">
              <LinkColumn title="Legal" links={FOOTER_LEGAL_LINKS} />
            </div>
          </div>
        </div>

        <div className="flex justify-center border-t border-[#808080] py-5">
          <p className="text-sm font-light leading-[1.2] text-pb-body">
            © 2026 Pure Bullion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
