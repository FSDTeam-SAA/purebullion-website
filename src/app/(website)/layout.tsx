import Footer from "@/components/website/layout/Footer";
import Navbar from "@/components/website/layout/Navbar";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-website relative min-h-screen overflow-x-clip">
      <Navbar />
      <main className="flex flex-col gap-20 pb-20 lg:gap-[120px] lg:pb-[120px]">{children}</main>
      <Footer />
    </div>
  );
}
