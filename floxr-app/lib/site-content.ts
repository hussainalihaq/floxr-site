/**
 * Single source of truth for copy that appears on more than one page.
 * Import from here rather than retyping — it is what keeps every page
 * describing the same company in the same words.
 */

export const COMPANY_LINE =
  'Floxr is a solutions company. We build the software businesses run on — storefronts, point of sale, operations, and everything in between.';

export const COMPANY_META =
  'Floxr builds the software businesses run on: e-commerce platforms, point of sale, ERP and operations, CRM, dashboards, and custom internal tools.';

export const CLIENT_LINE =
  'Restaurants, retail and clothing labels, traders, and service businesses — teams who need the software side handled properly, once.';

export const FOUNDING_STORY =
  'Most businesses end up running on a patchwork: a storefront that does not talk to the till, stock counted twice, orders copied into a spreadsheet by hand. Floxr exists to replace that patchwork with systems that fit together. We scope the work in writing, quote a fixed price, and build it end to end.';

/** What we build. Used verbatim across every page. */
export const SERVICES = [
  {
    id: 'ecommerce',
    index: '01',
    name: 'E-Commerce',
    summary: 'Online stores that handle real catalogues, real payments, and real stock.',
    timeline: '2–5 weeks',
    deliverables: [
      'Storefront, catalogue, and checkout',
      'Local and international payment gateways',
      'Stock synced with your other systems',
    ],
  },
  {
    id: 'pos',
    index: '02',
    name: 'Point of Sale',
    summary: 'Billing at the counter that keeps working when the internet does not.',
    timeline: '3–6 weeks',
    deliverables: [
      'Fast counter billing and receipts',
      'Offline-first, syncs when back online',
      'Multi-branch stock and cash reconciliation',
    ],
  },
  {
    id: 'erp',
    index: '03',
    name: 'ERP & Operations',
    summary: 'Inventory, purchasing, and suppliers in one place instead of five spreadsheets.',
    timeline: '4–8 weeks',
    deliverables: [
      'Inventory, purchasing, and supplier records',
      'Approvals and role-based access',
      'Exports your accountant can actually use',
    ],
  },
  {
    id: 'crm',
    index: '04',
    name: 'CRM & Sales',
    summary: 'Every lead, quote, and follow-up tracked instead of living in WhatsApp.',
    timeline: '3–5 weeks',
    deliverables: [
      'Leads, pipelines, and follow-up reminders',
      'Quotes and customer history',
      'WhatsApp and email integration',
    ],
  },
  {
    id: 'dashboards',
    index: '05',
    name: 'Dashboards & Reporting',
    summary: 'The numbers that matter, live, without anyone building a report by hand.',
    timeline: '2–4 weeks',
    deliverables: [
      'Live sales, stock, and margin views',
      'Branch and product breakdowns',
      'Scheduled exports and alerts',
    ],
  },
  {
    id: 'custom',
    index: '06',
    name: 'Custom Software',
    summary: 'The tool your business needs that no off-the-shelf product sells.',
    timeline: 'Scoped per project',
    deliverables: [
      'Internal tools and customer portals',
      'Integrations between systems you already run',
      'Automation and AI where it genuinely pays off',
    ],
  },
] as const;

/** Sectors we build for. */
export const INDUSTRIES = [
  { name: 'Food & Restaurants', note: 'Ordering, counter billing, branches, and delivery platforms.' },
  { name: 'Retail & Clothing', note: 'Storefronts, sizes and variants, stock across shops.' },
  { name: 'Trading & Logistics', note: 'Suppliers, shipments, documents, and margins.' },
  { name: 'Professional Services', note: 'Clients, matters, billing, and internal workflow.' },
] as const;

/** How an engagement runs. */
export const PROCESS = [
  {
    index: '01',
    name: 'Understand',
    summary: 'We sit with how the business runs today — the workarounds included — before proposing anything.',
    detail: ['Walk through current process', 'Find what breaks and what costs time', 'Agree what success looks like'],
  },
  {
    index: '02',
    name: 'Scope',
    summary: 'You get the plan in writing: what gets built, in what order, by when, for how much.',
    detail: ['Written scope you approve first', 'Fixed price, fixed timeline', 'Phases, so value lands early'],
  },
  {
    index: '03',
    name: 'Build & Hand Over',
    summary: 'We build it, put it in your team’s hands, and make sure they can run it without us.',
    detail: ['Built, tested, and deployed', 'Team training and documentation', 'Support window after launch'],
  },
] as const;

/** Operational facts, in the register buyers expect. */
export const ENGAGEMENT_TERMS = [
  { label: 'Pricing', value: 'Fixed fee', note: 'Quoted in writing before work starts. No hourly billing.' },
  { label: 'Scope', value: 'Agreed upfront', note: 'A written plan you approve before anything is built.' },
  { label: 'Access', value: 'Direct', note: 'You talk to the people building it, not an account manager.' },
  { label: 'Handover', value: 'Yours to keep', note: 'Code, accounts, and documentation transfer to you.' },
] as const;

export const STACK_LAYERS = [
  { layer: 'Interfaces', items: 'Web · Mobile · In-store' },
  { layer: 'Services', items: 'APIs · Payments · Messaging' },
  { layer: 'Data', items: 'Inventory · Orders · Customers' },
  { layer: 'Operations', items: 'Hosting · Backups · Monitoring' },
] as const;

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
    categories: ['E-Commerce', 'ERP & Operations'],
    sector: 'Trading & Logistics',
    brief:
      'A Toronto trading company handling import and export across commodities and logistics, running on email and spreadsheets.',
    delivered:
      'We built the customer-facing platform and the internal operations system behind it — catalogue, enquiries, and the supply workflow in one place.',
    outcome: 'Profitable within two months of launch, ahead of the client’s own projections.',
  },
  {
    name: 'Juriq',
    domain: 'juriq.app',
    url: 'https://juriq.app',
    year: '2024',
    categories: ['Custom Software'],
    sector: 'Professional Services',
    brief:
      'Legal research was slow and scattered across databases, costing professionals hours of manual work per case.',
    delivered:
      'We built a research assistant with AI-powered search, automated brief generation, and precedent matching.',
    outcome: 'Live and in use at juriq.app.',
  },
] as const;
