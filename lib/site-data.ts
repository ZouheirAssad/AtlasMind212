import {
  Bot,
  PanelsTopLeft,
  Workflow,
} from "lucide-react";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const services = [
  {
    slug: "business-website",
    title: "Business Website",
    icon: PanelsTopLeft,
    description: "Conversion-focused business websites with responsive pages, integrated lead/contact flows, SEO basics, and analytics-ready setup.",
    deliverables: [
      "Responsive pages",
      "Lead & contact flow",
      "SEO basics",
      "Analytics-ready setup",
    ],
    timeline: "2â€“3 weeks",
    bestFor: "B2B and professional services firms needing a high-performance marketing site that generates and captures warm leads automatically.",
    outcome: "A lightning-fast, conversion-optimized marketing site ready to route prospects directly to your sales funnel.",
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    icon: Bot,
    description: "Intelligent website AI assistants coupled with automated connections to CRM, email, docs, spreadsheets, or internal tools.",
    deliverables: [
      "Website AI assistant",
      "CRM & email integration",
      "Docs & spreadsheets sync",
      "Internal tool connection",
    ],
    timeline: "2â€“4 weeks",
    bestFor: "Teams looking to scale customer operations, offload support load, and automate lead categorization using custom-trained models.",
    outcome: "An embedded AI agent that instantly answers visitor questions and logs structured leads directly into your database/CRM.",
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    icon: Workflow,
    description: "Custom n8n, Make, or API background workflows to handle automated follow-ups, alerts, reporting, and handover documentation.",
    deliverables: [
      "n8n/Make workflows",
      "Automated follow-ups",
      "Alerts & reporting",
      "Handover documentation",
    ],
    timeline: "3â€“5 weeks",
    bestFor: "Operations leaders wanting to eliminate repetitive manual entry, connect fragmented apps, and build error-free data flows.",
    outcome: "End-to-end background processes that synchronize your tools, handle follow-ups, and trigger Slack/email notifications.",
  },
] as const;
