import type { ReactNode } from "react";
import { Raleway } from "next/font/google";
import { Sidebar } from "./_components/layout/Sidebar";
import { TopNav } from "./_components/layout/TopNav";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${raleway.variable} pb-dashboard flex h-screen w-full overflow-hidden bg-pb-base font-raleway text-pb-text`}
    >
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <main className="pb-scroll flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
