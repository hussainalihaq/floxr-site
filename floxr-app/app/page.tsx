'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';
import Reveal from '@/components/marketing/Reveal';
import { TextReveal } from '@/components/marketing/Motion';
import {
  CASE_STUDIES,
  CLIENT_LINE,
  ENGAGEMENT_TERMS,
  INDUSTRIES,
  PROCESS,
  SERVICES,
} from '@/lib/site-content';

const WRAP = 'max-w-[1180px] mx-auto px-6 md:px-8';

function SectionHead({
  label,
  title,
  note,
  link,
}: {
  label: string;
  title: React.ReactNode;
  note?: string;
  link?: { href: string; text: string };
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
      <div className="max-w-2xl">
        <p className="eyebrow mb-6">{label}</p>
        <h2 className="display-lg2">{title}</h2>
        {note && <p className="lede mt-6 max-w-xl">{note}</p>}
      </div>
      {link && (
        <Link href={link.href} className="link-arrow hidden md:inline-flex flex-shrink-0">
          {link.text}
          <ArrowUpRight size={15} strokeWidth={1.6} />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mkt min-h-screen">
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="border-b hairline">
          <div className={`${WRAP} pt-32 md:pt-48 pb-16 md:pb-24`}>
            <p className="eyebrow mb-8 anim-fade-up">Solutions Company</p>

            <h1 className="display-xl max-w-[16ch] mb-10">
              <TextReveal text="The software your business" delay={80} />{' '}
              <span className="font-serif-it">runs on</span>.
            </h1>

            <p className="lede max-w-xl mb-12 anim-fade-up" style={{ animationDelay: '0.2s' }}>
              Online stores, point of sale, inventory, CRM, dashboards — built to fit how your
              business actually works, and built to work together.
            </p>

            <div
              className="cta-row flex flex-col sm:flex-row sm:items-center gap-5 anim-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href="/contact" className="btn-pill btn-ink">
                Start a Project
              </Link>
              <Link href="/work" className="link-arrow w-fit">
                See our work
                <ArrowUpRight size={15} strokeWidth={1.6} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── What we build ── */}
        <section className="border-b hairline">
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead
                label="What We Build"
                title="Everything the business needs to run."
                note="Most clients start with one system and add the next once it proves itself."
                link={{ href: '/capabilities', text: 'All capabilities' }}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--line-1)' }}>
              {SERVICES.map((service, i) => (
                <Reveal key={service.id} delay={i * 55}>
                  <div
                    className="h-full p-8 md:p-10 transition-colors duration-300 hover:bg-[var(--plane-1)]"
                    style={{ backgroundColor: 'var(--void)' }}
                  >
                    <div className="flex items-baseline justify-between mb-7">
                      <span className="numeral">{service.index}</span>
                      <span className="eyebrow">{service.timeline}</span>
                    </div>
                    <h3 className="text-[21px] font-normal tracking-[-0.025em] mb-3">{service.name}</h3>
                    <p className="body mb-8">{service.summary}</p>
                    <ul>
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="text-[13.5px] font-light py-3 border-t hairline"
                          style={{ color: 'var(--text-2)' }}
                        >
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

        {/* ── Industries ── */}
        <section className="border-b hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead label="Who We Build For" title="Businesses with real operations." note={CLIENT_LINE} />
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
              {INDUSTRIES.map((industry, i) => (
                <Reveal key={industry.name} delay={i * 55}>
                  <div className="border-t pt-6" style={{ borderColor: 'var(--line-2)' }}>
                    <h3 className="text-[17px] font-normal tracking-[-0.02em] mb-3">{industry.name}</h3>
                    <p className="body !text-[14px]">{industry.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="border-b hairline">
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead label="How It Works" title="Three steps, no surprises." />
            </Reveal>

            <div className="flex flex-col">
              {PROCESS.map((step, i) => (
                <Reveal key={step.index} delay={i * 55}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-t hairline">
                    <div className="md:col-span-3">
                      <span className="numeral block mb-4">{step.index}</span>
                      <h3 className="text-[22px] font-normal tracking-[-0.025em]">{step.name}</h3>
                    </div>
                    <div className="md:col-span-5">
                      <p className="lede !text-[17px]">{step.summary}</p>
                    </div>
                    <div className="md:col-span-4">
                      <ul>
                        {step.detail.map((item) => (
                          <li
                            key={item}
                            className="text-[14px] font-light py-3 border-t hairline first:border-t-0 md:first:border-t"
                            style={{ color: 'var(--text-2)' }}
                          >
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

        {/* ── Work ── */}
        <section className="border-b hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead
                label="Selected Work"
                title="Systems in use today."
                link={{ href: '/work', text: 'View all work' }}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CASE_STUDIES.map((cs, i) => (
                <Reveal key={cs.name} delay={i * 70}>
                  <a
                    href={cs.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full p-8 md:p-10 border hairline transition-colors duration-300 hover:border-[var(--line-2)]"
                    style={{ backgroundColor: 'var(--void)' }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <span className="eyebrow">{cs.sector}</span>
                      <span className="eyebrow">{cs.year}</span>
                    </div>

                    <h3 className="text-[24px] font-normal tracking-[-0.028em] mb-4">{cs.name}</h3>
                    <p className="body mb-8">{cs.delivered}</p>

                    <p className="text-[14px] leading-relaxed pb-8" style={{ color: 'var(--text-1)' }}>
                      {cs.outcome}
                    </p>

                    <span className="flex items-center justify-between border-t hairline pt-6">
                      <span className="eyebrow">{cs.domain}</span>
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: 'var(--text-2)' }}
                      />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Terms ── */}
        <section className="border-b hairline">
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead label="How We Work" title="Priced and scoped before we start." />
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
              {ENGAGEMENT_TERMS.map((term, i) => (
                <Reveal key={term.label} delay={i * 55}>
                  <div className="border-t pt-6" style={{ borderColor: 'var(--line-2)' }}>
                    <p className="eyebrow mb-4">{term.label}</p>
                    <p className="text-[20px] font-normal tracking-[-0.025em] mb-3">{term.value}</p>
                    <p className="body !text-[14px]">{term.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
