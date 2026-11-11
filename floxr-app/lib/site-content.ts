/**
 * Single source of truth for copy that appears on more than one page.
 * Import from here rather than retyping — it is what keeps every page
 * describing the same company in the same words.
 */

export const COMPANY_LINE =
  'Floxr gives restaurants and cafés their own ordering app and POS — with stock, sales, and loyalty in one system. Live in 14 days.';

export const COMPANY_META =
  'Your own ordering app and POS for restaurants and cafés in Pakistan. Counter billing, QR table ordering, branded delivery app, inventory, and loyalty — one system, no per-order commission, live in 14 days.';

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
    name: 'WOVN',
    domain: 'wovn.pk',
    url: 'https://www.wovn.pk',
    year: '2026',
    categories: ['AI Search', 'Fashion Commerce'],
    sector: 'Retail & Clothing',
    featured: true,
    brief:
      'A Pakistan-focused fashion discovery platform helping shoppers find outfits across local brands without jumping between separate stores.',
    delivered:
      'We built the live discovery experience around visual search, outfit exploration, and a fast product browsing flow for Pakistani fashion.',
    outcome: 'Featured project, live at wovn.pk.',
  },
  {
    name: 'AmeerGlobal Trading & Imports',
    domain: 'ameerglobal.ca',
    url: 'https://ameerglobal.ca',
    year: '2026',
    categories: ['E-Commerce', 'ERP & Operations'],
    sector: 'Trading & Logistics',
    featured: false,
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
    featured: false,
    brief:
      'Legal research was slow and scattered across databases, costing professionals hours of manual work per case.',
    delivered:
      'We built a research assistant with AI-powered search, automated brief generation, and precedent matching.',
    outcome: 'Live and in use at juriq.app.',
  },
] as const;


/* ── Restaurant offer ────────────────────────────────────────────
   Everything below drives the homepage. Prices, the WhatsApp number,
   and the guarantee live here so they can be changed in one place.   */

export const WHATSAPP_NUMBER = '923258399663';
export const WHATSAPP_DISPLAY = '+92 325 8399663';

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const DEMO_MESSAGE =
  "Hi Floxr, I'd like to book a free 15-minute demo for my restaurant.";
export const CHAT_MESSAGE = 'Hi Floxr, I have a question about the ordering app and POS.';

export const GO_LIVE_DAYS = 14;

/** What the system does inside a restaurant, in the owner's words. */
export const RESTAURANT_FEATURES = [
  {
    id: 'pos',
    name: 'Counter & dine-in POS',
    line: 'Bills in seconds, keeps working when the internet drops.',
    points: ['Tablet, PC, or terminal', 'Dine-in, takeaway, and delivery', 'Cash-up per shift and branch'],
  },
  {
    id: 'ordering',
    name: 'Your own ordering app',
    line: 'Customers order from your brand, not a marketplace.',
    points: ['Branded website and app', 'Delivery, pickup, and dine-in', 'Zero commission per order'],
  },
  {
    id: 'qr',
    name: 'QR table ordering',
    line: 'Guests scan the table code and order from their phone.',
    points: ['Menu with photos and add-ons', 'Orders land on the POS', 'Fewer waiter round-trips'],
  },
  {
    id: 'inventory',
    name: 'Stock & recipes',
    line: 'Every sale deducts its ingredients automatically.',
    points: ['Recipes and wastage tracking', 'Low-stock alerts', 'Purchase orders to suppliers'],
  },
  {
    id: 'loyalty',
    name: 'Loyalty & WhatsApp',
    line: 'Bring regulars back without paying for ads.',
    points: ['Points and vouchers', 'WhatsApp offers to past customers', 'Order history for every customer'],
  },
  {
    id: 'analytics',
    name: 'Sales dashboard',
    line: 'Know what sells, when, and at what margin.',
    points: ['Live sales on your phone', 'Best-sellers and dead stock', 'Reports your accountant wants'],
  },
] as const;

/** Setup fee plus a monthly plan. PKR. */
export const PLANS = [
  {
    id: 'counter',
    name: 'Counter',
    for: 'One café or takeaway counter',
    setup: 25000,
    monthly: 6000,
    featured: false,
    includes: [
      'Counter POS on your tablet or PC',
      'Menu, add-ons, and shift cash-up',
      'Stock with recipe deduction',
      'Live sales on your phone',
    ],
  },
  {
    id: 'direct',
    name: 'Own Ordering',
    for: 'Restaurants ready to stop paying commission',
    setup: 60000,
    monthly: 14000,
    featured: true,
    includes: [
      'Everything in Counter',
      'Branded ordering website',
      'QR table ordering',
      'Loyalty points and WhatsApp campaigns',
      'Rider assignment and live tracking',
    ],
  },
  {
    id: 'brand',
    name: 'Brand & Branches',
    for: 'Multi-branch groups and brands',
    setup: 150000,
    monthly: 30000,
    featured: false,
    from: true,
    includes: [
      'Everything in Own Ordering',
      'Your own iOS and Android app',
      'Live stock across every branch',
      'Branch comparison dashboard',
      'Priority support line',
    ],
  },
] as const;

export const PLAN_TERMS = [
  `Live in ${GO_LIVE_DAYS} days, or your first month is free`,
  'No commission on any order, ever',
  'Month to month after the first 3 months',
  'Menu import and staff training included',
] as const;

/** The two weeks from yes to live. */
export const GO_LIVE = [
  { day: 'Day 1', title: 'Demo & menu', note: 'A 15-minute walkthrough, then you send your menu as a photo, PDF, or spreadsheet.' },
  { day: 'Days 2–6', title: 'We set it up', note: 'Menu, prices, recipes, branding, and your ordering site — built around how you already work.' },
  { day: 'Days 7–11', title: 'Train & soft-launch', note: 'Your staff run it alongside the old way for a few days. We stay on WhatsApp the whole time.' },
  { day: `Day ${GO_LIVE_DAYS}`, title: 'Live', note: 'QR codes on tables, ordering link in your bio, and your first WhatsApp offer goes out.' },
] as const;

export const FAQ = [
  {
    q: 'Do I need to buy new hardware?',
    a: 'No. It runs on the tablet, laptop, or PC you already have. If you want a receipt printer or cash drawer, we will tell you which models work.',
  },
  {
    q: 'Can I keep using delivery apps?',
    a: 'Yes. Most restaurants keep them for discovery and move their regulars to their own ordering link, where there is no commission.',
  },
  {
    q: 'What happens if the internet goes down?',
    a: 'The POS keeps billing offline and syncs everything when the connection comes back.',
  },
  {
    q: 'Is there a contract?',
    a: 'The first three months are the minimum. After that it is month to month and you can stop any time. Your data and menu are exported to you if you leave.',
  },
  {
    q: 'Do you work with businesses that are not restaurants?',
    a: 'Yes. We also build online stores, operations systems, and custom software — AmeerGlobal and WOVN are two of them. Message us with what you need.',
  },
] as const;

export const formatPKR = (n: number) => `Rs ${n.toLocaleString('en-US')}`;
