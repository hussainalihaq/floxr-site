import Link from 'next/link';

const VALUES = [
  {
    icon: 'code',
    title: 'Craft Over Convention',
    desc: 'Every line of code is purpose-built.',
  },
  {
    icon: 'bolt',
    title: 'Speed Is a Feature',
    desc: 'We ship fast, iterate faster.',
  },
  {
    icon: 'shield',
    title: 'Ownership Culture',
    desc: 'Every engineer owns their domain end-to-end.',
  },
  {
    icon: 'public',
    title: 'Remote-First, Global',
    desc: 'We hire talent, not timezones.',
  },
];

const POSITIONS = [
  {
    title: 'Senior Full-Stack Engineer',
    location: 'Remote',
    type: 'Full-time',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    description:
      'Own critical product surfaces end-to-end — from database schema to pixel-perfect UI. You will architect features, ship production code daily, and mentor the next wave of engineers joining the team.',
  },
  {
    title: 'Senior Product Designer',
    location: 'Remote',
    type: 'Full-time',
    stack: ['Figma', 'Design Systems', 'Prototyping'],
    description:
      'Shape the visual language and interaction patterns across every product we build. You will lead design sprints, maintain our component library, and collaborate directly with engineering on implementation.',
  },
  {
    title: 'AI/ML Engineer',
    location: 'Remote',
    type: 'Full-time',
    stack: ['Python', 'LLMs', 'Vector DBs'],
    description:
      'Build intelligent systems that power our AI-driven products. You will design retrieval pipelines, fine-tune models, and deploy production ML services that serve thousands of users.',
  },
];

const PERKS = [
  {
    icon: 'schedule',
    title: 'Async-First',
    desc: 'Deep work over meetings. We default to written communication and protect focus time.',
  },
  {
    icon: 'trending_up',
    title: 'Competitive Equity',
    desc: 'Meaningful ownership stake so you benefit directly from the products you help build.',
  },
  {
    icon: 'school',
    title: 'Learning Budget',
    desc: '$2K/yr for courses, conferences, books — anything that makes you sharper.',
  },
  {
    icon: 'devices',
    title: 'Premium Hardware',
    desc: 'Top-spec MacBook Pro, 4K display, and any peripherals you need to do your best work.',
  },
];

