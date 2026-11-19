import type { Metadata } from "next";
import LegalPage from "@/components/website/legal/LegalPage";
import { privacyPolicy } from "@/data/website/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Pure Bullion",
  description: privacyPolicy.description,
};

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
