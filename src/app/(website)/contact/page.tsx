import type { Metadata } from "next";
import ContactCards from "@/components/website/contact/ContactCards";
import ContactForm from "@/components/website/contact/ContactForm";
import ContactInfo from "@/components/website/contact/ContactInfo";
import CtaBanner from "@/components/website/shared/CtaBanner";
import HeroBackdrop from "@/components/website/shared/HeroBackdrop";
import PageContainer from "@/components/website/shared/PageContainer";
import SectionBadge from "@/components/website/shared/SectionBadge";

export const metadata: Metadata = {
  title: "Contact | Pure Bullion",
  description: "Reach out to the Pure Bullion team.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#090803]">
        <HeroBackdrop />
        <div className="relative flex flex-col gap-12 pb-16 pt-36 sm:pt-40 lg:gap-[70px] lg:pb-[80px] lg:pt-[159px]">
          <div className="mx-auto flex max-w-[872px] flex-col items-center gap-4 px-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <SectionBadge>Contact</SectionBadge>
              <h1 className="text-[36px] font-bold leading-[1.2] sm:text-[48px] lg:text-[64px]">
                <span className="gold-gradient-text-lg">Let’s Start a </span>
                <span className="text-white">Conversation</span>
              </h1>
            </div>
            <p className="max-w-[807px] text-lg font-medium leading-[1.5] text-pb-body sm:text-xl lg:text-2xl">
              Have questions about Pure Bullion, your membership, or the platform? Reach
              out to our team and we’ll help you find the right answer.
            </p>
          </div>
          <ContactCards />
          <PageContainer className="flex flex-col gap-10 lg:flex-row lg:gap-[120px] lg:pt-[10px]">
            <ContactInfo />
            <ContactForm />
          </PageContainer>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