export default function CareersPage() {
  return (
    <>
      {/* ── Fixed Top Nav ── */}
      <nav className="bg-background fixed top-0 w-full z-50 border-b border-primary transition-all duration-200 ease-in-out">
        <div className="flex justify-between items-center w-full px-grid-margin-mobile md:px-grid-margin py-stack-md max-w-[1440px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-8 md:h-10 w-auto" />
          </Link>
          <div className="hidden md:flex gap-gutter items-center font-body-md text-body-md uppercase tracking-widest">
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/work">Work</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/">Audit</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/">Capabilities</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/">Lab</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/contact">Contact</Link>
          </div>
          <Link href="/contact">
            <button className="bg-primary text-on-primary font-label-mono text-label-mono uppercase px-6 py-3 hover:bg-surface-tint transition-colors duration-300 hidden md:block">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <main className="min-h-screen bg-background">
        {/* ── Page Header ── */}
        <section className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin pt-[180px] pb-section-gap">
          <div className="max-w-3xl">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary bg-surface-alt border border-outline-variant px-3 py-1 inline-block mb-stack-lg">
              Careers
            </span>
            <h1 className="font-headline-lg text-display-lg font-bold text-primary leading-tight tracking-tight mb-stack-lg">
              Build What Matters
            </h1>
            <p className="font-body-md text-body-lg text-secondary max-w-2xl leading-relaxed border-l-2 border-primary pl-4">
              We are always looking for exceptional engineers, designers, and strategists who want to build products that move industries forward.
            </p>
          </div>
        </section>

        {/* ── Our Values ── */}
        <section className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin pb-section-gap">
          <div className="flex items-center gap-4 mb-stack-lg">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">Our Values</span>
            <div className="flex-1 h-[1px] bg-outline-variant" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="group border border-outline-variant hover:border-primary bg-surface-container-lowest p-stack-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-surface-alt border border-outline-variant flex items-center justify-center mb-stack-md group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary transition-colors duration-300">
                    {v.icon}
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-md font-bold text-primary mb-2">
                  {v.title}
                </h3>
                <p className="font-body-md text-body-md text-secondary leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Open Positions ── */}
        <section className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin pb-section-gap">
          <div className="flex items-center gap-4 mb-stack-lg">
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">Open Positions</span>
            <div className="flex-1 h-[1px] bg-outline-variant" />
            <span className="font-label-mono text-label-mono text-secondary">{POSITIONS.length} roles</span>
          </div>

          <div className="flex flex-col gap-gutter">
            {POSITIONS.map((pos) => (
              <div
                key={pos.title}
                className="group border border-outline-variant hover:border-primary bg-surface-container-lowest p-stack-lg transition-all duration-300"
              >
                {/* Top row: title + meta */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-stack-md">
                  <div>
                    <h3 className="font-headline-lg text-headline-md font-bold text-primary mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      {pos.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-label-mono text-label-mono text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {pos.location}
                      </span>
                      <span className="text-outline-variant">·</span>
                      <span className="font-label-mono text-label-mono text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">work</span>
                        {pos.type}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-mono text-label-mono uppercase px-6 py-3 hover:bg-surface-tint transition-colors duration-300 shrink-0 w-fit"
                  >
                    Apply
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>

                {/* Description */}
                <p className="font-body-md text-body-md text-secondary leading-relaxed mb-stack-md max-w-3xl">
                  {pos.description}
                </p>

                {/* Stack tags */}
                <div className="flex gap-2 flex-wrap">
                  {pos.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-label-mono text-label-mono text-primary bg-surface-alt border border-outline-variant px-3 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Perks ── */}
        <section className="border-y border-outline-variant">
          <div className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin py-section-gap">
            <div className="flex items-center gap-4 mb-stack-lg">
              <span className="font-label-mono text-label-mono uppercase tracking-widest text-secondary">Perks &amp; Benefits</span>
              <div className="flex-1 h-[1px] bg-outline-variant" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {PERKS.map((perk) => (
                <div key={perk.title} className="flex flex-col gap-3">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary text-[20px]">
                      {perk.icon}
                    </span>
                  </div>
                  <h4 className="font-headline-lg text-headline-md font-bold text-primary">
                    {perk.title}
                  </h4>
                  <p className="font-body-md text-body-md text-secondary leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA: Don't see your role? ── */}
        <section className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin py-section-gap">
          <div className="border border-outline-variant bg-surface-container-lowest p-stack-lg md:p-[4rem] flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-surface-alt border border-outline-variant flex items-center justify-center mb-stack-md">
              <span className="material-symbols-outlined text-primary text-[28px]">mail</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-bold text-primary mb-stack-md">
              Don&apos;t see your role?
            </h2>
            <p className="font-body-md text-body-lg text-secondary max-w-md leading-relaxed mb-stack-lg">
              We&apos;re always looking for exceptional people. Send us your portfolio and tell us what you&apos;re great at — we&apos;ll find a way to work together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:bg-surface-tint transition-colors duration-300"
            >
              Get in Touch
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-primary w-full">
        <div className="grid grid-cols-12 gap-gutter px-grid-margin-mobile md:px-grid-margin py-section-gap max-w-[1440px] mx-auto text-on-primary">
          <div className="col-span-12 md:col-span-6 mb-stack-lg md:mb-0">
            <img src="/floxr-logo-dark.svg" alt="FLOXR" className="h-10 w-auto object-contain object-left mb-stack-sm" />
            <p className="font-body-lg text-body-lg text-on-primary/70 max-w-sm">
              © 2024 FLOXR. Digital Architecture Firm.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col md:flex-row gap-stack-lg md:justify-end">
            <div className="flex flex-col gap-4 font-body-lg text-body-lg">
              <span className="font-label-mono text-label-mono text-on-primary/50 uppercase">Social</span>
              <a className="text-on-primary/70 hover:opacity-80 transition-opacity" href="#">LinkedIn</a>
              <a className="text-on-primary/70 hover:opacity-80 transition-opacity" href="#">Instagram</a>
            </div>
            <div className="flex flex-col gap-4 font-body-lg text-body-lg">
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
