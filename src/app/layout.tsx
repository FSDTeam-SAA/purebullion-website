import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import AppProvider from "@/provider/AppProvider";
import AuthProvider from "@/provider/AuthProvider";
import { Toaster } from "sonner";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PureBullion | Market Intelligence Dashboard",
    template: "%s | PureBullion",
  },
  description:
    "PureBullion - Information Creates Opportunity. Market data, quantitative signals, stock scanner, watchlists and AI-powered research in one dashboard.",
  applicationName: "PureBullion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} font-raleway antialiased`}>
        <NextTopLoader color="#0070f3" height={3} showSpinner={false} />
        <AppProvider>
          <AuthProvider>
            <div className="">{children}</div>
              <Toaster richColors position="bottom-right" />
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
