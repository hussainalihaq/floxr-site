'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, X, Search, DraftingCompass, Hammer, Globe, LayoutDashboard, Bot, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';

const FACTS = [
  { value: '~2 wks', label: 'Typical Website Delivery' },
  { value: 'Fixed', label: 'Quote Before We Start' },
  { value: '48 h', label: 'Free Audit Turnaround' },
  { value: '< 24 h', label: 'Response Time' },
];

const PACKAGES = [
  {
    icon: Globe,
    title: 'Business Website',
    timeline: '~2 weeks',
    desc: 'A fast, credible site that actually brings in customers — designed, built, and launched.',
    items: [
      'Design, build, and launch on Next.js',
      'Mobile-first, fast, SEO basics done right',
      'Contact forms, analytics, CMS if you need it',
    ],
  },
  {
    icon: LayoutDashboard,
    title: 'Platform or Dashboard',
    timeline: '3–6 weeks',
    desc: 'Custom web applications: client portals, internal dashboards, and the systems your business runs on.',
    items: [
      'Auth, database, and admin panels',
      'Internal dashboards and client portals',
      'Integrations with tools you already use',
    ],
  },
  {
    icon: Bot,
    title: 'Custom AI Tool',
    timeline: '2–4 weeks',
    desc: 'Practical AI built into your workflow — assistants, document processing, and automation.',
    items: [
      'Chat assistants and document processing',
      'Built around your data and workflows',
      'Practical scope — no science projects',
    ],
  },
];

const FRAMEWORK = [
  {
    index: '01',
    title: 'Audit',
    icon: Search,
    desc: 'We start by understanding what exists today — where it leaks, where it breaks, and where it holds you back.',
    items: [
      'System mapping & technical debt review',
      'User experience friction identification',
      'Performance & speed benchmarks',
    ],
  },
  {
    index: '02',
    title: 'Architect',
    icon: DraftingCompass,
    desc: 'Then we plan what should exist — a clear structure and a fixed scope before a single line of code is written.',
    items: [
      'A blueprint you approve before we build',
      'Design system & page structure',
      'Data flow & integration planning',
    ],
  },
  {
    index: '03',
    title: 'Build',
    icon: Hammer,
    desc: 'Then we build it — engineered, tested, and shipped on the timeline we quoted.',
    items: [
      'High-fidelity front-end implementation',
      'Robust back-end service integration',
      'Deployment, handover, and support',
    ],
  },
];

const CASE_STUDIES = [
  {
    name: 'AmeerGlobal Trading & Imports',
    domain: 'ameerglobal.ca',
    url: 'https://ameerglobal.ca',
    tags: ['Website + Dashboard', 'Toronto'],
    client:
      'A Toronto-based international trading company specializing in import and export partnerships across commodities and logistics.',
    build:
      'We built everything end-to-end: the public website and the internal operations dashboard behind it — supporting private-label supply and global commodity trading.',
    shipped:
      'Profitable within two months of launch — ahead of the client’s own projections. Live at ameerglobal.ca.',
  },
  {
    name: 'Juriq — AI Legal Research',
    domain: 'juriq.app',
    url: 'https://juriq.app',
    tags: ['AI Tool', 'SaaS'],
    client:
      'Legal research is slow and scattered across databases — hours of manual work per case.',
    build:
      'We built Juriq, an AI legal research assistant: GPT-4-powered search, automated brief generation, and precedent matching.',
    shipped: 'Live at juriq.app.',
  },
];

const LAB_ARTICLES = [
  {
    slug: 'death-of-decorative-ui',
    tag: 'Design Systems',
    title: 'The Death of Decorative UI',
    desc: 'Why pure structural design outlasts trend cycles and drives higher enterprise value.',
  },
  {
    slug: 'micro-frontends-in-practice',
    tag: 'Engineering',
    title: 'Micro-Frontends in Practice',
    desc: 'Architectural strategies for scaling development teams without increasing technical debt.',
  },
];

