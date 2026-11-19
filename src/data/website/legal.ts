export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export interface LegalSection {
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  badge: string;
  goldTitle: string;
  whiteTitle: string;
  description: string;
  summaryLabel: string;
  summary: string;
  sections: LegalSection[];
  consentPrefix: string;
  consentLink: string;
  consentSuffix: string;
}

const p = (text: string): LegalBlock => ({ type: "p", text });
const ul = (items: string[]): LegalBlock => ({ type: "ul", items });

export const privacyPolicy: LegalDocument = {
  badge: "Privacy Policy",
  goldTitle: "Your Privacy,",
  whiteTitle: "Our Priority",
  description:
    "Learn how Pure Bullion collects, uses, and protects your information while providing secure access to market intelligence, AI-powered research, alerts, and community features.",
  summaryLabel: "Privacy Summary:",
  summary:
    "We only collect the information required to provide and improve Pure Bullion’s market intelligence, AI-powered research, personal tracking, alerts, and community features. Your personal information is kept secure and never sold to advertisers.",
  sections: [
    {
      title: "Introduction",
      blocks: [
        p("Pure Bullion respects your privacy and is committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and the choices available to you when using our platform."),
        p("By creating an account or using Pure Bullion, you acknowledge the practices described in this policy."),
      ],
    },
    {
      title: "Information We Collect",
      blocks: [
        p("We may collect information that you provide directly, including:"),
        ul([
          "Name, email address, and account details.",
          "Watchlists, preferences, and personalized alerts.",
          "Community posts, comments, and interactions.",
          "Subscription and payment-related information.",
          "Questions or prompts submitted to AI-powered features.",
        ]),
        p("We may also collect device information, IP address, browser type, usage activity, and diagnostic data."),
      ],
    },
    {
      title: "How We Use Your Information",
      blocks: [
        p("We use the collected information to:"),
        ul([
          "Create, manage, and secure your account.",
          "Personalize market insights, watchlists, and alerts.",
          "Provide AI-powered research and analysis.",
          "Process subscriptions and payments.",
          "Improve platform performance and user experience.",
          "Communicate important service and security updates.",
          "Detect misuse, fraud, or unauthorized activity.",
        ]),
      ],
    },
    {
      title: "AI Processing",
      blocks: [
        p("Pure Bullion may process your questions, selected assets, preferences, and platform activity to generate relevant AI-powered market insights."),
        p("AI-generated content is provided for informational purposes only and should not be considered personalized financial or investment advice."),
      ],
    },
    {
      title: "Data Sharing",
      blocks: [
        p("We do not sell your personal information. We may share limited information with trusted service providers that support payments, analytics, hosting, security, communication, and platform operations."),
        p("Information may also be disclosed when required by law or necessary to protect our users, platform, or legal rights."),
      ],
    },
    {
      title: "Community Information",
      blocks: [
        p("Information shared in public community areas, including posts, comments, reactions, and profile details, may be visible to other members."),
        p("Please avoid sharing sensitive personal, financial, or confidential information in public discussions."),
      ],
    },
    {
      title: "Data Security",
      blocks: [
        p("We use reasonable administrative and technical measures to protect your information against unauthorized access, loss, misuse, or alteration."),
      ],
    },
    {
      title: "Your Rights and Choices",
      blocks: [
        p("Depending on your location, you may have the right to access, update, correct, download, or request deletion of your personal information."),
        p("You can also manage your communication preferences, alerts, watchlists, and certain privacy settings from your account."),
      ],
    },
    {
      title: "Data Retention",
      blocks: [
        p("We retain your information only for as long as necessary to provide our services, meet legal requirements, resolve disputes, and maintain platform security."),
        p("Certain information may remain in secure backups for a limited period after account deletion."),
      ],
    },
    {
      title: "Contact Us",
      blocks: [
        p("If you have questions or concerns about this Privacy Policy or how your information is handled, please contact the Pure Bullion support team through the contact information provided on our website."),
      ],
    },
  ],
  consentPrefix: "By continuing, you agree to Pure Bullion’s ",
  consentLink: "Privacy Policy",
  consentSuffix: " and consent to the collection and use of your information as described.",
};

export const termsOfService: LegalDocument = {
  badge: "Terms of service",
  goldTitle: "Terms Designed",
  whiteTitle: "for a Trusted Experience",
  description:
    "Understand the rules, responsibilities, and conditions that apply when using Pure Bullion’s market intelligence, AI-powered research, alerts, personal tracking, and community features.",
  summaryLabel: "Terms Summary:",
  summary:
    "By using Pure Bullion, you agree to follow our platform rules and use its market intelligence, AI-powered research, personal tracking, alerts, and community features responsibly. All information is provided for educational and informational purposes only.",
  sections: [
    {
      title: "Account and Access",
      blocks: [
        p("You must provide accurate information when creating an account and keep your login credentials secure. You are responsible for all activities performed through your account."),
        p("By creating an account or using Pure Bullion, you acknowledge the practices described in this policy."),
      ],
    },
    {
      title: "Responsible Platform Use",
      blocks: [
        p("You agree to use Pure Bullion legally and responsibly. Fraud, harassment, unauthorized access, harmful content, security interference, and misuse of platform features are prohibited."),
      ],
    },
    {
      title: "Financial Information Disclaimer",
      blocks: [
        p("Pure Bullion provides market intelligence, research, alerts, and educational content for informational purposes only. Nothing on the platform should be considered personalized financial, legal, tax, or investment advice."),
      ],
    },
    {
      title: "AI-Generated Content",
      blocks: [
        p("AI-powered research and summaries may contain errors, omissions, or outdated information. You should verify important information through reliable sources before relying on it."),
      ],
    },
    {
      title: "Community Guidelines",
      blocks: [
        p("Members must communicate respectfully, share information responsibly, and protect the privacy of others. Misleading content, abusive behavior, unsolicited advertising, and sensitive personal information are not permitted."),
      ],
    },
    {
      title: "Subscriptions and Ownership",
      blocks: [
        p("Some features may require a paid subscription. Prices, billing terms, renewals, and cancellation conditions will be shown before purchase. Pure Bullion retains ownership of its branding, content, interface, and technology."),
      ],
    },
    {
      title: "Availability and Termination",
      blocks: [
        p("Pure Bullion may update, suspend, or remove features for operational, legal, security, or maintenance reasons. Accounts that violate these terms may be restricted or terminated."),
      ],
    },
    {
      title: "Privacy and Data Protection",
      blocks: [
        p("Your personal information is collected, used, and protected according to our Privacy Policy. You are responsible for avoiding the public sharing of sensitive personal or financial information."),
      ],
    },
    {
      title: "Changes to These Terms",
      blocks: [
        p("Pure Bullion may update these terms when its services, features, or legal requirements change. Continued use of the platform after an update means you accept the revised terms."),
      ],
    },
  ],
  consentPrefix:
    "By continuing, you confirm that you have read, understood, and agreed to Pure Bullion’s ",
  consentLink: "Terms of Service.",
  consentSuffix: "",
};
