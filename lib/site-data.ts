import {
  Bot,
  Braces,
  Compass,
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
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Development",
    icon: PanelsTopLeft,
    engagement: "Project delivery",
    description:
      "Fast, accessible business websites and web applications designed around clear user journeys and measurable business goals.",
    heroImage: {
      src: "/images/editorial-services-v2.webp",
      alt: "A web product builder reviewing interface sketches at a studio desk",
    },
    seoTitle: "Web Development for Business Websites & Web Apps",
    metaDescription:
      "AtlasMind212 designs and develops fast business websites and web applications with accessible interfaces, integrations, SEO foundations, and documented handoff.",
    definition:
      "AtlasMind212 develops production-ready websites and web applications that make a service easier to understand, a process easier to use, or a digital product easier to operate. Each project combines clear structure, responsive implementation, accessibility, performance, integrations, deployment, and maintainable handoff.",
    audience:
      "Small and midsize businesses, startups, and product teams that need a new website, customer portal, dashboard, or focused web application.",
    deliverables: [
      "Responsive website or web application",
      "Accessible interface and interaction states",
      "SEO and performance foundations",
      "Forms, authentication, or product integrations",
      "Analytics-ready event structure",
      "Deployment and handoff documentation",
    ],
    useCases: [
      "Replace an outdated website with a faster, clearer digital presence.",
      "Build a customer portal, dashboard, or internal web tool.",
      "Launch a new service or product with a focused conversion journey.",
      "Turn a manual browser-based process into a purpose-built application.",
      "Improve accessibility, performance, and maintainability in an existing frontend.",
    ],
    process: [
      {
        title: "Discovery",
        description: "Clarify users, business goals, requirements, constraints, and the smallest valuable release.",
      },
      {
        title: "Product structure",
        description: "Define information architecture, user journeys, interface states, and technical boundaries.",
      },
      {
        title: "Implementation",
        description: "Build responsive, accessible pages and features in reviewable checkpoints.",
      },
      {
        title: "Launch and handoff",
        description: "Verify production behavior, deploy the project, and document ownership and maintenance.",
      },
    ],
    outcomes: [
      "A clear digital experience built around real users and business goals.",
      "Faster, more accessible pages across mobile and desktop.",
      "Reliable paths for customer actions, leads, or internal work.",
      "A maintainable codebase and documented deployment your team can own.",
    ],
    faqs: [
      {
        question: "What kinds of web projects do you build?",
        answer:
          "AtlasMind212 builds business websites, landing pages, web applications, dashboards, portals, and focused internal tools. The scope is shaped around the users and business outcome rather than a fixed page package.",
      },
      {
        question: "Can you work with an existing website or application?",
        answer:
          "Yes. A project can improve, extend, or rebuild an existing frontend when the current codebase and access allow a reliable handoff.",
      },
      {
        question: "Do web projects include backend functionality?",
        answer:
          "They can. Forms, authentication, databases, APIs, and third-party services can be included directly or scoped through the Backend & API Development service.",
      },
      {
        question: "Which technologies do you use?",
        answer:
          "The primary stack is TypeScript, React, and Next.js, with supporting tools selected for the project's hosting, data, integration, and ownership requirements.",
      },
      {
        question: "Is pricing fixed?",
        answer:
          "No. Page count, product features, integrations, content readiness, and deployment requirements vary, so each project is scoped after discovery.",
      },
    ],
    bestFor:
      "Organizations that need a high-quality website or web product delivered from a clear scope through production launch.",
    outcome:
      "A fast, accessible, and maintainable web experience connected to the systems behind the work.",
  },
  {
    slug: "backend-api-development",
    title: "Backend & API Development",
    shortTitle: "Backend & APIs",
    icon: Braces,
    engagement: "Project delivery",
    description:
      "Secure APIs, databases, middleware, and server-side systems that connect products, partners, and operational data.",
    heroImage: {
      src: "/images/editorial-workflow-v2.webp",
      alt: "Two professionals mapping the data flow for a backend system on a whiteboard",
    },
    seoTitle: "Backend & API Development for Digital Products",
    metaDescription:
      "AtlasMind212 builds secure APIs, databases, middleware, webhooks, and backend services for web products and business systems.",
    definition:
      "Backend and API development from AtlasMind212 creates the dependable layer behind a website, application, or business process. Work can include data models, authentication, integrations, webhooks, background jobs, and documented interfaces designed for secure operation and future maintenance.",
    audience:
      "Product teams, startups, and established businesses that need reliable server-side functionality or connections between existing systems.",
    deliverables: [
      "API and integration architecture",
      "Database and data model implementation",
      "Authentication and authorization flows",
      "Webhooks, background jobs, or realtime behavior",
      "Validation, error handling, and operational logging",
      "Deployment and interface documentation",
    ],
    useCases: [
      "Create an API for a web application, partner, or internal team.",
      "Connect a product to payment, email, CRM, or data services.",
      "Replace fragile spreadsheet or webhook logic with a maintained service.",
      "Add authentication, permissions, and secure server-side operations.",
      "Design a database and backend for a new digital product.",
    ],
    process: [
      {
        title: "System review",
        description: "Map consumers, data, security boundaries, integrations, and operational requirements.",
      },
      {
        title: "Interface design",
        description: "Define contracts, data models, permissions, failure behavior, and deployment boundaries.",
      },
      {
        title: "Implementation",
        description: "Build the services, integrations, validation, and observability in testable increments.",
      },
      {
        title: "Production handoff",
        description: "Verify critical flows, deploy safely, and document interfaces and operating responsibilities.",
      },
    ],
    outcomes: [
      "Reliable interfaces between products and business systems.",
      "Clear validation, permissions, and failure behavior.",
      "Less fragile data movement and duplicated integration logic.",
      "Documented backend services that can be maintained and extended.",
    ],
    faqs: [
      {
        question: "What backend work can AtlasMind212 deliver?",
        answer:
          "Projects can include REST APIs, server routes, databases, authentication, webhooks, scheduled jobs, realtime features, middleware, and third-party service integrations.",
      },
      {
        question: "Can you connect to our existing systems?",
        answer:
          "Yes, when the systems provide suitable API, webhook, database, or export access. Discovery confirms access, data ownership, and technical constraints before implementation.",
      },
      {
        question: "How do you approach security?",
        answer:
          "Sensitive credentials stay server-side, inputs are validated, permissions are enforced at the appropriate boundary, and the implementation documents the security assumptions relevant to the scope.",
      },
      {
        question: "Do you provide API documentation?",
        answer:
          "Yes. The handoff includes the interface, authentication, environment, deployment, and operating information needed for the agreed consumers.",
      },
      {
        question: "Can this service support an existing development team?",
        answer:
          "Yes, as a clearly scoped delivery or consulting engagement with agreed interfaces and ownership. AtlasMind212 does not advertise open-ended staff augmentation.",
      },
    ],
    bestFor:
      "Teams that need secure data access, product integrations, or a dependable server-side foundation behind a digital service.",
    outcome:
      "A documented backend system with clear interfaces, secure data handling, and production-ready failure behavior.",
  },
  {
    slug: "technical-consulting",
    title: "Technical Consulting & Product Conception",
    shortTitle: "Technical Consulting",
    icon: Compass,
    engagement: "Focused advisory",
    description:
      "Practical technical direction for product ideas, architecture decisions, proofs of concept, delivery risks, and existing systems.",
    heroImage: {
      src: "/images/editorial-consulting-v2.webp",
      alt: "Two professionals evaluating technical options at a whiteboard",
    },
    seoTitle: "Technical Consulting & Product Conception",
    metaDescription:
      "Get practical technical consulting for product requirements, architecture, technology selection, feasibility, proofs of concept, estimates, and delivery planning.",
    definition:
      "Technical consulting from AtlasMind212 turns an idea, bottleneck, or difficult technology decision into an actionable delivery path. The engagement combines business context with implementation experience to clarify requirements, evaluate options, expose risks, and define what should be built next.",
    audience:
      "Decision-makers, founders, and product or engineering teams that need an independent technical view before or during delivery.",
    deliverables: [
      "Requirements and constraint review",
      "Architecture or technology recommendation",
      "Feasibility study or focused proof of concept",
      "Scope, effort, dependency, and risk assessment",
      "Codebase, integration, or delivery review",
      "Prioritized implementation roadmap",
    ],
    useCases: [
      "Evaluate a product idea before committing to a full build.",
      "Choose an architecture, platform, or integration approach.",
      "Review an existing application before a major change or handover.",
      "Turn unclear stakeholder needs into an implementable scope.",
      "Test a risky assumption with a focused proof of concept.",
    ],
    process: [
      {
        title: "Context",
        description: "Gather the business goal, users, current systems, constraints, and decisions that need support.",
      },
      {
        title: "Evaluation",
        description: "Review viable approaches, dependencies, evidence, implementation cost, and delivery risks.",
      },
      {
        title: "Recommendation",
        description: "Present a clear direction with tradeoffs, priorities, and decisions that can be acted on.",
      },
      {
        title: "Delivery path",
        description: "Translate the recommendation into a scope, proof of concept, or sequenced implementation roadmap.",
      },
    ],
    outcomes: [
      "A defensible technical direction tied to the business goal.",
      "Earlier visibility into cost, dependencies, and delivery risk.",
      "A smaller and clearer first implementation step.",
      "Documentation stakeholders and developers can use to move forward.",
    ],
    faqs: [
      {
        question: "When should we use technical consulting?",
        answer:
          "Consulting is useful when the problem or opportunity is clear but the implementation path, architecture, feasibility, or scope is not yet reliable enough to build.",
      },
      {
        question: "Can consulting be booked without a development project?",
        answer:
          "Yes. Advisory work can end with a recommendation, review, proof of concept, or roadmap that your own team implements.",
      },
      {
        question: "Do you provide fixed technology recommendations?",
        answer:
          "No. Recommendations are based on the users, current systems, team capability, security needs, ownership model, and expected product lifecycle.",
      },
      {
        question: "Can you review an existing codebase?",
        answer:
          "Yes, when repository access and the review goal are clearly scoped. The output focuses on actionable findings and delivery risk rather than a generic score.",
      },
      {
        question: "Does this include ongoing team coaching?",
        answer:
          "The service can include working sessions and knowledge transfer inside a defined engagement, but AtlasMind212 does not currently offer open-ended embedded coaching or team leadership.",
      },
    ],
    bestFor:
      "Organizations that need clarity before investing in a build or an independent view on a difficult product or architecture decision.",
    outcome:
      "A practical recommendation and delivery path that reduces uncertainty before significant implementation work begins.",
  },
  {
    slug: "llm-integration-ai-consulting",
    title: "LLM Integration & AI Consulting",
    shortTitle: "LLM Integration",
    icon: Bot,
    engagement: "Integration project",
    description:
      "Purpose-built assistants and language-model features connected to approved knowledge, tools, and human review paths.",
    heroImage: {
      src: "/images/editorial-llm-v2.webp",
      alt: "Two professionals evaluating an LLM feature against approved source documents",
    },
    seoTitle: "LLM Integration & Practical AI Consulting",
    metaDescription:
      "AtlasMind212 evaluates and implements LLM assistants and AI features with approved data, system integrations, guardrails, evaluation, and human handoff.",
    definition:
      "LLM integration and AI consulting from AtlasMind212 starts by deciding whether a language model is useful for the job. When it is, the work connects an existing model to approved knowledge and systems, defines guardrails and human fallback, evaluates real behavior, and documents the cost and ownership required for production use.",
    audience:
      "Businesses and product teams with a concrete knowledge, support, content, or workflow use case that may benefit from language-model capabilities.",
    deliverables: [
      "AI use-case and feasibility assessment",
      "Model and provider recommendation",
      "Knowledge retrieval and system integration",
      "Assistant, copilot, or structured LLM feature",
      "Guardrails, evaluation, and human fallback",
      "Cost, privacy, operation, and handoff documentation",
    ],
    useCases: [
      "Answer customer or employee questions from approved company knowledge.",
      "Add drafting, extraction, classification, or summarization to a product.",
      "Create a copilot that retrieves data and supports a controlled task.",
      "Evaluate an AI product idea before committing to implementation.",
      "Improve the reliability and governance of an existing LLM feature.",
    ],
    process: [
      {
        title: "Fit assessment",
        description: "Define the task, expected value, approved data, risks, and conditions where AI should not be used.",
      },
      {
        title: "System design",
        description: "Choose the model, retrieval approach, integrations, evaluation criteria, and human control points.",
      },
      {
        title: "Implementation",
        description: "Build the focused feature and test it against representative inputs and failure scenarios.",
      },
      {
        title: "Production handoff",
        description: "Document behavior, limits, privacy, cost, monitoring, account ownership, and maintenance.",
      },
    ],
    outcomes: [
      "A concrete AI capability tied to a defined user task.",
      "Clear limits, fallback behavior, and human responsibility.",
      "Better visibility into model quality, privacy, and operating cost.",
      "A documented integration your team can evaluate and maintain.",
    ],
    faqs: [
      {
        question: "What is LLM integration?",
        answer:
          "LLM integration adds an existing language model to a product or workflow and connects it to the approved context, tools, rules, and human review needed for a specific task.",
      },
      {
        question: "Do you train custom foundation models?",
        answer:
          "No. AtlasMind212 evaluates and integrates existing models and may configure retrieval, prompts, tools, structured outputs, and evaluations around them.",
      },
      {
        question: "Can an assistant use private company information?",
        answer:
          "It can use approved private sources when access controls, provider terms, retention settings, and server-side credential boundaries fit the project's security requirements.",
      },
      {
        question: "How do you reduce incorrect answers?",
        answer:
          "The implementation limits the task, grounds responses in approved sources where appropriate, tests representative cases, communicates uncertainty, and provides fallback or human review paths.",
      },
      {
        question: "Can we start with consulting only?",
        answer:
          "Yes. A focused assessment or proof of concept can test feasibility, data readiness, provider choices, risks, and operating cost before a production build.",
      },
    ],
    bestFor:
      "Teams with a specific task and approved information that want to evaluate or implement an LLM capability responsibly.",
    outcome:
      "A controlled, evaluated LLM feature that supports a real task without hiding its limits or ownership requirements.",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation",
    shortTitle: "Automation",
    icon: Workflow,
    engagement: "Automation project",
    description:
      "Reliable workflows that connect forms, email, CRM, databases, and operational tools with alerts and human approval where needed.",
    heroImage: {
      src: "/images/editorial-workflow-v2.webp",
      alt: "Two professionals mapping an operational automation workflow on a whiteboard",
    },
    seoTitle: "Workflow Automation with n8n, Make, and APIs",
    metaDescription:
      "AtlasMind212 automates business workflows across forms, email, CRM, databases, and reporting using n8n, Make, APIs, or custom code.",
    definition:
      "Workflow automation from AtlasMind212 turns repeatable manual steps into reliable background processes. The work connects the tools your team already uses, validates information as it moves, handles expected failures, and keeps people in control of exceptions and approvals. AI is included only when it improves a specific step.",
    audience:
      "Operations teams, founders, and product teams that want to reduce repetitive work and fragile handoffs across disconnected tools.",
    deliverables: [
      "Current workflow and failure-point map",
      "n8n, Make, API, or custom workflow",
      "CRM, email, form, database, or reporting connections",
      "Validation and human approval paths",
      "Error alerts, retries, and operational visibility",
      "Workflow ownership and handoff documentation",
    ],
    useCases: [
      "Route and follow up on customer or sales inquiries.",
      "Synchronize data between a CRM, database, spreadsheet, and email tool.",
      "Create recurring operational reports and exception alerts.",
      "Replace repetitive copy-paste work with validated data movement.",
      "Add optional classification or summarization to a controlled workflow step.",
    ],
    process: [
      {
        title: "Workflow audit",
        description: "Map triggers, manual steps, systems, owners, exceptions, and the measurable operational goal.",
      },
      {
        title: "Automation design",
        description: "Define data flow, validation, permissions, approval points, errors, retries, and alerts.",
      },
      {
        title: "Implementation",
        description: "Build and connect the workflow with the simplest suitable platform or custom service.",
      },
      {
        title: "Reliability handoff",
        description: "Test normal and failure paths, document ownership, and show the team how to operate it.",
      },
    ],
    outcomes: [
      "Less manual transfer between everyday business tools.",
      "More consistent timing, validation, and follow-up.",
      "Clear alerts and ownership when a workflow needs attention.",
      "Documented automations the team can understand after handoff.",
    ],
    faqs: [
      {
        question: "Does workflow automation require AI?",
        answer:
          "No. Most reliable workflows use normal triggers, rules, APIs, and validations. AI is added only when a step such as classification or summarization cannot be handled well with deterministic logic.",
      },
      {
        question: "Do you use n8n or Make?",
        answer:
          "Yes. AtlasMind212 can use n8n, Make, direct APIs, or custom server-side code depending on security, complexity, reliability, and ownership requirements.",
      },
      {
        question: "Can automations include human approval?",
        answer:
          "Yes. A workflow can pause, request review, route an exception, or require approval before a sensitive action continues.",
      },
      {
        question: "What happens when an automation fails?",
        answer:
          "The agreed reliability scope can include validation, retries, error records, and alerts so failures are visible and recoverable instead of silent.",
      },
      {
        question: "Can you improve an existing automation?",
        answer:
          "Yes, when the existing platform and account access support a reliable review. The project can simplify, document, monitor, or rebuild fragile workflows.",
      },
    ],
    bestFor:
      "Organizations with repeatable operational work spread across forms, inboxes, spreadsheets, CRMs, databases, and reporting tools.",
    outcome:
      "A reliable background process that reduces manual handling while keeping exceptions and ownership visible.",
  },
] as const;

export type Service = (typeof services)[number];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceHref(service: Pick<Service, "slug">) {
  return `/services/${service.slug}`;
}
