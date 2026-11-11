import {
  Bot,
  Braces,
  Compass,
  Globe,
  MapPin,
  PanelsTopLeft,
  SearchCheck,
  Workflow,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { servicesAr } from "@/lib/content/services.ar";
import { servicesFr } from "@/lib/content/services.fr";

export type ServiceSlug =
  | "website-creation"
  | "seo-geo"
  | "google-maps-local-seo"
  | "web-development"
  | "backend-api-development"
  | "technical-consulting"
  | "llm-integration-ai-consulting"
  | "workflow-automation";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  engagement: string;
  description: string;
  heroImage: { src: string; alt: string };
  seoTitle: string;
  metaDescription: string;
  definition: string;
  audience: string;
  deliverables: string[];
  useCases: string[];
  process: Array<{ title: string; description: string }>;
  outcomes: string[];
  faqs: Array<{ question: string; answer: string }>;
  bestFor: string;
  outcome: string;
};

/** Translatable service copy. Slugs, icons and image files stay shared across locales. */
export type ServiceTranslation = Omit<Service, "slug" | "icon" | "heroImage"> & { heroAlt: string };

const servicesEn: Service[] = [
  {
    slug: "website-creation",
    title: "Website Creation",
    shortTitle: "Websites",
    icon: Globe,
    engagement: "Website project",
    description:
      "Professional business websites that explain what you do, load fast on mobile, rank on Google, and turn visitors into calls, messages, and quote requests.",
    heroImage: {
      src: "/images/editorial-services-v2.webp",
      alt: "A designer reviewing a business website layout on a laptop and printed sketches",
    },
    seoTitle: "Website Creation for Businesses in Morocco and Europe",
    metaDescription:
      "AtlasMind creates fast, multilingual business websites in French, Arabic, and English, with SEO, Google Maps integration, contact forms, and simple content updates.",
    definition:
      "Website creation from AtlasMind delivers a complete, professional website for a business, practice, or organization: clear structure, persuasive copy layout, mobile-first design, fast loading, contact and WhatsApp-ready calls to action, multilingual content, technical SEO, and Google Maps integration. The site is launched on your own domain and handed over with simple instructions.",
    audience:
      "Small and midsize businesses, independent professionals, clinics, restaurants, real-estate agencies, and service companies in Morocco and Europe that need a credible website quickly.",
    deliverables: [
      "Mobile-first business website on your domain",
      "French, Arabic (right-to-left), and English versions",
      "Service, about, and contact pages with clear calls to action",
      "Technical SEO, structured data, and sitemap",
      "Google Maps, Google Business Profile, and analytics connection",
      "Hosting setup, launch, and handover guide",
    ],
    useCases: [
      "Launch a first professional website for a new business.",
      "Replace an outdated or slow website that does not bring inquiries.",
      "Publish the same site in French, Arabic, and English for local and international clients.",
      "Show services, locations, opening hours, and contact options clearly on mobile.",
      "Prepare a website that can be found on Google and cited by AI assistants.",
    ],
    process: [
      { title: "Brief", description: "Clarify your business, audience, services, languages, competitors, and the action visitors should take." },
      { title: "Structure and content", description: "Plan pages, headlines, keywords, and the content you need to provide or that we draft with you." },
      { title: "Design and build", description: "Build a fast, responsive, accessible website with SEO foundations in reviewable steps." },
      { title: "Launch", description: "Connect domain, analytics, Google Maps, and search consoles, then hand over the site." },
    ],
    outcomes: [
      "A credible online presence that explains your offer in seconds.",
      "More calls, messages, and quote requests from mobile visitors.",
      "Pages that search engines and AI assistants can understand and cite.",
      "A website you own, on your domain, with clear handover documentation.",
    ],
    faqs: [
      {
        question: "How long does it take to create a business website?",
        answer:
          "A focused business website usually takes a few weeks, depending on the number of pages, languages, and how quickly content and feedback are available. The timeline is confirmed after the brief.",
      },
      {
        question: "Can the website be in French, Arabic, and English?",
        answer:
          "Yes. AtlasMind builds multilingual websites, including Arabic with correct right-to-left layout, separate URLs per language, and hreflang tags so each version can rank in search.",
      },
      {
        question: "Is SEO included?",
        answer:
          "Technical SEO foundations are included: page structure, metadata, structured data, sitemap, performance, and search console setup. Ongoing content and ranking work can be added through the SEO & GEO service.",
      },
      {
        question: "Will I be able to update the website myself?",
        answer:
          "The handover explains how content is updated. Where regular edits are needed, the project can include a simple content management option scoped to your team.",
      },
      {
        question: "How much does a website cost?",
        answer:
          "Pricing depends on pages, languages, features, and content readiness. AtlasMind provides a custom quote after a short brief instead of a fixed package.",
      },
    ],
    bestFor:
      "Businesses that need a professional, multilingual website that is fast, easy to find on Google, and focused on generating inquiries.",
    outcome:
      "A fast, multilingual business website on your domain that turns visitors into inquiries and is ready for search and AI discovery.",
  },
  {
    slug: "seo-geo",
    title: "SEO & GEO Specialists",
    shortTitle: "SEO & GEO",
    icon: SearchCheck,
    engagement: "Search visibility",
    description:
      "Search engine optimization and generative engine optimization so your business is found on Google and recommended by AI assistants such as ChatGPT, Gemini, and Perplexity.",
    heroImage: {
      src: "/images/editorial-llm-v2.webp",
      alt: "Two specialists reviewing search visibility data and source documents",
    },
    seoTitle: "SEO & GEO Specialists: Google and AI Search Visibility",
    metaDescription:
      "AtlasMind improves your visibility on Google and in AI answers (ChatGPT, Gemini, Perplexity, Google AI Overviews) with technical SEO, content, structured data, and GEO.",
    definition:
      "SEO (search engine optimization) improves how your website ranks in Google and other search engines. GEO (generative engine optimization) improves how AI assistants such as ChatGPT, Gemini, Perplexity, and Google AI Overviews understand, trust, and cite your business. AtlasMind audits both, fixes technical issues, structures content and data so machines can read it, and tracks progress with clear reporting.",
    audience:
      "Businesses in Morocco and Europe that already have a website but are not visible enough on Google or in AI-generated answers, and companies launching a new site that want visibility from day one.",
    deliverables: [
      "Technical SEO audit and fixes (speed, indexing, structure)",
      "Keyword and topic research in French, Arabic, and English",
      "On-page optimization of titles, content, and internal links",
      "Structured data (Schema.org) and llms.txt for AI systems",
      "AI search visibility review: ChatGPT, Gemini, Perplexity, AI Overviews",
      "Monthly or milestone reporting with prioritized next steps",
    ],
    useCases: [
      "Rank for searches such as “web agency Casablanca” or your own service keywords.",
      "Get your business mentioned and cited when people ask AI assistants for recommendations.",
      "Fix a website that is slow, poorly indexed, or invisible on Google.",
      "Grow organic visibility in several languages and markets.",
      "Recover traffic after a redesign or migration.",
    ],
    process: [
      { title: "Audit", description: "Analyze technical health, rankings, competitors, content gaps, AI crawler access, and current AI citations." },
      { title: "Strategy", description: "Prioritize keywords, topics, pages, and entity signals that matter for your customers and markets." },
      { title: "Optimization", description: "Fix technical issues, improve content and structure, add structured data and machine-readable context." },
      { title: "Measurement", description: "Track rankings, traffic, inquiries, and AI visibility, then refine the plan in regular cycles." },
    ],
    outcomes: [
      "Better rankings for the searches your customers actually use.",
      "Clearer brand and service information in AI-generated answers.",
      "A technically healthy website that search engines crawl and index correctly.",
      "Transparent reporting that connects visibility to inquiries.",
    ],
    faqs: [
      {
        question: "What is the difference between SEO and GEO?",
        answer:
          "SEO optimizes your website to rank in classic search results. GEO optimizes your content, structured data, and brand signals so AI assistants and AI search features understand your business and cite it in their answers. Both share technical foundations, and AtlasMind works on them together.",
      },
      {
        question: "Can you guarantee first place on Google?",
        answer:
          "No honest specialist can guarantee rankings, because search engines and AI systems decide independently. AtlasMind focuses on measurable improvements in technical quality, relevance, visibility, and inquiries.",
      },
      {
        question: "How long until SEO shows results?",
        answer:
          "Technical fixes can show effects within weeks; content and authority improvements usually take several months. Reporting shows progress along the way.",
      },
      {
        question: "Do you work on SEO in Arabic and French?",
        answer:
          "Yes. Keyword research, content, and technical setup can cover French, Arabic, and English, including correct hreflang configuration for multilingual websites.",
      },
      {
        question: "Can you optimize a website you did not build?",
        answer:
          "Yes, when access to the website, its content management, and search console is available. Some platforms limit what can be changed; the audit makes this clear first.",
      },
    ],
    bestFor:
      "Businesses that want to be found on Google and recommended by AI assistants in Morocco, Europe, and international markets.",
    outcome:
      "Measurably stronger visibility in search engines and AI answers, backed by a technically sound website and clear reporting.",
  },
  {
    slug: "google-maps-local-seo",
    title: "Google Maps & Local SEO",
    shortTitle: "Google Maps",
    icon: MapPin,
    engagement: "Local visibility",
    description:
      "Google Business Profile setup and optimization so customers find your business on Google Maps, see accurate information, and call or visit.",
    heroImage: {
      src: "/images/editorial-consulting-v2.webp",
      alt: "Two professionals planning a local visibility strategy at a whiteboard",
    },
    seoTitle: "Google Maps & Google Business Profile Optimization",
    metaDescription:
      "AtlasMind creates and optimizes Google Business Profiles, improves Google Maps rankings, manages reviews strategy, and connects your listing to your website for local SEO.",
    definition:
      "Google Maps and local SEO work from AtlasMind makes your business easy to find when nearby customers search on Google or Google Maps. The work covers creating or claiming your Google Business Profile, accurate categories and opening hours, photos, services, posts, a review strategy, consistent business information across directories, and a website that supports local rankings.",
    audience:
      "Restaurants, cafés, shops, clinics, hotels, riads, agencies, and service businesses in Moroccan cities and in Europe that depend on local customers.",
    deliverables: [
      "Google Business Profile creation, claim, or verification support",
      "Optimized categories, services, hours, description, and photos",
      "Review collection strategy and response templates",
      "Consistent name, address, and phone across directories",
      "Local landing pages and LocalBusiness structured data",
      "Map embed, directions, and call buttons on your website",
    ],
    useCases: [
      "Appear on Google Maps when people search for your service nearby.",
      "Fix wrong opening hours, duplicate listings, or a missing location.",
      "Get more calls, direction requests, and visits from your listing.",
      "Build a steady flow of genuine customer reviews.",
      "Manage visibility for several branches or cities.",
    ],
    process: [
      { title: "Listing audit", description: "Check your profile, competitors in the area, categories, reviews, and business information consistency." },
      { title: "Setup and optimization", description: "Create or fix the profile, complete every relevant field, and add photos, services, and posts." },
      { title: "Website connection", description: "Link the profile to local pages with structured data, maps, and clear contact actions." },
      { title: "Follow-up", description: "Monitor calls, direction requests, and reviews, and adjust the listing over time." },
    ],
    outcomes: [
      "A complete, accurate Google Business Profile that customers trust.",
      "Higher visibility in the Google Maps local results.",
      "More calls, messages, direction requests, and visits.",
      "Consistent business information across Google, your website, and directories.",
    ],
    faqs: [
      {
        question: "What is a Google Business Profile?",
        answer:
          "It is the free business listing that appears in Google Search and Google Maps with your address, hours, photos, reviews, and contact buttons. It is one of the most important factors for local visibility.",
      },
      {
        question: "Can you verify my business on Google?",
        answer:
          "Verification is done by Google, usually by phone, video, or mail. AtlasMind prepares the profile and guides you through the verification steps Google offers for your business.",
      },
      {
        question: "Do you buy or write fake reviews?",
        answer:
          "No. Fake reviews violate Google’s policies and can get a profile suspended. AtlasMind sets up a process to ask real customers for reviews and to respond professionally.",
      },
      {
        question: "Does this work for businesses in Morocco?",
        answer:
          "Yes. Google Maps is widely used across Morocco, and AtlasMind optimizes profiles and local pages for cities such as Casablanca, Rabat, Marrakech, Tangier, Agadir, and Fès, in French, Arabic, and English.",
      },
      {
        question: "Do I need a website for local SEO?",
        answer:
          "A profile alone can work, but a website with local pages and structured data strengthens rankings and gives customers more reasons to choose you. Both can be delivered together.",
      },
    ],
    bestFor:
      "Local businesses that want to be found on Google Maps and turn nearby searches into calls and visits.",
    outcome:
      "A fully optimized Google Business Profile connected to your website, bringing more local calls, visits, and reviews.",
  },
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
      "AtlasMind designs and develops fast business websites and web applications with accessible interfaces, integrations, SEO foundations, and documented handoff.",
    definition:
      "AtlasMind develops production-ready websites and web applications that make a service easier to understand, a process easier to use, or a digital product easier to operate. Each project combines clear structure, responsive implementation, accessibility, performance, integrations, deployment, and maintainable handoff.",
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
          "AtlasMind builds business websites, landing pages, web applications, dashboards, portals, and focused internal tools. The scope is shaped around the users and business outcome rather than a fixed page package.",
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
      "AtlasMind builds secure APIs, databases, middleware, webhooks, and backend services for web products and business systems.",
    definition:
      "Backend and API development from AtlasMind creates the dependable layer behind a website, application, or business process. Work can include data models, authentication, integrations, webhooks, background jobs, and documented interfaces designed for secure operation and future maintenance.",
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
        question: "What backend work can AtlasMind deliver?",
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
          "Yes, as a clearly scoped delivery or consulting engagement with agreed interfaces and ownership. AtlasMind does not advertise open-ended staff augmentation.",
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
      "Technical consulting from AtlasMind turns an idea, bottleneck, or difficult technology decision into an actionable delivery path. The engagement combines business context with implementation experience to clarify requirements, evaluate options, expose risks, and define what should be built next.",
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
          "The service can include working sessions and knowledge transfer inside a defined engagement, but AtlasMind does not currently offer open-ended embedded coaching or team leadership.",
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
      "AtlasMind evaluates and implements LLM assistants and AI features with approved data, system integrations, guardrails, evaluation, and human handoff.",
    definition:
      "LLM integration and AI consulting from AtlasMind starts by deciding whether a language model is useful for the job. When it is, the work connects an existing model to approved knowledge and systems, defines guardrails and human fallback, evaluates real behavior, and documents the cost and ownership required for production use.",
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
          "No. AtlasMind evaluates and integrates existing models and may configure retrieval, prompts, tools, structured outputs, and evaluations around them.",
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
      "AtlasMind automates business workflows across forms, email, CRM, databases, and reporting using n8n, Make, APIs, or custom code.",
    definition:
      "Workflow automation from AtlasMind turns repeatable manual steps into reliable background processes. The work connects the tools your team already uses, validates information as it moves, handles expected failures, and keeps people in control of exceptions and approvals. AI is included only when it improves a specific step.",
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
          "Yes. AtlasMind can use n8n, Make, direct APIs, or custom server-side code depending on security, complexity, reliability, and ownership requirements.",
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
];

const serviceTranslations: Record<Exclude<Locale, "en">, Record<ServiceSlug, ServiceTranslation>> = {
  fr: servicesFr,
  ar: servicesAr,
};

/** English service list, used where locale does not matter (slugs, sitemap). */
export const services = servicesEn;

export function getServices(locale: Locale): Service[] {
  if (locale === "en") return servicesEn;
  const translations = serviceTranslations[locale];
  return servicesEn.map((service) => {
    const { heroAlt, ...text } = translations[service.slug];
    return { ...service, ...text, heroImage: { ...service.heroImage, alt: heroAlt } };
  });
}

export function getServiceBySlug(slug: string, locale: Locale = "en") {
  return getServices(locale).find((service) => service.slug === slug);
}
