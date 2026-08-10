'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';
import Reveal from '@/components/marketing/Reveal';
import CustomCursor from '@/components/marketing/CustomCursor';
import { TextReveal, Marquee, ScrollRail, Spotlight } from '@/components/marketing/Motion';
import GearMotif from '@/components/marketing/GearMotif';
import {
  CASE_STUDIES,
  CLIENT_LINE,
  ENGAGEMENT_TERMS,
  PROCESS,
  SERVICES,
  STACK_LAYERS,
} from '@/lib/site-content';

const LAB_ARTICLES = [
  {
    slug: 'death-of-decorative-ui',
    tag: 'Design Systems',
    title: 'The Death of Decorative UI',
    desc: 'Why structural design outlasts trend cycles.',
  },
  {
    slug: 'micro-frontends-in-practice',
    tag: 'Engineering',
    title: 'Micro-Frontends in Practice',
    desc: 'Scaling teams without scaling technical debt.',
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
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-24">
      <div>
        <div className="flex items-center gap-4 mb-7">
          <span className="eyebrow" style={{ color: 'var(--signal)' }}>{index}</span>
          <span className="w-8 h-px" style={{ backgroundColor: 'var(--line-2)' }} />
          <span className="eyebrow">{label}</span>
        </div>
        <h2 className="display-lg2 max-w-2xl">{title}</h2>
      </div>
      {link && (
        <Link href={link.href} className="link-arrow hidden md:inline-flex flex-shrink-0">
          {link.text}
          <ArrowUpRight size={15} strokeWidth={1.75} />
        </Link>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="mkt min-h-screen">
      <ScrollRail />
      <CustomCursor />
      <Navbar />

      <main>
        {/* ─── HERO ─── */}
        <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden grain">
          <div className="absolute inset-0 grid-lines opacity-[0.55] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,#000_5%,transparent_75%)] pointer-events-none" />
          <div className="aura w-[900px] h-[900px] -top-56 -right-64" />
          <div className="aura w-[520px] h-[520px] top-1/3 -left-56 opacity-30" />
          <GearMotif
            className="absolute right-[-14%] top-1/2 -translate-y-1/2 w-[820px] h-[820px] hidden lg:block pointer-events-none float-slow"
            stroke="#FFFFFF"
            opacity={0.05}
          />

          <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10 pt-28 md:pt-32 pb-20 md:pb-24">
            <div className="flex items-center gap-4 mb-10 anim-fade-up">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--signal)' }} />
              <p className="eyebrow">Full-Stack Software Company</p>
            </div>

            <h1 className="display-xl max-w-[17ch] mb-12">
              <TextReveal text="We engineer the systems your business" delay={120} />{' '}
              <span className="font-serif-it">runs on</span>.
            </h1>

            <p className="lede max-w-xl mb-14 anim-fade-up" style={{ animationDelay: '0.24s' }}>
              Product engineering, internal systems, applied AI, and the infrastructure underneath —
              designed, built, and shipped end to end.
            </p>

            <div className="cta-row flex flex-col sm:flex-row sm:items-center gap-6 anim-fade-up" style={{ animationDelay: '0.36s' }}>
              <Link href="/contact" className="btn-pill btn-ink">
                Start a Project
              </Link>
              <Link href="/work" className="link-arrow w-fit">
                See Our Work
                <ArrowUpRight size={15} strokeWidth={1.75} />
              </Link>
            </div>
          </div>

          {/* Capability strip pinned to the fold */}
          <div className="absolute bottom-0 left-0 w-full border-t hairline z-10 hidden md:block">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-4">
                {SERVICES.map((service, i) => (
                  <div
                    key={service.id}
                    className={`py-7 ${i > 0 ? 'border-l hairline pl-8' : ''}`}
                  >
                    <p className="eyebrow mb-2" style={{ color: 'var(--signal)' }}>{service.index}</p>
                    <p className="text-[14px] font-light" style={{ color: 'var(--text-2)' }}>
                      {service.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── CLIENT FOCUS ─── */}
        <section className="border-t hairline relative" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-14 md:py-28">
            <Reveal>
              <p className="eyebrow mb-8">Who We Work With</p>
              <p className="display-md2 max-w-4xl font-light" style={{ color: 'var(--text-1)' }}>
                {CLIENT_LINE}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ─── CAPABILITIES ─── */}
        <section className="border-t hairline">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-36">
            <Reveal>
              <SectionHead
                index="01"
                label="Capabilities"
                title={
                  <>
                    Four disciplines, one <span className="font-serif-it">team</span>.
                  </>
                }
                link={{ href: '/capabilities', text: 'All Capabilities' }}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {SERVICES.map((service, i) => (
                <Reveal key={service.id} delay={i * 80}>
                  <Spotlight className="plane p-9 md:p-12 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-10">
                      <span className="numeral">{service.index}</span>
                      <span className="eyebrow">{service.timeline}</span>
                    </div>
                    <h3 className="display-md2 mb-4">{service.name}</h3>
                    <p className="body mb-10">{service.summary}</p>
                    <ul className="mt-auto space-y-0">
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="text-[14px] font-light py-3.5 border-t hairline"
                          style={{ color: 'var(--text-2)' }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Spotlight>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── METHOD ─── */}
        <section className="border-t hairline relative overflow-hidden" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className="aura w-[700px] h-[700px] -top-40 left-1/4 opacity-30" />
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-36 relative z-10">
            <Reveal>
              <SectionHead index="02" label="Method" title="Audit. Architect. Build." />
            </Reveal>

            <div className="flex flex-col">
              {PROCESS.map((step, i) => (
                <Reveal key={step.index} delay={i * 80}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 py-12 md:py-16 border-t hairline">
                    <div className="md:col-span-3">
                      <span className="numeral block mb-5">{step.index}</span>
                      <h3 className="display-md2">{step.name}</h3>
                    </div>
                    <div className="md:col-span-5">
                      <p className="lede !text-[17px]">{step.summary}</p>
                    </div>
                    <div className="md:col-span-4">
                      <ul className="space-y-0">
                        {step.detail.map((item) => (
                          <li
                            key={item}
                            className="text-[14px] font-light py-3.5 border-t hairline first:border-t-0 md:first:border-t"
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

        {/* ─── SELECTED WORK ─── */}
        <section className="border-t hairline">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-36">
            <Reveal>
              <SectionHead
                index="03"
                label="Selected Work"
                title="Systems we have shipped."
                link={{ href: '/work', text: 'View All Work' }}
              />
            </Reveal>

            <div className="flex flex-col gap-16 md:gap-32">
              {CASE_STUDIES.map((cs, i) => (
                <Reveal key={cs.name}>
                  <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
                    <a
                      href={cs.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group lg:col-span-7 block relative overflow-hidden rounded-[18px] border hairline ${
                        i % 2 === 1 ? 'lg:order-2' : ''
                      }`}
                      style={{ backgroundColor: 'var(--plane-2)' }}
                    >
                      <div className="absolute inset-0 grid-lines opacity-40" />
                      <div className="aura w-[420px] h-[420px] -bottom-40 -right-24 opacity-40" />
                      <div className="relative aspect-[16/10] flex flex-col items-center justify-center p-10">
                        <span className="eyebrow mb-5">{cs.domain}</span>
                        <span
                          className="display-lg2 text-center transition-transform duration-700 group-hover:scale-[1.03]"
                          style={{ color: 'var(--text-1)' }}
                        >
                          {cs.name.split(' ')[0]}
                        </span>
                      </div>
                      <div className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                        <ArrowUpRight size={18} style={{ color: 'var(--text-1)' }} />
                      </div>
                    </a>

                    <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="flex items-center gap-4 mb-7">
                        <span className="eyebrow">{cs.sector}</span>
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--text-3)' }} />
                        <span className="eyebrow">{cs.year}</span>
                      </div>

                      <h3 className="display-md2 mb-8">{cs.name}</h3>

                      <div className="flex gap-2 mb-10 flex-wrap">
                        {cs.categories.map((cat) => (
                          <span
                            key={cat}
                            className="eyebrow px-4 py-2 rounded-full border"
                            style={{ borderColor: 'var(--line-1)' }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      <dl className="space-y-7">
                        <div>
                          <dt className="eyebrow mb-2.5">Brief</dt>
                          <dd className="body">{cs.brief}</dd>
                        </div>
                        <div>
                          <dt className="eyebrow mb-2.5">Delivered</dt>
                          <dd className="body">{cs.delivered}</dd>
                        </div>
                        <div>
                          <dt className="eyebrow mb-2.5" style={{ color: 'var(--signal)' }}>Outcome</dt>
                          <dd className="text-[15px] leading-[1.68] font-normal" style={{ color: 'var(--text-1)' }}>
                            {cs.outcome}
                          </dd>
                        </div>
                      </dl>

                      <a href={cs.url} target="_blank" rel="noopener noreferrer" className="link-arrow mt-10 inline-flex">
                        View Live
                        <ArrowUpRight size={15} strokeWidth={1.75} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── THE STACK ─── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-36">
            <Reveal>
              <SectionHead
                index="04"
                label="The Stack"
                title={
                  <>
                    Full-stack means the <span className="font-serif-it">whole</span> stack.
                  </>
                }
              />
            </Reveal>

            <div className="flex flex-col">
              {STACK_LAYERS.map((layer, i) => (
                <Reveal key={layer.layer} delay={i * 60}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-8 md:py-10 border-t hairline items-baseline">
                    <span className="md:col-span-3 eyebrow">{layer.layer}</span>
                    <span
                      className="md:col-span-9 text-[19px] md:text-[24px] font-light tracking-[-0.02em]"
                      style={{ color: 'var(--text-1)' }}
                    >
                      {layer.items}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ENGAGEMENT ─── */}
        <section className="border-t hairline">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-36">
            <Reveal>
              <SectionHead
                index="05"
                label="Engagement"
                title={
                  <>
                    Terms agreed before anything is <span className="font-serif-it">built</span>.
                  </>
                }
              />
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
              {ENGAGEMENT_TERMS.map((term, i) => (
                <Reveal key={term.label} delay={i * 70}>
                  <div className="border-t hairline pt-8">
                    <p className="eyebrow mb-5">{term.label}</p>
                    <p className="text-[24px] font-light tracking-[-0.03em] mb-4" style={{ color: 'var(--text-1)' }}>
                      {term.value}
                    </p>
                    <p className="body !text-[14px]">{term.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── LAB ─── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-36">
            <Reveal>
              <SectionHead
                index="06"
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
                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 py-10 border-t hairline items-baseline"
                  >
                    <span className="md:col-span-3 eyebrow">{article.tag}</span>
                    <div className="md:col-span-8">
                      <h3
                        className="display-md2 mb-3 transition-colors duration-400"
                        style={{ color: 'var(--text-1)' }}
                      >
                        {article.title}
                      </h3>
                      <p className="body">{article.desc}</p>
                    </div>
                    <span className="md:col-span-1 hidden md:flex justify-end">
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                        style={{ color: 'var(--text-3)' }}
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
    </div>
  );
}
