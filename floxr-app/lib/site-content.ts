/**
 * Single source of truth for marketing copy that appears on more than one page.
 * Import from here rather than retyping — it is what keeps every page
 * describing the same company in the same words.
 */

export const COMPANY_LINE =
  'Floxr is a full-stack software company. We design, build, and ship the systems businesses run on.';

export const COMPANY_META =
  'Floxr is a full-stack software company. We design, build, and ship end-to-end software solutions — product engineering, internal systems, AI, and infrastructure.';

export const CLIENT_LINE =
  'We work with trading, logistics, and professional services businesses building their first real digital infrastructure.';

export const FOUNDING_STORY =
  'Floxr was founded to close the gap between what businesses actually need and what most software vendors deliver: unclear scope, unpredictable timelines, and hourly billing that rewards slow work. We operate differently — fixed scope, fixed price, agreed before anything is built, and direct access to the people doing the work throughout.';

/** The four capability areas. These names are used verbatim across every page. */
export const SERVICES = [
  {
    id: 'product',
    index: '01',
    name: 'Product Engineering',
    summary:
      'Customer-facing platforms and applications, taken from first screen to production.',
    timeline: 'Typically 3–6 weeks',
    deliverables: [
      'Interface design and front-end engineering',
      'Accounts, workflows, and document handling',
      'Payments and third-party integrations',
    ],
  },
  {
    id: 'systems',
    index: '02',
    name: 'Internal Systems',
    summary:
      'The operational software your team works inside every day — dashboards, admin, reporting.',
    timeline: 'Typically 3–6 weeks',
    deliverables: [
      'Operational dashboards and reporting',
      'Admin panels and role-based access',
      'Integrations with the tools you already run',
    ],
  },
  {
    id: 'ai',
    index: '03',
    name: 'AI & Automation',
    summary:
      'Applied AI built into real workflows — assistants, document processing, retrieval.',
    timeline: 'Typically 2–4 weeks',
    deliverables: [
      'Assistants grounded in your own data',
      'Document processing and extraction',
      'Automation of repetitive internal work',
    ],
  },
  {
    id: 'infrastructure',
    index: '04',
    name: 'Cloud & Infrastructure',
    summary:
      'The layer underneath: APIs, data, deployment pipelines, and the systems that keep it running.',
    timeline: 'Scoped per engagement',
    deliverables: [
      'API design and service architecture',
      'Database design and data migration',
      'Deployment pipelines and monitoring',
    ],
  },
] as const;

/** The engagement method. A named process is the core "this is a company" signal. */
export const PROCESS = [
  {
    index: '01',
    name: 'Audit',
    summary:
      'Every engagement starts by understanding what exists — where it leaks, where it breaks, and what is holding the business back.',
    detail: [
      'Systems and technical debt review',
      'User experience and friction analysis',
      'Performance and scalability benchmarks',
    ],
  },
  {
    index: '02',
    name: 'Architect',
    summary:
      'We define what should exist and agree it in writing. Scope and price are fixed before a line of code is written.',
    detail: [
      'Technical blueprint you approve first',
      'Design system and interface structure',
      'Data model and integration planning',
    ],
  },
  {
    index: '03',
    name: 'Build',
    summary:
      'We build to the agreed blueprint and hand over a system your team can operate without us.',
    detail: [
      'Full-stack implementation, front to back',
      'Tests, CI/CD, and deployment',
      'Handover documentation and support',
    ],
  },
] as const;

/** Engagement terms — operational facts, the register procurement-literate buyers expect. */
export const ENGAGEMENT_TERMS = [
  { label: 'Pricing', value: 'Fixed fee', note: 'Agreed in writing before work begins. No hourly billing.' },
  { label: 'Scope', value: 'Defined upfront', note: 'A written blueprint you approve before we build.' },
  { label: 'Access', value: 'Direct', note: 'You speak to the people building your product.' },
  { label: 'Handover', value: 'Documented', note: 'Code, deployment, and documentation are yours.' },
] as const;

/** The stack we build across — full-stack, stated plainly. */
export const STACK_LAYERS = [
  { layer: 'Front-end', items: 'TypeScript · React · Next.js' },
  { layer: 'Back-end', items: 'Node.js · REST & RPC APIs' },
  { layer: 'Data', items: 'PostgreSQL · Prisma · Redis' },
  { layer: 'Infrastructure', items: 'AWS · Vercel · Docker · CI/CD' },
] as const;

/** Lab entry slugs — shared with the sitemap so published writing is discoverable. */
export const LAB_SLUGS = [
  'death-of-decorative-ui',
  'micro-frontends-in-practice',
  'friction-as-a-feature',
  'typographic-scales-in-fluid-contexts',
] as const;

/** Real, shipped work only. */
export const CASE_STUDIES = [
  {
    name: 'AmeerGlobal Trading & Imports',
    domain: 'ameerglobal.ca',
    url: 'https://ameerglobal.ca',
    year: '2026',
    categories: ['Product Engineering', 'Internal Systems'],
    sector: 'Trading & Logistics',
    brief:
      'A Toronto-based international trading company specializing in import and export partnerships across commodities and logistics.',
    delivered:
      'We built the customer-facing platform and the internal operations system behind it, end to end — supporting private-label supply and global commodity trading.',
    outcome:
      'Profitable within two months of launch, ahead of the client’s own projections.',
  },
  {
    name: 'Juriq',
    domain: 'juriq.app',
    url: 'https://juriq.app',
    year: '2024',
    categories: ['Product Engineering', 'AI & Automation'],
    sector: 'Legal & Professional Services',
    brief:
      'Legal research is slow and scattered across databases, costing professionals hours of manual work per case.',
    delivered:
      'We built an AI legal research assistant: GPT-4-powered search, automated brief generation, and precedent matching.',
    outcome: 'Live and in use at juriq.app.',
  },
] as const;
