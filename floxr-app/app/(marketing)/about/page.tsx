import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/marketing/CustomCursor';
import SiteFooter from '@/components/marketing/SiteFooter';
import Reveal from '@/components/marketing/Reveal';
import {
  CLIENT_LINE,
  COMPANY_LINE,
  ENGAGEMENT_TERMS,
  FOUNDING_STORY,
  SERVICES,
} from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'About',
  description: COMPANY_LINE,
};

const POSITIONS = [
  {
    title: 'Fixed scope, fixed price',
    body: 'Hourly billing rewards slow work. We agree the scope and the price in writing before anything is built, so the incentive is to deliver — not to extend.',
  },
  {
    title: 'A written blueprint before code',
    body: 'Most projects fail commercially before they fail technically. Architecture and scope are documented and approved first, which is why timelines hold.',
  },
  {
    title: 'Direct access, start to finish',
    body: 'You speak to the people building your product. No account managers relaying requirements, no context lost between the brief and the build.',
  },
  {
    title: 'Systems you can operate without us',
    body: 'Every engagement ends with a handover: code, deployment, and documentation. You should never be locked in to the vendor who built it.',
  },
];

export default function AboutPage() {
  return (
    <div className="mkt min-h-screen">
      <CustomCursor />
      <Navbar />

      <main className="pt-[92px] md:pt-[104px]">
        {/* ── Header ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_65%_15%,#000_10%,transparent_72%)] pointer-events-none" />

          <div className="max-w-[1180px] mx-auto px-6 md:px-8 pt-12 md:pt-24 pb-16 md:pb-20 relative z-10">
            <p className="eyebrow text-[var(--signal)] mb-6 anim-fade-up">About</p>
            <h1 className="display-xl max-w-4xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              A solutions company with a{' '}
              <span className="font-serif-it font-normal">method</span>.
            </h1>
            <p
              className="text-[18px] md:text-[20px] leading-relaxed max-w-2xl anim-fade-up"
              style={{ color: 'var(--text-2)', animationDelay: '0.2s' }}
            >
              {COMPANY_LINE}
            </p>
          </div>
        </section>

        {/* ── Our Story ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <p className="eyebrow text-[var(--signal)] mb-5">01 — Our Story</p>
                <h2 className="display-lg2">Why Floxr exists</h2>
              </Reveal>
              <Reveal className="lg:col-span-8" delay={80}>
                <p className="text-[19px] md:text-[22px] leading-relaxed font-medium mb-8">
                  {FOUNDING_STORY}
                </p>
                <p className="text-[16px] leading-relaxed max-w-2xl" style={{ color: 'var(--text-2)' }}>
                  {CLIENT_LINE} That focus is deliberate: it means the patterns we have already
                  solved — operations dashboards, document workflows, client portals — are the ones
                  our clients need next.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Positions ── */}
        <section className="border-t hairline">
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-24">
            <Reveal>
              <p className="eyebrow text-[var(--signal)] mb-5">02 — How We Operate</p>
              <h2 className="display-lg2 mb-14 max-w-2xl">
                Four positions we don&apos;t{' '}
                <span className="font-serif-it font-normal">compromise</span> on.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {POSITIONS.map((position, i) => (
                <Reveal key={position.title} delay={i * 70}>
                  <div className="plane p-8 md:p-10 h-full">
                    <span className="numeral block mb-8">0{i + 1}</span>
                    <h3 className="display-md2 mb-4">{position.title}</h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      {position.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── What we build (mirrors homepage + capabilities) ── */}
        <section
          className="border-t hairline relative overflow-hidden"
          style={{ backgroundColor: 'var(--plane-1)', color: 'var(--text-1)' }}
        >
          <div className="absolute inset-0 grid-lines-dark opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_85%_20%,#000_10%,transparent_72%)] pointer-events-none" />
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-24 relative z-10">
            <Reveal>
              <p className="eyebrow text-[var(--signal)] mb-5">03 — What We Build</p>
              <h2 className="display-lg2 mb-14">Four categories of work.</h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
              {SERVICES.map((service, i) => (
                <Reveal key={service.id} delay={i * 70}>
                  <div className="border-t pt-8" style={{ borderColor: 'var(--line-1)' }}>
                    <p className="eyebrow mb-4" style={{ color: 'var(--text-2)' }}>{service.index}</p>
                    <h3 className="text-[20px] font-light tracking-[-0.03em] mb-3">{service.name}</h3>
                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      {service.summary}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div
                className="mt-16 pt-10 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-8"
                style={{ borderColor: 'var(--line-1)' }}
              >
                <p className="text-[17px] max-w-lg" style={{ color: 'var(--text-2)' }}>
                  Every engagement runs on the same terms: {ENGAGEMENT_TERMS.map((t) => t.value.toLowerCase()).join(', ')}.
                </p>
                <Link href="/capabilities" className="btn-pill btn-paper flex-shrink-0">
                  See Capabilities
                  <ArrowUpRight size={14} strokeWidth={2.25} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t hairline">
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-24">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
                <h2 className="display-lg2 mb-5">
                  Ready to scope something{' '}
                  <span className="font-serif-it font-normal">properly</span>?
                </h2>
                <p className="text-[16px] leading-relaxed max-w-md mb-10" style={{ color: 'var(--text-2)' }}>
                  Tell us what you need. We&apos;ll come back with scope, timeline, and a fixed
                  price — no sales pitch, just a real conversation about what you need.
                </p>
                <Link href="/contact" className="btn-pill btn-ink">
                  Start a Conversation
                  <ArrowRight size={14} strokeWidth={2.25} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
