'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, X, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';
import Reveal from '@/components/marketing/Reveal';
import GearMotif from '@/components/marketing/GearMotif';
import {
  CASE_STUDIES,
  CLIENT_LINE,
  ENGAGEMENT_TERMS,
  PROCESS,
  SERVICES,
} from '@/lib/site-content';

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

function SectionHead({
  index,
  label,
  title,
  link,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  link?: { href: string; text: string };
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-18">
      <div>
        <p className="eyebrow text-[var(--color-rust)] mb-5">
          {index} — {label}
        </p>
        <h2 className="display-lg2 max-w-2xl">{title}</h2>
      </div>
      {link && (
        <Link href={link.href} className="link-arrow hidden md:inline-flex flex-shrink-0">
          {link.text}
          <ArrowUpRight size={14} strokeWidth={2.25} />
        </Link>
      )}
    </div>
  );
}

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
        <div
          className="rounded-t-xl overflow-hidden border border-b-0 translate-y-px"
          style={{ borderColor: 'var(--color-line-dark)', backgroundColor: 'var(--color-ink-2)' }}
        >
          <div
            className="flex items-center gap-2 px-5 py-3.5 border-b"
            style={{ borderColor: 'var(--color-line-dark)' }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-rust)]/70" />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-line-dark)' }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-line-dark)' }} />
            <span className="eyebrow ml-4" style={{ color: 'var(--color-mist-dark)' }}>
              {domain}
            </span>
          </div>
          <div className="h-[220px] md:h-[300px] flex items-center justify-center">
            <span className="text-[clamp(1.6rem,4vw,3rem)] font-bold tracking-tight text-[var(--color-paper)]/90 group-hover:scale-[1.04] transition-transform duration-700">
              {domain}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[var(--color-paper)]/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowUpRight size={18} className="text-[var(--color-paper)]" />
      </div>
    </a>
  );
}

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mkt min-h-screen">
      <Navbar />

      <main className="pt-[72px] md:pt-[80px]">
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden grain">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_65%_15%,#000_10%,transparent_72%)] pointer-events-none" />
          <GearMotif className="absolute -right-24 -top-16 w-[560px] h-[560px] hidden lg:block text-[var(--color-ink)] pointer-events-none" opacity={0.07} />

          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-28 pb-16 md:pb-24 relative z-10">
            <p className="eyebrow text-[var(--color-rust)] mb-8 anim-fade-up">
              Solutions Company — Audit · Architect · Build
            </p>
            <h1 className="display-xl max-w-4xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              Software and digital infrastructure for growing{' '}
              <span className="font-serif-it font-normal">businesses</span>.
            </h1>
            <p
              className="text-[18px] md:text-[21px] leading-relaxed max-w-2xl mb-10 anim-fade-up"
              style={{ color: 'var(--color-mist)', animationDelay: '0.2s' }}
            >
              Floxr designs and builds the websites, platforms, and internal systems businesses run
              on — clear scope, fixed pricing, delivered on time.
            </p>
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-6 anim-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href="/contact" className="btn-pill btn-ink">
                Start a Project
                <ArrowRight size={14} strokeWidth={2.25} />
              </Link>
              <Link href="/work" className="link-arrow w-fit">
                See Our Work
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </Link>
            </div>
          </div>

          {/* Who we work with */}
          <div className="border-t hairline relative z-10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-8 md:py-10">
              <p className="text-[15px] md:text-[17px] leading-relaxed max-w-4xl" style={{ color: 'var(--color-mist)' }}>
                <span className="eyebrow text-[var(--color-ink)] mr-3">Who We Work With</span>
                {CLIENT_LINE}
              </p>
            </div>
          </div>
        </section>

        {/* ─── WHAT WE BUILD ─── */}
        <section id="services" className="border-t hairline" style={{ backgroundColor: 'var(--color-paper-2)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal>
              <SectionHead
                index="01"
                label="What We Build"
                title={
                  <>
                    Four things, done <span className="font-serif-it font-normal">properly</span>.
                  </>
                }
                link={{ href: '/capabilities', text: 'All Capabilities' }}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((service, i) => (
                <Reveal key={service.id} delay={i * 70}>
                  <div className="card p-8 md:p-10 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-8">
                      <span className="numeral text-[52px] md:text-[64px]">{service.index}</span>
                      <span className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--color-mist)' }}>
                        {service.timeline}
                      </span>
                    </div>
                    <h3 className="display-md2 mb-3">{service.name}</h3>
                    <p className="text-[15px] leading-relaxed mb-7" style={{ color: 'var(--color-mist)' }}>
                      {service.summary}
                    </p>
                    <ul className="space-y-3.5 border-t hairline pt-6 mt-auto">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[14px]">
                          <Check size={16} strokeWidth={2.25} className="mt-[3px] text-[var(--color-rust)] flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW WE WORK ─── */}
        <section className="border-t hairline relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal>
              <SectionHead index="02" label="How We Work" title="Audit. Architect. Build." />
            </Reveal>

            <div className="flex flex-col">
              {PROCESS.map((step, i) => (
                <Reveal key={step.index} delay={i * 70}>
                  <div className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-12 border-t hairline">
                    <div className="md:col-span-2">
                      <span className="numeral text-[44px] md:text-[56px] group-hover:text-[var(--color-rust)] transition-colors duration-500">
                        {step.index}
                      </span>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="display-md2 mb-4">{step.name}</h3>
                      <p className="text-[16px] leading-relaxed max-w-sm" style={{ color: 'var(--color-mist)' }}>
                        {step.summary}
                      </p>
                    </div>
                    <div className="md:col-span-6">
                      <ul className="space-y-4">
                        {step.detail.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-4 text-[15px] pb-4 border-b hairline last:border-b-0"
                          >
                            <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[var(--color-rust)] flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ENGAGEMENT TERMS ─── */}
        <section
          className="border-t hairline relative overflow-hidden grain"
          style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}
        >
          <div className="absolute inset-0 grid-lines-dark opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_85%_50%,#000_10%,transparent_72%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 relative z-10">
            <Reveal>
              <p className="eyebrow text-[var(--color-rust-lt)] mb-5">03 — How We Engage</p>
              <h2 className="display-lg2 mb-6 max-w-2xl">
                Terms agreed before anything is{' '}
                <span className="font-serif-it font-normal">built</span>.
              </h2>
              <p className="text-[17px] leading-relaxed max-w-xl mb-16" style={{ color: 'var(--color-mist-dark)' }}>
                Most software goes wrong commercially before it goes wrong technically. We remove
                that risk at the start.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
              {ENGAGEMENT_TERMS.map((term, i) => (
                <Reveal key={term.label} delay={i * 70}>
                  <div className="border-t pt-8" style={{ borderColor: 'var(--color-line-dark)' }}>
                    <p className="eyebrow mb-4" style={{ color: 'var(--color-mist-dark)' }}>
                      {term.label}
                    </p>
                    <p className="text-[24px] font-bold tracking-tight mb-3">{term.value}</p>
                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-mist-dark)' }}>
                      {term.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SELECTED WORK ─── */}
        <section>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal>
              <SectionHead
                index="04"
                label="Selected Work"
                title="Work we have shipped."
                link={{ href: '/work', text: 'View All Work' }}
              />
            </Reveal>

            <div className="space-y-20 md:space-y-28">
              {CASE_STUDIES.map((cs, i) => (
                <Reveal key={cs.name}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <CaseMockup domain={cs.domain} url={cs.url} />
                    </div>
                    <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="flex gap-2 mb-5 flex-wrap">
                        <span className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--color-mist)' }}>
                          {cs.sector}
                        </span>
                        <span className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--color-mist)' }}>
                          {cs.year}
                        </span>
                      </div>
                      <h3 className="display-md2 mb-8">{cs.name}</h3>
                      <div className="space-y-6">
                        <div className="border-l-2 pl-5" style={{ borderColor: 'var(--color-line)' }}>
                          <p className="eyebrow mb-2" style={{ color: 'var(--color-mist)' }}>Brief</p>
                          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>{cs.brief}</p>
                        </div>
                        <div className="border-l-2 pl-5" style={{ borderColor: 'var(--color-line)' }}>
                          <p className="eyebrow mb-2" style={{ color: 'var(--color-mist)' }}>Delivered</p>
                          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>{cs.delivered}</p>
                        </div>
                        <div className="border-l-2 border-[var(--color-rust)] pl-5">
                          <p className="eyebrow text-[var(--color-rust)] mb-2">Outcome</p>
                          <p className="text-[15px] leading-relaxed font-semibold">{cs.outcome}</p>
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── THE LAB ─── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--color-paper-2)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <Reveal>
              <SectionHead
                index="05"
                label="Writing"
                title="The Lab"
                link={{ href: '/lab', text: 'All Entries' }}
              />
            </Reveal>

            <div className="flex flex-col">
              {LAB_ARTICLES.map((article, i) => (
                <Reveal key={article.slug} delay={i * 70}>
                  <Link
                    href={`/lab/${article.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 border-t hairline items-baseline"
                  >
                    <span className="md:col-span-3 eyebrow" style={{ color: 'var(--color-mist)' }}>
                      {article.tag}
                    </span>
                    <div className="md:col-span-8">
                      <h3 className="display-md2 mb-3 group-hover:text-[var(--color-rust)] transition-colors duration-300">
                        {article.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>
                        {article.desc}
                      </p>
                    </div>
                    <span className="md:col-span-1 hidden md:flex justify-end">
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.75}
                        className="text-[var(--color-mist)] group-hover:text-[var(--color-rust)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* ─── SOFT ENQUIRY PROMPT ─── */}
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
              aria-label="Close"
            >
              <X size={22} strokeWidth={1.75} />
            </button>

            <p className="eyebrow text-[var(--color-rust)] mb-5">Considering a Project?</p>
            <h2 className="display-md2 mb-4">
              Tell us what you need — we&apos;ll tell you{' '}
              <span className="font-serif-it font-normal">honestly</span>.
            </h2>
            <p className="text-[15px] leading-relaxed mb-8" style={{ color: 'var(--color-mist)' }}>
              Send us a short brief and we&apos;ll come back with scope, timeline, and a fixed price.
              If we are not the right fit, we&apos;ll say so.
            </p>
            <Link href="/contact" className="btn-pill btn-ink w-full" onClick={() => setShowPopup(false)}>
              Start a Conversation
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
