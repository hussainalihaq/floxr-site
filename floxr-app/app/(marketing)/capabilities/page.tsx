import Link from 'next/link';
import { ArrowRight, Blocks, Gauge, ShieldCheck, Activity } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';

const PILLARS = [
  {
    index: '01',
    title: 'Audit',
    desc: 'Deep analytical review of existing infrastructure. We identify bottlenecks, technical debt, and opportunities for architectural optimization before writing a single line of code.',
  },
  {
    index: '02',
    title: 'Architect',
    desc: 'System design phase. We construct detailed technical blueprints, select optimal tech stacks, and define data models to ensure a robust, scalable foundation.',
  },
  {
    index: '03',
    title: 'Build',
    desc: 'Precision engineering. Agile execution of the architectural blueprint utilizing modern frameworks, rigorous testing protocols, and CI/CD pipelines.',
  },
];

const STACK = ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind', 'AWS', 'Docker'];

const SCALE_PRINCIPLES = [
  {
    icon: Blocks,
    title: 'Modularity',
    desc: 'Component-driven architecture allowing independent scaling and updates.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    desc: 'Strict budgets on payload sizes and core web vitals optimization.',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    desc: 'Sensible defaults done properly: encryption, access controls, and kept-up-to-date dependencies.',
  },
  {
    icon: Activity,
    title: 'Observability',
    desc: 'Comprehensive logging, tracing, and real-time metrics dashboards.',
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="mkt min-h-screen">
      <Navbar />

      <main className="pt-[72px] md:pt-[80px]">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_10%,#000_10%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 relative">
            <p className="eyebrow text-[var(--color-rust)] mb-6 anim-fade-up">Capabilities</p>
            <h1 className="display-xl max-w-4xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              Websites, platforms &amp; <span className="font-serif-it font-normal">dashboards</span>.
            </h1>
            <p
              className="text-[18px] md:text-[20px] leading-relaxed max-w-2xl anim-fade-up"
              style={{ color: 'var(--color-mist)', animationDelay: '0.2s' }}
            >
              That&apos;s the core of what we build — business websites, custom web platforms,
              internal dashboards, and practical AI tools. Every project runs through the same
              three-step framework: Audit, Architect, Build.
            </p>
          </div>
        </section>

        {/* ── Framework pillars ── */}
        <section className="border-t hairline">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="group rounded-2xl border hairline bg-white p-8 md:p-10 hover:shadow-[0_16px_48px_rgba(18,18,20,0.07)] transition-shadow duration-500 flex flex-col"
                >
                  <span className="text-[56px] md:text-[72px] font-bold tracking-tight leading-none mb-8 text-[var(--color-line)] group-hover:text-[var(--color-rust)] transition-colors duration-500">
                    {pillar.index}
                  </span>
                  <h3 className="display-md2 mb-4">{pillar.title}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tech stack ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--color-paper-2)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <p className="eyebrow text-[var(--color-rust)] mb-5">Instruments</p>
                <h2 className="display-lg2 mb-4">Tech Stack</h2>
                <p className="text-[16px] leading-relaxed max-w-md" style={{ color: 'var(--color-mist)' }}>
                  Our tools of choice for high-performance enterprise applications.
                </p>
              </div>
              <div className="lg:col-span-7 flex flex-wrap gap-3 items-start content-start">
                {STACK.map((tech) => (
                  <span
                    key={tech}
                    className="eyebrow bg-white border hairline rounded-full px-6 py-3.5 hover:border-[var(--color-ink)] transition-colors duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Built for scale ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 grid-lines-dark opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_90%_10%,#000_10%,transparent_70%)] pointer-events-none" />
            <div className="relative">
              <p className="eyebrow text-[var(--color-rust-lt)] mb-5">Standards</p>
              <h2 className="display-lg2 mb-14">Built for Scale</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
                {SCALE_PRINCIPLES.map((principle, i) => (
                  <div key={principle.title} className="border-t pt-8" style={{ borderColor: 'var(--color-line-dark)' }}>
                    <div className="flex items-center justify-between mb-6">
                      <principle.icon size={24} strokeWidth={1.5} className="text-[var(--color-rust-lt)]" />
                      <span className="eyebrow" style={{ color: 'var(--color-mist-dark)' }}>0{i + 1}</span>
                    </div>
                    <h4 className="text-[20px] font-bold tracking-tight mb-3">{principle.title}</h4>
                    <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist-dark)' }}>
                      {principle.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-8" style={{ borderColor: 'var(--color-line-dark)' }}>
                <p className="text-[17px] max-w-lg" style={{ color: 'var(--color-mist-dark)' }}>
                  Not sure where your platform stands? Start with a rigorous, objective diagnostic.
                </p>
                <Link href="/audit" className="btn-pill btn-paper flex-shrink-0">
                  Request an Audit
                  <ArrowRight size={14} strokeWidth={2.25} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
