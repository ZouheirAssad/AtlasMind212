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
    shortTitle: "Websites",
    icon: PanelsTopLeft,
    description:
      "Conversion-focused business websites with responsive pages, integrated lead/contact flows, SEO foundations, and analytics-ready setup.",
    image: {
      src: "/images/service-business-website-tools.webp",
      alt: "A dark business website implementation dashboard connected to AI and automation tool badges",
    },
    seoTitle: "Business Website Development for Lead Generation",
    metaDescription:
      "AtlasMind212 builds fast, conversion-focused business websites with SEO foundations, lead capture, contact flows, and clean handoff.",
    definition:
      "A business website from AtlasMind212 is a high-performance marketing site built to explain your offer, earn trust, and convert visitors into qualified project inquiries. Each build combines responsive pages, technical SEO basics, lead capture, contact routing, and handoff documentation.",
    audience:
      "B2B companies, consultants, agencies, and professional service firms that need a faster, clearer website for service leads.",
    deliverables: [
      "Responsive marketing pages",
      "Lead and contact flow",
      "SEO metadata and crawl basics",
      "Analytics-ready event structure",
      "Performance-focused Next.js build",
      "Deployment and handoff documentation",
    ],
    useCases: [
      "Replace an outdated brochure site with a faster marketing site.",
      "Launch a new service offer with clear conversion paths.",
      "Create a professional web presence before outbound campaigns.",
      "Connect website inquiries to email, CRM, or database workflows.",
      "Prepare the site for search indexing and AI-answer citations.",
    ],
    process: [
      {
        title: "Positioning",
        description: "Clarify the audience, offer, proof points, and core conversion goal.",
      },
      {
        title: "Structure",
        description: "Map the page hierarchy, calls to action, metadata, and form paths.",
      },
      {
        title: "Build",
        description: "Implement responsive pages, performance-safe images, forms, and analytics-ready markup.",
      },
      {
        title: "Launch",
        description: "Deploy, verify mobile and desktop behavior, and hand over operating notes.",
      },
    ],
    outcomes: [
      "A professional site that explains the offer without extra meetings.",
      "Clear contact and lead paths for qualified prospects.",
      "A crawlable foundation for SEO and GEO work.",
      "A maintainable website stack your team can own.",
    ],
    faqs: [
      {
        question: "What makes a business website SEO-ready?",
        answer:
          "An SEO-ready business website has crawlable pages, unique metadata, clean headings, descriptive internal links, optimized images, fast loading behavior, and content that clearly answers the buyer's search intent.",
      },
      {
        question: "Can AtlasMind212 connect forms to our existing tools?",
        answer:
          "Yes. The website can route contact and lead submissions to email, Supabase, CRM tools, spreadsheets, or automation platforms depending on the project scope.",
      },
      {
        question: "Do you use templates?",
        answer:
          "AtlasMind212 uses a focused implementation process, but the page structure, copy hierarchy, integrations, and visual system are built around the specific business offer.",
      },
      {
        question: "How long does a business website project take?",
        answer:
          "A focused business website usually takes 2-3 weeks after scope, content direction, and required integrations are agreed.",
      },
      {
        question: "Is pricing public?",
        answer:
          "Pricing is custom-scoped because page count, copy depth, integrations, and deployment requirements vary. The contact page is the best path for a project estimate.",
      },
    ],
    timeline: "2-3 weeks",
    bestFor:
      "B2B and professional services firms needing a high-performance marketing site that generates and captures warm leads automatically.",
    outcome:
      "A lightning-fast, conversion-optimized marketing site ready to route prospects directly to your sales funnel.",
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    shortTitle: "AI Integrations",
    icon: Bot,
    description:
      "Intelligent website AI assistants coupled with automated connections to CRM, email, docs, spreadsheets, or internal tools.",
    image: {
      src: "/images/service-ai-integration-tools.webp",
      alt: "A secure website AI assistant connected to documents, data tools, and automation app badges",
    },
    seoTitle: "AI Assistant Integration for Business Websites",
    metaDescription:
      "Connect AI assistants to your website, CRM, documents, spreadsheets, and internal tools with AtlasMind212 implementation services.",
    definition:
      "AI integration from AtlasMind212 connects a practical AI assistant to the systems your business already uses. The goal is to answer visitor questions, qualify leads, retrieve approved information, and send structured data to the right tools without exposing private credentials.",
    audience:
      "Teams that want useful AI assistants connected to website content, CRM records, documents, spreadsheets, or internal workflows.",
    deliverables: [
      "Website AI assistant setup",
      "Approved knowledge source mapping",
      "CRM, email, docs, or spreadsheet connection",
      "Lead qualification logic",
      "Fallback and handoff behavior",
      "Testing and implementation documentation",
    ],
    useCases: [
      "Answer service questions from approved business information.",
      "Qualify website visitors before a sales conversation.",
      "Sync AI-collected lead details into a database or CRM.",
      "Help teams retrieve internal process or documentation answers.",
      "Create a safer handoff from AI chat to a human team member.",
    ],
    process: [
      {
        title: "Use-case selection",
        description: "Choose the highest-value assistant workflow and define allowed data sources.",
      },
      {
        title: "System connection",
        description: "Connect the assistant to approved tools, docs, forms, and routing logic.",
      },
      {
        title: "Behavior testing",
        description: "Test useful answers, fallback paths, and structured lead capture.",
      },
      {
        title: "Handoff",
        description: "Document prompts, data flow, account ownership, and maintenance notes.",
      },
    ],
    outcomes: [
      "A website assistant that supports prospects without replacing human judgment.",
      "Cleaner lead data captured from conversational interactions.",
      "Reduced manual lookup across docs, sheets, and CRM records.",
      "A documented AI workflow your team can review and maintain.",
    ],
    faqs: [
      {
        question: "What is AI assistant integration?",
        answer:
          "AI assistant integration connects an AI interface to approved business systems so it can answer questions, collect structured information, and trigger handoffs using controlled data sources.",
      },
      {
        question: "Can the assistant use our private documents?",
        answer:
          "Yes, when the project scope includes approved document access and appropriate security boundaries. Sensitive credentials remain server-side and are not exposed to visitors.",
      },
      {
        question: "Does AtlasMind212 train custom large language models?",
        answer:
          "No. AtlasMind212 implements and connects existing AI models and tools. It does not train base models from scratch.",
      },
      {
        question: "Which tools can be connected?",
        answer:
          "Common targets include CRM systems, email, Supabase, documents, spreadsheets, and workflow platforms such as n8n or Make, depending on API access.",
      },
      {
        question: "How long does an AI integration project take?",
        answer:
          "A focused AI integration typically takes 2-4 weeks depending on the number of systems, data sources, and testing requirements.",
      },
    ],
    timeline: "2-4 weeks",
    bestFor:
      "Teams looking to scale customer operations, offload support load, and automate lead categorization using custom-connected AI assistants.",
    outcome:
      "An embedded AI agent that instantly answers visitor questions and logs structured leads directly into your database or CRM.",
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    shortTitle: "Automation",
    icon: Workflow,
    description:
      "Custom n8n, Make, or API background workflows to handle automated follow-ups, alerts, reporting, and handover documentation.",
    image: {
      src: "/images/service-ai-automation-tools.webp",
      alt: "A dark AI automation workflow board connecting n8n, Make, spreadsheets, email, and database nodes",
    },
    seoTitle: "AI Workflow Automation with n8n, Make, and APIs",
    metaDescription:
      "AtlasMind212 builds AI workflow automations for follow-ups, alerts, reporting, CRM sync, and background business operations.",
    definition:
      "AI automation from AtlasMind212 turns repeatable manual operations into reliable background workflows. The work can connect forms, CRMs, spreadsheets, emails, alerts, reports, and AI steps so information moves between tools with fewer copy-paste tasks.",
    audience:
      "Operations leaders, founders, and service teams that want to reduce repetitive manual work across disconnected tools.",
    deliverables: [
      "n8n, Make, or API workflow design",
      "Automated follow-up logic",
      "CRM, sheet, email, or database sync",
      "Error alert and retry paths",
      "Reporting or notification flows",
      "Workflow documentation and handoff",
    ],
    useCases: [
      "Send structured lead follow-ups after form submissions.",
      "Sync CRM, spreadsheet, and email data without manual entry.",
      "Trigger alerts when a workflow needs human review.",
      "Generate recurring reports from operational data.",
      "Add AI classification or summarization to background processes.",
    ],
    process: [
      {
        title: "Workflow audit",
        description: "Map the current manual steps, source tools, outputs, and failure points.",
      },
      {
        title: "Automation design",
        description: "Define triggers, actions, AI steps, validation rules, and handoff conditions.",
      },
      {
        title: "Implementation",
        description: "Build the workflow with n8n, Make, APIs, or custom server routes as needed.",
      },
      {
        title: "Reliability pass",
        description: "Test happy paths, edge cases, alerts, retries, and ownership documentation.",
      },
    ],
    outcomes: [
      "Less manual transfer between forms, sheets, CRM, and email.",
      "More reliable follow-up and notification timing.",
      "Clearer visibility into workflow errors and exceptions.",
      "Documented automations your team can operate after handoff.",
    ],
    faqs: [
      {
        question: "What is AI workflow automation?",
        answer:
          "AI workflow automation combines normal automation steps with AI tasks such as classification, summarization, routing, or drafting so repeatable business processes run with less manual work.",
      },
      {
        question: "Do you use n8n or Make?",
        answer:
          "Yes. AtlasMind212 can build workflows in n8n, Make, direct APIs, or custom server routes depending on the reliability, ownership, and integration needs.",
      },
      {
        question: "Can automations include human approval?",
        answer:
          "Yes. Workflows can pause for review, send alerts, or route exceptions to a person before continuing.",
      },
      {
        question: "What happens if an automation fails?",
        answer:
          "The implementation can include error handling, retry logic, and alerts so your team knows when a workflow needs attention.",
      },
      {
        question: "How long does an automation project take?",
        answer:
          "A focused AI automation project usually takes 3-5 weeks depending on the number of tools, branches, and reliability requirements.",
      },
    ],
    timeline: "3-5 weeks",
    bestFor:
      "Operations leaders wanting to eliminate repetitive manual entry, connect fragmented apps, and build error-aware data flows.",
    outcome:
      "End-to-end background processes that synchronize your tools, handle follow-ups, and trigger Slack or email notifications.",
  },
] as const;

export type Service = (typeof services)[number];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceHref(service: Pick<Service, "slug">) {
  return `/services/${service.slug}`;
}