function CaseMockup({ domain, url }: { domain: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative overflow-hidden rounded-2xl"
      style={{ backgroundColor: 'var(--color-ink)' }}
    >
      <div className="absolute inset-0 grid-lines-dark" />
      <div className="relative p-6 md:p-12 pb-0 md:pb-0">
        {/* Browser chrome */}
        <div
          className="rounded-t-xl overflow-hidden border border-b-0 translate-y-px"
          style={{ borderColor: 'var(--color-line-dark)', backgroundColor: 'var(--color-ink-2)' }}
        >
          <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: 'var(--color-line-dark)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-rust)]/70" />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-line-dark)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-line-dark)' }} />
            <span className="eyebrow ml-4" style={{ color: 'var(--color-mist-dark)' }}>{domain}</span>
          </div>
          <div className="h-[220px] md:h-[300px] flex items-center justify-center">
            <span className="text-[clamp(1.6rem,4vw,3rem)] font-bold tracking-tight text-[var(--color-paper)]/90 group-hover:scale-[1.04] transition-transform duration-700">
              {domain}
            </span>
          </div>
        </div>
      </div>
      {/* Hover badge */}
      <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[var(--color-paper)]/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight size={18} className="text-[var(--color-paper)]" />
      </div>
    </a>
  );
}

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mkt min-h-screen">
      <Navbar />

      <main className="pt-[72px] md:pt-[80px]">
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_10%,#000_10%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-28 pb-16 md:pb-24 relative">
            <p className="eyebrow text-[var(--color-rust)] mb-8 anim-fade-up">
              Websites · Platforms · Dashboards
            </p>
            <h1 className="display-xl max-w-5xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              Websites, platforms, and dashboards — built{' '}
              <span className="font-serif-it font-normal">right</span>.
            </h1>
            <p
              className="text-[18px] md:text-[21px] leading-relaxed max-w-2xl mb-12 anim-fade-up"
              style={{ color: 'var(--color-mist)', animationDelay: '0.2s' }}
            >
              Floxr is a small product studio. We ship business websites in about two weeks, and
              custom platforms, dashboards, and AI tools without the agency overhead — clear scope,
              a fixed quote, fast delivery.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 anim-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link href="#packages" className="btn-pill btn-ink">
                See What We Build
                <ArrowRight size={14} strokeWidth={2.25} />
              </Link>
              <Link href="/work" className="link-arrow w-fit">
                Explore Our Work
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </Link>
            </div>
          </div>

          {/* Facts band */}
          <div className="border-t hairline relative">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4">
              {FACTS.map((fact, i) => (
                <div
                  key={fact.label}
                  className={`py-8 md:py-10 ${i > 0 ? 'md:border-l md:pl-10 hairline' : ''} ${i % 2 === 1 ? 'border-l pl-6 md:pl-10 hairline' : ''}`}
                >
                  <div className="text-[30px] md:text-[40px] font-bold tracking-tight leading-none mb-2">
                    {fact.value}
                  </div>
                  <div className="eyebrow" style={{ color: 'var(--color-mist)' }}>{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PACKAGES ─── */}
        <section id="packages" className="border-t hairline scroll-mt-[80px]" style={{ backgroundColor: 'var(--color-paper-2)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="flex items-end justify-between mb-14 md:mb-16">
              <div>
                <p className="eyebrow text-[var(--color-rust)] mb-5">01 — What We Build</p>
                <h2 className="display-lg2">
                  Concrete work, clear <span className="font-serif-it font-normal">scope</span>.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.title}
                  className="group rounded-2xl border hairline bg-white p-8 md:p-9 flex flex-col hover:shadow-[0_16px_48px_rgba(18,18,20,0.07)] transition-shadow duration-500"
                >
                  <div className="flex items-center justify-between mb-8">
                    <pkg.icon size={26} strokeWidth={1.5} className="text-[var(--color-ink)]" />
                    <span className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--color-mist)' }}>
                      {pkg.timeline}
                    </span>
                  </div>
                  <h3 className="text-[22px] font-bold tracking-tight mb-4">{pkg.title}</h3>
                  <p className="text-[15px] leading-relaxed mb-7" style={{ color: 'var(--color-mist)' }}>
                    {pkg.desc}
                  </p>
                  <ul className="space-y-3.5 border-t hairline pt-6 mb-8">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px]">
                        <Check size={16} strokeWidth={2.25} className="mt-[3px] text-[var(--color-rust)] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="link-arrow mt-auto w-fit">
                    Get a Quote
                    <ArrowUpRight size={14} strokeWidth={2.25} />
                  </Link>
                </div>
              ))}
            </div>

            <p className="text-[15px] mt-10" style={{ color: 'var(--color-mist)' }}>
              Every project gets a fixed quote before we start — no hourly billing, no surprises.
              Not sure which fits? <Link href="/contact" className="underline underline-offset-4 text-[var(--color-ink)] hover:text-[var(--color-rust)] transition-colors">Tell us what you need</Link> and we&apos;ll tell you honestly.
            </p>
          </div>
        </section>

        {/* ─── HOW WE WORK ─── */}
        <section id="capabilities" className="border-t hairline">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="flex items-end justify-between mb-14 md:mb-20">
              <div>
                <p className="eyebrow text-[var(--color-rust)] mb-5">02 — How We Work</p>
                <h2 className="display-lg2">Audit. Architect. Build.</h2>
              </div>
              <Link href="/capabilities" className="link-arrow hidden md:inline-flex">
                All Capabilities
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </Link>
            </div>

            <div className="flex flex-col">
              {FRAMEWORK.map((step) => (
                <div
                  key={step.index}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-12 border-t hairline"
                >
                  <div className="md:col-span-2 flex md:block items-center gap-4">
                    <span className="text-[15px] font-mono font-medium text-[var(--color-rust)]">
                      {step.index}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-4 mb-4">
                      <step.icon size={22} strokeWidth={1.75} className="text-[var(--color-ink)]" />
                      <h3 className="display-md2 group-hover:text-[var(--color-rust)] transition-colors duration-300">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[16px] leading-relaxed max-w-sm" style={{ color: 'var(--color-mist)' }}>
                      {step.desc}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <ul className="space-y-4">
                      {step.items.map((item) => (
                        <li key={item} className="flex items-start gap-4 text-[15px] pb-4 border-b hairline last:border-b-0">
                          <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[var(--color-rust)] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FREE AUDIT ─── */}
        <section id="audit" style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 relative overflow-hidden">
            <div className="absolute inset-0 grid-lines-dark opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_90%_50%,#000_10%,transparent_70%)] pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
              <div className="lg:col-span-7">
                <p className="eyebrow text-[var(--color-rust-lt)] mb-6">03 — Free Right Now</p>
                <h2 className="display-lg2 mb-6">The Floxr Website Audit</h2>
                <p className="text-[17px] leading-relaxed max-w-xl mb-10" style={{ color: 'var(--color-mist-dark)' }}>
                  Send us your website. Within 48 hours we&apos;ll reply with a concrete, prioritized
                  list of what&apos;s broken, what&apos;s slow, and what to fix first — free, whether
                  or not you ever hire us. No sales pitch.
                </p>
                <Link href="/audit" className="btn-pill btn-paper">
                  Get Your Free Audit
                  <ArrowRight size={14} strokeWidth={2.25} />
                </Link>
              </div>

              {/* Score card visual */}
              <div className="lg:col-span-5 hidden lg:block">
                <div
                  className="rounded-2xl border p-8 max-w-sm ml-auto"
                  style={{ backgroundColor: 'var(--color-ink-2)', borderColor: 'var(--color-line-dark)' }}
                >
                  <p className="eyebrow mb-6" style={{ color: 'var(--color-mist-dark)' }}>Sample Audit Report</p>
                  <div className="text-[64px] font-bold leading-none tracking-tight mb-8">
                    92.4<span className="text-[0.5em] font-medium" style={{ color: 'var(--color-mist-dark)' }}>/100</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: 'UX & Navigation', w: '86%' },
                      { label: 'Speed & Code', w: '94%' },
                      { label: 'Design Consistency', w: '78%' },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex justify-between mb-2">
                          <span className="eyebrow" style={{ color: 'var(--color-mist-dark)' }}>{row.label}</span>
                          <span className="eyebrow text-[var(--color-paper)]">{row.w}</span>
                        </div>
                        <div className="h-[3px] rounded-full" style={{ backgroundColor: 'var(--color-line-dark)' }}>
                          <div className="h-full rounded-full bg-[var(--color-rust)]" style={{ width: row.w }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SELECTED WORK ─── */}
        <section>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="flex items-end justify-between mb-14 md:mb-20">
              <div>
                <p className="eyebrow text-[var(--color-rust)] mb-5">04 — Case Studies</p>
                <h2 className="display-lg2">Selected Work</h2>
              </div>
              <Link href="/work" className="link-arrow hidden md:inline-flex">
                View All Work
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </Link>
            </div>

            <div className="space-y-20 md:space-y-28">
              {CASE_STUDIES.map((cs, i) => (
                <div key={cs.name} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <CaseMockup domain={cs.domain} url={cs.url} />
                  </div>
                  <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex gap-2 mb-5 flex-wrap">
                      {cs.tags.map((tag) => (
                        <span key={tag} className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--color-mist)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="display-md2 mb-8">{cs.name}</h3>
                    <div className="space-y-6">
                      <div className="border-l-2 pl-5" style={{ borderColor: 'var(--color-line)' }}>
                        <p className="eyebrow mb-2" style={{ color: 'var(--color-mist)' }}>The Brief</p>
                        <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>{cs.client}</p>
                      </div>
                      <div className="border-l-2 pl-5" style={{ borderColor: 'var(--color-line)' }}>
                        <p className="eyebrow mb-2" style={{ color: 'var(--color-mist)' }}>What We Built</p>
                        <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>{cs.build}</p>
                      </div>
                      <div className="border-l-2 border-[var(--color-rust)] pl-5">
                        <p className="eyebrow text-[var(--color-rust)] mb-2">Shipped</p>
                        <p className="text-[15px] leading-relaxed font-semibold">{cs.shipped}</p>
                      </div>
                    </div>
                    <a
                      href={cs.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow mt-8 inline-flex"
                    >
                      View Live
                      <ArrowUpRight size={14} strokeWidth={2.25} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── THE LAB ─── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--color-paper-2)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <div className="flex items-end justify-between mb-10 md:mb-14">
              <div>
                <p className="eyebrow text-[var(--color-rust)] mb-5">05 — Research & Writing</p>
                <h2 className="display-lg2">The Lab</h2>
              </div>
              <Link href="/lab" className="link-arrow hidden md:inline-flex">
                All Entries
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </Link>
            </div>

            <div className="flex flex-col">
              {LAB_ARTICLES.map((article) => (
                <Link
                  key={article.slug}
                  href={`/lab/${article.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 border-t hairline items-baseline"
                >
                  <span className="md:col-span-3 eyebrow" style={{ color: 'var(--color-mist)' }}>{article.tag}</span>
                  <div className="md:col-span-8">
                    <h3 className="display-md2 mb-3 group-hover:text-[var(--color-rust)] transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>{article.desc}</p>
                  </div>
                  <span className="md:col-span-1 hidden md:flex justify-end">
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.75}
                      className="text-[var(--color-mist)] group-hover:text-[var(--color-rust)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* ─── FREE AUDIT POPUP ─── */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(18,18,20,0.5)' }}
          onClick={() => setShowPopup(false)}
        >
          <div
            className="rounded-2xl shadow-2xl max-w-lg w-full p-8 md:p-12 relative animate-[scaleIn_0.3s_ease-out]"
            style={{ backgroundColor: 'var(--color-paper)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-5 right-5 text-[var(--color-mist)] hover:text-[var(--color-ink)] transition-colors"
              aria-label="Close popup"
            >
              <X size={22} strokeWidth={1.75} />
            </button>

            <p className="eyebrow text-[var(--color-rust)] mb-5">Free Right Now</p>
            <h2 className="display-md2 mb-4">
              Get a free website <span className="font-serif-it font-normal">audit</span>.
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: 'var(--color-mist)' }}>
              Send us your site and within 48 hours we&apos;ll reply with a concrete list of
              what&apos;s broken, what&apos;s slow, and what to fix first. No sales pitch, no
              obligation.
            </p>
            <Link
              href="/audit"
              className="btn-pill btn-ink w-full"
              onClick={() => setShowPopup(false)}
            >
              Claim Your Free Audit
              <ArrowRight size={14} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
