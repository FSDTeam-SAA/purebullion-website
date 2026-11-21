export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Community", href: "/our-community" },
  { label: "News", href: "/news" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_QUICK_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Community", href: "/our-community" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_RESOURCE_LINKS: NavItem[] = [
  { label: "Help Center", href: "/contact" },
  { label: "FAQs", href: "/pricing#faq" },
  { label: "Market Insights", href: "/news" },
  { label: "Support", href: "/contact" },
];

export const FOOTER_LEGAL_LINKS: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/privacy-policy" },
];

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#", icon: "/icons/website/facebook.svg" },
  { label: "LinkedIn", href: "#", icon: "/icons/website/linkedin.svg" },
  { label: "Instagram", href: "#", icon: "/icons/website/instagram.svg" },
];
