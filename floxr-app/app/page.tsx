'use client';

import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';
import Reveal from '@/components/marketing/Reveal';
import { TextReveal, Spotlight } from '@/components/marketing/Motion';
import CustomCursor from '@/components/marketing/CustomCursor';
import OrderBoard from '@/components/marketing/OrderBoard';
import CommissionCalc from '@/components/marketing/CommissionCalc';
import GoLiveTimeline from '@/components/marketing/GoLiveTimeline';
import AnimatedNumber from '@/components/marketing/AnimatedNumber';
import Magnetic from '@/components/marketing/Magnetic';
import Faq from '@/components/marketing/Faq';
import {
  CASE_STUDIES,
  CHAT_MESSAGE,
  CUSTOM_BUILDS,
  DEMO_MESSAGE,
  GO_LIVE_DAYS,
  PLANS,
  PLAN_TERMS,
  RESTAURANT_FEATURES,
  formatPKR,
  whatsappLink,
} from '@/lib/site-content';

const WRAP = 'max-w-[1180px] mx-auto px-6 md:px-8';
const STARTING = Math.min(...PLANS.map((p) => p.monthly));

// AmeerGlobal leads: it is the clearest commercial result.
const WORK = [
  ...CASE_STUDIES.filter((c) => c.name.startsWith('Ameer')),
  ...CASE_STUDIES.filter((c) => !c.name.startsWith('Ameer')),
];

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
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
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
      <CustomCursor />
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section className="hero border-b hairline relative overflow-hidden">
          <div className="hero-glow" aria-hidden="true" />

          <div className={`${WRAP} relative pt-32 md:pt-44 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center`}>
            <div className="lg:col-span-7">
              <h1 className="display-xl max-w-[13ch] mb-9">
                <TextReveal text="Your own ordering app and POS. Live in" delay={80} />{' '}
                <span className="font-serif-it hero-accent">{GO_LIVE_DAYS} days</span>.
              </h1>

              <p className="lede max-w-xl mb-10 anim-fade-up" style={{ animationDelay: '0.2s' }}>
                Take orders at the counter, at the table by QR, and through your own branded app — with
                stock, sales, and loyalty in one system. No commission on any order.
              </p>

              <div
                className="cta-row flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 anim-fade-up"
                style={{ animationDelay: '0.3s' }}
              >
                <Magnetic>
                  <a
                    href={whatsappLink(DEMO_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-ink"
                  >
                    Book a free 15-min demo
                    <ArrowUpRight size={15} strokeWidth={1.75} />
                  </a>
                </Magnetic>
                <a href="#pricing" className="link-arrow w-fit">
                  See pricing
                </a>
              </div>

              <ul className="hero-facts anim-fade-up" style={{ animationDelay: '0.42s' }}>
                <li>From {formatPKR(STARTING)}/month</li>
                <li>Runs on your own tablet or PC</li>
                <li>Menu import &amp; training included</li>
              </ul>
            </div>

            <div className="lg:col-span-5 anim-fade-up" style={{ animationDelay: '0.25s' }}>
              <OrderBoard />
            </div>
          </div>
        </section>

        {/* ── Proof ── */}
        <section className="border-b hairline">
          <div className={`${WRAP} py-10 md:py-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10`}>
            <Reveal>
              <div className="proof">
                <p className="proof-num">
                  <AnimatedNumber value={2} startOnView duration={1200} /> months
                </p>
                <p className="body !text-[14px]">
                  From launch to profitable for <span style={{ color: 'var(--text-1)' }}>AmeerGlobal</span>, ahead
                  of their own projections.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="proof">
                <p className="proof-num">
                  <AnimatedNumber value={0} startOnView />%
                </p>
                <p className="body !text-[14px]">
                  Commission on orders through your own app and QR menu. The customer and the full bill stay yours.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="proof">
                <p className="proof-num">
                  <AnimatedNumber value={GO_LIVE_DAYS} startOnView duration={1200} /> days
                </p>
                <p className="body !text-[14px]">
                  From demo to taking live orders — or your first month is on us.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Commission calculator ── */}
        <section className="border-b hairline">
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead
                label="The Commission Problem"
                title={
                  <>
                    See what delivery apps <span className="font-serif-it">really</span> cost you.
                  </>
                }
                note="Your regulars already know your name. Every order they place through a marketplace still costs you a cut."
              />
            </Reveal>
            <Reveal delay={80}>
              <CommissionCalc />
            </Reveal>
          </div>
        </section>

        {/* ── What you get ── */}
        <section className="border-b hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead
                label="One System"
                title="Everything the restaurant runs on, sharing one menu."
                note="An order from the app, a table, or the counter lands in the same place, deducts the same stock, and shows up in the same numbers."
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RESTAURANT_FEATURES.map((f, i) => (
                <Reveal key={f.id} delay={i * 60}>
                  <Spotlight className="feature h-full">
                    <span className="numeral block mb-8">0{i + 1}</span>
                    <h3 className="text-[21px] font-normal tracking-[-0.025em] mb-2">{f.name}</h3>
                    <p className="body mb-7">{f.line}</p>
                    <ul className="flex flex-col gap-2.5">
                      {f.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-[13.5px] font-light" style={{ color: 'var(--text-2)' }}>
                          <Check size={14} strokeWidth={2} className="mt-[3px] flex-shrink-0 feature-check" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </Spotlight>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="border-b hairline scroll-mt-24">
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead
                label="Pricing"
                title={
                  <>
                    One setup fee. One <span className="font-serif-it">monthly</span> plan.
                  </>
                }
                note="No commission, no per-order fees, no surprises. Prices in Pakistani rupees; message us for USD pricing outside Pakistan."
              />
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
              {PLANS.map((plan, i) => {
                const from = 'from' in plan && plan.from;
                return (
                  <Reveal key={plan.id} delay={i * 80} className="h-full">
                    <div className={`plan h-full ${plan.featured ? 'is-featured' : ''}`}>
                      {plan.featured && <span className="plan-badge">Most restaurants pick this</span>}
                      <p className="eyebrow mb-3">{plan.name}</p>
                      <p className="text-[14px] font-light mb-8" style={{ color: 'var(--text-2)' }}>{plan.for}</p>

                      <p className="plan-price">
                        {from && <span className="plan-from">from </span>}
                        {formatPKR(plan.monthly)}
                        <span className="plan-per">/month</span>
                      </p>
                      <p className="text-[13px] font-light mb-8" style={{ color: 'var(--text-3)' }}>
                        + {from ? 'from ' : ''}{formatPKR(plan.setup)} one-time setup
                      </p>

                      <ul className="flex flex-col gap-3 mb-10">
                        {plan.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-[14px] font-light">
                            <Check size={15} strokeWidth={2} className="mt-[3px] flex-shrink-0 feature-check" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={whatsappLink(`${DEMO_MESSAGE} I'm interested in the ${plan.name} plan.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn-pill mt-auto w-full ${plan.featured ? 'btn-ink' : 'btn-paper'}`}
                      >
                        Book a demo
                      </a>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={120}>
              <ul className="plan-terms">
                {PLAN_TERMS.map((t) => (
                  <li key={t}>
                    <Check size={14} strokeWidth={2} className="feature-check" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Go live ── */}
        <section className="border-b hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead
                label="How You Go Live"
                title={
                  <>
                    From first call to first order in <span className="font-serif-it">two weeks</span>.
                  </>
                }
                note="You keep running the restaurant. We do the setup, then stay with your staff until it is second nature."
              />
            </Reveal>
            <GoLiveTimeline />
          </div>
        </section>

        {/* ── Work ── */}
        <section className="border-b hairline">
          <div className={`${WRAP} py-16 md:py-28`}>
            <Reveal>
              <SectionHead
                label="Proof"
                title="Systems in use today."
                note="Every one of these is live and running a real business."
                link={{ href: '/work', text: 'View all work' }}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WORK.map((cs, i) => {
                const lead = i === 0;
                return (
                  <Reveal key={cs.name} delay={i * 70} className={lead ? 'md:col-span-2' : ''}>
                    <a
                      href={cs.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`work-card group ${lead ? 'is-lead' : ''}`}
                    >
                      <div className="flex items-center justify-between mb-8">
                        <span className="eyebrow">{cs.sector}</span>
                        <span className="eyebrow">{cs.year}</span>
                      </div>

                      <div className={lead ? 'grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10' : ''}>
                        <div className={lead ? 'md:col-span-7' : ''}>
                          <h3 className={`${lead ? 'text-[28px] md:text-[34px]' : 'text-[24px]'} font-normal tracking-[-0.03em] mb-4`}>
                            {cs.name}
                          </h3>
                          <p className="body mb-6">{cs.delivered}</p>
                        </div>
                        <div className={lead ? 'md:col-span-5 md:border-l hairline md:pl-10 flex flex-col justify-center' : ''}>
                          <p
                            className={lead ? 'text-[22px] md:text-[26px] leading-[1.25] tracking-[-0.025em] font-light' : 'text-[14px] leading-relaxed'}
                            style={{ color: 'var(--text-1)' }}
                          >
                            {cs.outcome}
                          </p>
                        </div>
                      </div>

                      <span className="flex items-center justify-between border-t hairline pt-6 mt-8">
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
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Not a restaurant ── */}
        <section className="border-b hairline">
          <div className={`${WRAP} py-14 md:py-20`}>
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-10">
                <p className="eyebrow">Not a restaurant?</p>
                <p className="body !text-[14px] max-w-md md:text-right">
                  We also build stores, apps, and internal systems for retail, trading, and service businesses.{' '}
                  <Link href="/contact" className="ul-draw" style={{ color: 'var(--text-1)' }}>Tell us what you need</Link>.
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
              {CUSTOM_BUILDS.map((item, i) => (
                <Reveal key={item.name} delay={i * 55}>
                  <div className="border-t pt-5" style={{ borderColor: 'var(--line-2)' }}>
                    <h3 className="text-[16px] font-normal tracking-[-0.02em] mb-2">{item.name}</h3>
                    <p className="body !text-[13.5px]">{item.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-b hairline">
          <div className={`${WRAP} py-16 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16`}>
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-6">Questions</p>
                <h2 className="display-md2 mb-6">What owners ask before the demo.</h2>
                <a
                  href={whatsappLink(CHAT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow"
                >
                  Ask us on WhatsApp
                  <ArrowUpRight size={15} strokeWidth={1.6} />
                </a>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={80}>
                <Faq />
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
