import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/marketing/CustomCursor';
import SiteFooter from '@/components/marketing/SiteFooter';
import Reveal from '@/components/marketing/Reveal';
import { CLIENT_LINE, COMPANY_LINE, ENGAGEMENT_TERMS, PROCESS, SERVICES } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'Capabilities',
  description: COMPANY_LINE,
};

const STACK = ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind', 'AWS', 'Vercel', 'Docker'];

const STANDARDS = [
  {
    title: 'Every project ships with tests and CI/CD',
    body: 'Not just code. Automated checks run on every change, and deployment is a pipeline, not a manual step.',
  },
  {
    title: 'Handover documentation is a deliverable',
    body: 'Architecture, environment variables, and deployment steps are written down. Your next developer can pick it up without calling us.',
  },
  {
    title: 'Performance budgets are set before build',
    body: 'Page weight and load targets are agreed in the blueprint, then measured against real devices before launch.',
  },
  {
    title: 'Access control and data handling reviewed',
    body: 'Encryption in transit, role-based access where the product needs it, and dependencies kept current.',
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="mkt min-h-screen">
      <CustomCursor />
      <Navbar />

      <main className="pt-[92px] md:pt-[104px]">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_65%_15%,#000_10%,transparent_72%)] pointer-events-none" />

          <div className="max-w-[1180px] mx-auto px-6 md:px-8 pt-12 md:pt-24 pb-16 md:pb-20 relative z-10">
            <p className="eyebrow text-[var(--signal)] mb-6 anim-fade-up">Capabilities</p>
            <h1 className="display-xl max-w-4xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              What we build, and{' '}
              <span className="font-serif-it font-normal">how</span>.
            </h1>
            <p
              className="text-[18px] md:text-[20px] leading-relaxed max-w-2xl anim-fade-up"
              style={{ color: 'var(--text-2)', animationDelay: '0.2s' }}
            >
              {CLIENT_LINE}
            </p>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-24">
            <Reveal>
              <p className="eyebrow text-[var(--signal)] mb-5">01 — Services</p>
              <h2 className="display-lg2 mb-14">Four categories of work.</h2>
            </Reveal>

            <div className="flex flex-col">
              {SERVICES.map((service, i) => (
                <Reveal key={service.id} delay={i * 60}>
                  <div className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-12 border-t hairline">
                    <div className="md:col-span-2">
                      <span className="numeral">
                        {service.index}
                      </span>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="display-md2 mb-4">{service.name}</h3>
                      <p className="text-[16px] leading-relaxed max-w-sm mb-5" style={{ color: 'var(--text-2)' }}>
                        {service.summary}
                      </p>
                      <span className="eyebrow border hairline rounded-full px-4 py-2 inline-block" style={{ color: 'var(--text-2)' }}>
                        {service.timeline}
                      </span>
                    </div>
                    <div className="md:col-span-6">
                      <ul className="space-y-4">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-4 text-[15px] pb-4 border-b hairline last:border-b-0">
                            <Check size={16} strokeWidth={2.25} className="mt-[3px] text-[var(--signal)] flex-shrink-0" />
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

        {/* ── Process ── */}
        <section className="border-t hairline">
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-24">
            <Reveal>
              <p className="eyebrow text-[var(--signal)] mb-5">02 — Method</p>
              <h2 className="display-lg2 mb-14">Audit. Architect. Build.</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROCESS.map((step, i) => (
                <Reveal key={step.index} delay={i * 70}>
                  <div className="plane p-8 md:p-10 h-full flex flex-col">
                    <span className="numeral mb-8">{step.index}</span>
                    <h3 className="display-md2 mb-4">{step.name}</h3>
                    <p className="text-[15px] leading-relaxed mb-7" style={{ color: 'var(--text-2)' }}>
                      {step.summary}
                    </p>
                    <ul className="space-y-3.5 border-t hairline pt-6 mt-auto">
                      {step.detail.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[14px]">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[var(--signal)] flex-shrink-0" />
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

        {/* ── Standards ── */}
        <section
          className="border-t hairline relative overflow-hidden"
          style={{ backgroundColor: 'var(--plane-1)', color: 'var(--text-1)' }}
        >
          <div className="absolute inset-0 grid-lines-dark opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_85%_15%,#000_10%,transparent_72%)] pointer-events-none" />
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-24 relative z-10">
            <Reveal>
              <p className="eyebrow text-[var(--signal)] mb-5">03 — Standards</p>
              <h2 className="display-lg2 mb-14 max-w-2xl">What ships with every engagement.</h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {STANDARDS.map((standard, i) => (
                <Reveal key={standard.title} delay={i * 70}>
                  <div className="border-t pt-8" style={{ borderColor: 'var(--line-1)' }}>
                    <h3 className="text-[19px] font-light tracking-[-0.03em] mb-3">{standard.title}</h3>
                    <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      {standard.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Engagement terms + stack ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-24">
            <Reveal>
              <p className="eyebrow text-[var(--signal)] mb-5">04 — Engagement</p>
              <h2 className="display-lg2 mb-14">Terms and tools.</h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {ENGAGEMENT_TERMS.map((term, i) => (
                <Reveal key={term.label} delay={i * 60}>
                  <div className="plane p-7 h-full">
                    <p className="eyebrow mb-4" style={{ color: 'var(--text-2)' }}>{term.label}</p>
                    <p className="text-[22px] font-light tracking-[-0.03em] mb-3">{term.value}</p>
                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text-2)' }}>{term.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="border-t hairline pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                  <p className="eyebrow mb-3" style={{ color: 'var(--text-2)' }}>Tools We Build With</p>
                  <p className="text-[15px] leading-relaxed max-w-sm" style={{ color: 'var(--text-2)' }}>
                    Chosen for maintainability, not novelty — so your system stays supportable long
                    after handover.
                  </p>
                </div>
                <div className="lg:col-span-8 flex flex-wrap gap-3 items-start content-start">
                  {STACK.map((tech) => (
                    <span
                      key={tech}
                      className="eyebrow plane border-0 rounded-full px-5 py-3 hover:border-[var(--line-2)] transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t hairline">
          <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-14 md:py-24">
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <h2 className="display-lg2 mb-4">Know what you need building?</h2>
                  <p className="text-[16px] leading-relaxed max-w-lg" style={{ color: 'var(--text-2)' }}>
                    Send us the brief and we&apos;ll come back with scope, timeline, and a fixed
                    price.
                  </p>
                </div>
                <Link href="/contact" className="btn-pill btn-ink flex-shrink-0">
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
