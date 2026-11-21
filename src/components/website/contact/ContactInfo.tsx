import Image from "next/image";
import Link from "next/link";
import { CONTACT_CHECKLIST, CONTACT_SOCIALS } from "@/data/website/contact";

export default function ContactInfo() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold leading-[1.2] text-white lg:text-[32px]">
          Reach Out Anytime. We’re Here to Help.
        </h2>
        <p className="text-base leading-[1.5] text-[#a8a8a8]">
          Tell us what you need assistance with and our team will direct your message to
          the right place.
        </p>
        <ul className="flex flex-col gap-3">
          {CONTACT_CHECKLIST.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Image src="/icons/website/contact/check.svg" alt="" width={16} height={16} />
              <span className="text-base leading-[1.2] text-[#e5e5e5]">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold leading-[1.2] text-white">Social Media:</p>
        <div className="flex gap-5">
          {CONTACT_SOCIALS.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="rounded-[30px] bg-[rgba(192,146,72,0.1)] p-3 transition hover:bg-[rgba(192,146,72,0.2)]"
            >
              <Image src={s.icon} alt="" width={24} height={24} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
