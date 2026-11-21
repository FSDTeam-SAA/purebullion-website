import type { Metadata } from "next";
import LegalPage from "@/components/website/legal/LegalPage";
import { termsOfService } from "@/data/website/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Pure Bullion",
  description: termsOfService.description,
};

export default function TermsOfServicePage() {
  return <LegalPage doc={termsOfService} />;
}
