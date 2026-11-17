import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { cancelInfo, foundingMember, helpInfo } from "./data";

function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-lg bg-[#171d1f]">
      <h2 className="border-b-2 border-[#293033] p-4 text-[24px] font-medium leading-[1.2] text-pb-text">{title}</h2>
      <div className="flex flex-col gap-4 p-4">{children}</div>
    </section>
  );
}

const copy = "text-[14px] font-bold leading-[1.2] text-[#e5e5e5]";

export function SideCards() {
  return (
    <div className="flex flex-col gap-6">
      <SideCard title="Founding member">
        <p className={copy}>{foundingMember.text}</p>
        <div className="flex flex-col gap-2">
          <Progress value={foundingMember.progress} className="h-2 rounded-lg bg-[#293033] [&>div]:rounded-lg [&>div]:bg-gold-gradient" />
          <p className="text-[16px] leading-normal text-pb-muted">{foundingMember.caption}</p>
        </div>
      </SideCard>
      <SideCard title="Cancelling">
        <p className={copy}>{cancelInfo.text}</p>
        <Link href="#" className="gold-gradient-text w-fit text-[12px] font-medium underline underline-offset-2">
          {cancelInfo.link}
        </Link>
      </SideCard>
      <SideCard title="Need help?">
        <p className={copy}>{helpInfo.text}</p>
        <button type="button" className="h-[35px] w-full rounded-lg border border-white text-[16px] font-medium text-pb-text hover:bg-white/10">
          {helpInfo.cta}
        </button>
      </SideCard>
    </div>
  );
}
