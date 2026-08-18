/**
 * Single source of truth for copy that appears on more than one page.
 * Import from here rather than retyping — it is what keeps every page
 * describing the same company in the same words.
 */

export const COMPANY_LINE =
  'Floxr builds everything a growing business needs online — websites and stores, ordering apps, point of sale, inventory, and analytics.';

export const COMPANY_META =
  'Floxr builds everything a growing business needs online: websites and online stores, ordering apps, point of sale, inventory, analytics, and loyalty — one connected system.';

export const CLIENT_LINE =
  'Restaurants and cafés, retail and clothing brands, supermarkets, traders, and service businesses — anyone with customers to serve and stock, orders, or bookings to keep track of.';

export const FOUNDING_STORY =
  'Most businesses end up running on a patchwork: a storefront that does not talk to the till, stock counted twice, orders copied into a spreadsheet by hand. Floxr exists to replace that patchwork with systems that fit together. We scope the work in writing, quote a fixed price, and build it end to end.';

/** Products we sell. Named as products, not agency capabilities. */
export const PRODUCTS = [
  {
    id: 'pos',
    index: '01',
    name: 'Point of Sale',
    tagline: 'Billing that never stops',
    summary:
      'A modern till for counters and dine-in that keeps taking orders when the internet drops.',
    bullets: ['Offline-first, syncs when back online', 'Multi-branch stock and cash-up', 'Works on tablet, desktop, or terminal'],
  },
  {
    id: 'ordering',
    index: '02',
    name: 'Online Ordering',
    tagline: 'Your own app, not an aggregator',
    summary:
      'Branded ordering site and app so repeat customers order direct — and you keep the full ticket.',
    bullets: ['No per-order commission to anyone', 'Delivery, pickup, and dine-in QR', 'Rider assignment and live tracking'],
  },
  {
    id: 'store',
    index: '03',
    name: 'Online Store',
    tagline: 'Retail that actually converts',
    summary:
      'An e-commerce storefront built around real catalogues — variants, sizes, and live stock.',
    bullets: ['Local and international payments', 'Sizes, variants, and collections', 'Stock shared with your POS'],
  },
  {
    id: 'inventory',
    index: '04',
    name: 'Inventory & Operations',
    tagline: 'One source of truth',
    summary:
      'Stock, purchasing, suppliers, and recipes in one place instead of across five spreadsheets.',
    bullets: ['Live stock across branches', 'Purchase orders and suppliers', 'Recipes and wastage tracking'],
  },
  {
    id: 'analytics',
    index: '05',
    name: 'Analytics & Reports',
    tagline: 'Numbers you can act on',
    summary:
      'Sales, margins, and best-sellers live on a dashboard, plus the reports your accountant wants.',
    bullets: ['Live sales, margin, and hourly peaks', 'Branch and product comparison', 'Scheduled exports and alerts'],
  },
  {
    id: 'loyalty',
    index: '06',
    name: 'Loyalty & Customers',
    tagline: 'Make them come back',
    summary:
      'Every customer, order, and preference on record — and the tools to bring them back in.',
    bullets: ['Points, vouchers, and offers', 'Order history and preferences', 'WhatsApp and SMS campaigns'],
  },
] as const;

/** Kept as an alias so pages importing SERVICES keep working. */
export const SERVICES = PRODUCTS.map((p) => ({
  id: p.id,
  index: p.index,
  name: p.name,
  summary: p.summary,
  timeline: p.tagline,
  deliverables: p.bullets,
}));

/** Built to order, on top of the products above. */
export const CUSTOM_BUILDS = [
  { name: 'Websites', note: 'Brand sites, landing pages, and booking flows.' },
  { name: 'Mobile Apps', note: 'Customer, staff, and rider apps for iOS and Android.' },
  { name: 'Integrations', note: 'Accounting, payments, WhatsApp, and courier APIs.' },
  { name: 'Custom Software', note: 'The internal tool no off-the-shelf product sells.' },
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
