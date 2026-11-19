import Image from "next/image";
import PageContainer from "@/components/website/shared/PageContainer";
import { CONTACT_CARDS } from "@/data/website/contact";

export default function ContactCards() {
  return (
    <PageContainer className="relative">
      <div className="grid gap-5 md:grid-cols-3">
        {CONTACT_CARDS.map((c) => (
          <div
            key={c.title}
            className="flex flex-col gap-4 rounded-xl border-[0.5px] border-pb-bronze bg-black/25 p-5 shadow-[2px_2px_4px_rgba(213,171,41,0.1)]"
          >
            <div className="w-fit rounded bg-[rgba(192,146,72,0.1)] p-2">
              <Image src={c.icon} alt="" width={32} height={32} />
            </div>
            <h3 className="text-xl font-semibold leading-[1.2] text-white">{c.title}</h3>
            <div className="flex flex-col gap-2">
              <p className="break-words text-lg font-medium leading-[1.2] text-white">{c.value}</p>
              <p className="text-sm leading-[1.5] text-[#a8a8a8]">{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
