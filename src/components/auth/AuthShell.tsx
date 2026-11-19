import Image from "next/image";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  /** Gap between the card's blocks – Figma uses 24px on sign-up, 32px elsewhere */
  compact?: boolean;
}

/** Full-screen gold-chart background with the frosted glass card in the middle. */
export default function AuthShell({ title, description, children, compact }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-10">
      <Image
        src="/images/auth/auth-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />

      <div
        className={cn(
          "relative flex w-full max-w-[552px] flex-col rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-[10px] sm:p-10",
          compact ? "gap-6" : "gap-8",
        )}
      >
        {/* logo crop from Figma artwork */}
        <div className="relative aspect-[1168/321] w-full shrink-0 overflow-hidden">
          <Image
            src="/images/auth/logo-full.png"
            alt="Pure Bullion – Information Creates Opportunity"
            width={1774}
            height={887}
            className="pointer-events-none absolute left-[-3.51%] top-[-47.04%] h-[195.33%] w-[107.36%] max-w-none"
          />
        </div>

        <div className="flex flex-col gap-2 text-center leading-normal">
          <h1 className="text-[28px] font-semibold text-white sm:text-[32px]">{title}</h1>
          {description && <p className="text-base text-[#bebebe]">{description}</p>}
        </div>

        {children}
      </div>
    </div>
  );
}
