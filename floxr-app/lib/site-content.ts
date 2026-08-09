/**
 * Single source of truth for marketing copy that appears on more than one page.
 * Import from here rather than retyping — it is what keeps the homepage,
 * /capabilities and /about describing the same company in the same words.
 */

export const COMPANY_LINE =
  'Floxr is a solutions company. We design and build the websites, platforms, and software that businesses run on.';

export const COMPANY_META =
  'Floxr is a solutions company. We design and build the websites, platforms, and software that businesses run on — fixed scope, fixed price, delivered on time.';

export const CLIENT_LINE =
  'We work with trading, logistics, and professional services businesses building their first real digital infrastructure.';

export const FOUNDING_STORY =
  'Floxr was founded to close the gap between what businesses actually need and what most software vendors deliver: unclear scope, unpredictable timelines, and hourly billing that rewards slow work. We operate differently — fixed scope, fixed price, agreed before anything is built, and direct access to the people doing the work throughout.';

/** The four service categories. These names are used verbatim across every page. */
export const SERVICES = [
  {
    id: 'websites',
    index: '01',
    name: 'Websites',
    summary:
      'Public-facing sites that establish credibility and turn visitors into enquiries.',
    timeline: 'Typically 2 weeks',
    deliverables: [
      'Design, build, and launch',
      'Mobile-first, fast, search-ready',
      'Content management where you need it',
    ],
  },
  {
    id: 'platforms',
    index: '02',
    name: 'Platforms & Portals',
    summary:
      'Customer-facing applications: accounts, workflows, document handling, and payments.',
    timeline: 'Typically 3–6 weeks',
    deliverables: [
      'Authentication and user accounts',
      'Workflow and document handling',
      'Payment and third-party integrations',
    ],
  },
  {
    id: 'systems',
    index: '03',
    name: 'Dashboards & Internal Systems',
    summary:
      'The operational tools your team works in daily — reporting, admin, and integrations.',
    timeline: 'Typically 3–6 weeks',
    deliverables: [
      'Operational dashboards and reporting',
      'Admin panels and role-based access',
      'Integrations with the tools you already use',
    ],
  },
  {
    id: 'ai',
    index: '04',
    name: 'AI & Automation',
    summary:
      'Practical AI built into existing workflows — assistants, document processing, retrieval.',
    timeline: 'Typically 2–4 weeks',
    deliverables: [
      'Assistants built on your own data',
      'Document processing and extraction',
      'Automation of repetitive internal work',
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
      'Front-end and back-end implementation',
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

/** Real, shipped work only. */
export const CASE_STUDIES = [
  {
    name: 'AmeerGlobal Trading & Imports',
    domain: 'ameerglobal.ca',
    url: 'https://ameerglobal.ca',
    year: '2026',
    categories: ['Websites', 'Dashboards & Internal Systems'],
    sector: 'Trading & Logistics',
    brief:
      'A Toronto-based international trading company specializing in import and export partnerships across commodities and logistics.',
    delivered:
      'We built the public website and the internal operations dashboard behind it, end to end — supporting private-label supply and global commodity trading.',
    outcome:
      'Profitable within two months of launch, ahead of the client’s own projections.',
  },
  {
    name: 'Juriq',
    domain: 'juriq.app',
    url: 'https://juriq.app',
    year: '2024',
    categories: ['Platforms & Portals', 'AI & Automation'],
    sector: 'Legal & Professional Services',
    brief:
      'Legal research is slow and scattered across databases, costing professionals hours of manual work per case.',
    delivered:
      'We built an AI legal research assistant: GPT-4-powered search, automated brief generation, and precedent matching.',
    outcome: 'Live and in use at juriq.app.',
  },
] as const;
