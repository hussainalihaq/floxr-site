import Link from 'next/link';
import Navbar from '@/components/Navbar';

const STATS = [
  { value: '50+', label: 'Projects Shipped' },
  { value: '98%', label: 'Client Retention' },
  { value: '15+', label: 'Engineers' },
  { value: '4', label: 'Countries' },
];

const PRINCIPLES = [
  {
    icon: 'target',
    title: 'Outcome-Obsessed',
    desc: "We don\u2019t bill hours. We deliver results.",
  },
  {
    icon: 'groups',
    title: 'Senior-Only Teams',
    desc: "No juniors learning on your project. Every engineer has 5+ years experience.",
  },
  {
    icon: 'design_services',
    title: 'Design-Engineering Fusion',
    desc: "Our engineers think in pixels and our designers think in systems.",
  },
  {
    icon: 'verified',
    title: 'Relentless Standards',
    desc: "If it\u2019s not exceptional, it doesn\u2019t ship.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Fixed Top Nav ─────────────────────────────────────────── */}
      <Navbar />

      <main className="min-h-screen bg-background">

        {/* ── Page Header ─────────────────────────────────────────── */}
        <section className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin pt-[180px] pb-section-gap">
          <div className="max-w-3xl">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary bg-surface-alt border border-outline-variant px-3 py-1 inline-block mb-8">
              About
            </span>
            <h1 className="font-headline-lg text-display-lg font-bold text-primary leading-tight tracking-tight mb-stack-lg">
              We are Digital Architects
            </h1>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed max-w-2xl border-l-2 border-primary pl-6">
              FLOXR is a digital architecture firm. We audit what exists, architect what should,
              and build what moves businesses forward. No templates. No shortcuts. Just precision engineering.
            </p>
          </div>
        </section>

        {/* ── Stats Row ───────────────────────────────────────────── */}
        <section className="border-y border-outline-variant">
          <div className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin py-section-gap">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className="border border-outline-variant bg-surface-container-lowest p-stack-lg flex flex-col items-center text-center hover:border-primary transition-colors duration-300"
                >
                  <span className="font-headline-lg text-[clamp(40px,6vw,64px)] font-bold text-primary leading-none mb-3">
                    {stat.value}
                  </span>
                  <span className="font-label-mono text-label-mono text-secondary uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Principles ──────────────────────────────────────── */}
        <section className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin py-section-gap">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">
              Our Principles
            </span>
            <div className="flex-1 h-[1px] bg-outline-variant" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                className="group border border-outline-variant bg-surface-container-lowest p-stack-lg hover:border-primary transition-colors duration-300 flex flex-col gap-6"
              >
                <div className="w-14 h-14 bg-surface-alt border border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary text-[28px]">
                    {p.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-lg text-headline-md font-bold text-primary mb-3">
                    {p.title}
                  </h3>
                  <p className="font-body-md text-body-md text-secondary leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── The Team Section ────────────────────────────────────── */}
        <section className="relative overflow-hidden border-y border-outline-variant">
          {/* Subtle Grid Pattern Background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin py-section-gap">
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary bg-surface-alt border border-outline-variant px-3 py-1 inline-block mb-8">
                The Team
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-primary leading-tight mb-stack-lg">
                Built by Operators
              </h2>
              <p className="font-body-lg text-body-lg text-secondary leading-relaxed max-w-xl">
                Every member of our team has built and scaled their own products.
                We understand the pressure because we have lived it.
              </p>

              {/* Decorative team silhouette row */}
              <div className="mt-16 flex gap-6 items-end justify-center">
                {[48, 56, 64, 56, 48].map((h, i) => (
                  <div
                    key={i}
                    className="bg-surface-alt border border-outline-variant rounded-sm"
                    style={{ width: '48px', height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <section className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin py-section-gap">
          <div className="border border-outline-variant bg-surface-container-lowest p-stack-lg md:p-16 flex flex-col items-center text-center">
            <h2 className="font-headline-lg text-headline-lg font-bold text-primary leading-tight mb-stack-md">
              Ready to build something exceptional?
            </h2>
            <p className="font-body-md text-body-md text-secondary mb-10 max-w-md leading-relaxed">
              Let&apos;s talk about your next project. No sales pitch, just a real conversation with engineers.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-primary text-on-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:bg-surface-tint transition-colors duration-300"
            >
              <span>Start a Conversation</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="bg-primary w-full mt-0">
        <div className="grid grid-cols-12 gap-gutter px-grid-margin-mobile md:px-grid-margin py-section-gap max-w-[1440px] mx-auto text-on-primary">
          <div className="col-span-12 md:col-span-6 mb-stack-lg md:mb-0">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-10 md:h-12 w-auto object-contain object-left mb-stack-sm brightness-0 invert" />
            <p className="font-body-lg text-body-lg text-left text-on-primary/70 max-w-sm">
              © 2024 FLOXR. Digital Architecture Firm.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col md:flex-row gap-stack-lg md:justify-end">
            <div className="flex flex-col gap-4 font-body-lg text-body-lg text-left">
              <span className="font-label-mono text-label-mono text-on-primary/50 uppercase">Social</span>
              <a className="text-on-primary/70 hover:opacity-80 transition-opacity" href="#">LinkedIn</a>
              <a className="text-on-primary/70 hover:opacity-80 transition-opacity" href="#">Instagram</a>
            </div>
            <div className="flex flex-col gap-4 font-body-lg text-body-lg text-left">
              <span className="font-label-mono text-label-mono text-on-primary/50 uppercase">Legal</span>
              <Link className="text-on-primary/70 hover:opacity-80 transition-opacity" href="/contact">Contact</Link>
              <a className="text-on-primary/70 hover:opacity-80 transition-opacity" href="#">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
