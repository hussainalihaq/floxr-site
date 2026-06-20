'use client';

import Link from 'next/link';

const FEATURED_PROJECTS = [
  {
    name: 'AmeerGlobal',
    category: 'Study Abroad & Immigration Consultancy',
    tagline: 'End-to-end immigration services platform with automated workflows and client portal.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    year: '2024',
    url: 'https://ameerglobal.ca',
    domain: 'ameerglobal.ca',
  },
  {
    name: 'Juriq',
    category: 'AI Legal Research',
    tagline: 'AI-powered legal research assistant that cuts case prep time by 80%.',
    stack: ['Next.js', 'GPT-4', 'Supabase'],
    year: '2024',
    url: 'https://juriq.app',
    domain: 'juriq.app',
  },
];

const OTHER_PROJECTS = [
  {
    name: 'Datafly Dashboard',
    category: 'B2B SaaS',
    tagline: 'Real-time business intelligence.',
    stack: ['React', 'Go', 'PostgreSQL'],
    year: '2024',
  },
  {
    name: 'Fintech Mobile',
    category: 'Finance',
    tagline: 'Peer-to-peer payments.',
    stack: ['React Native', 'Stripe', 'Firebase'],
    year: '2023',
  },
  {
    name: 'E-Commerce Rebuild',
    category: 'Retail',
    tagline: 'Full platform migration.',
    stack: ['Next.js', 'Shopify', 'Algolia'],
    year: '2023',
  },
  {
    name: 'Healthcare Portal',
    category: 'HealthTech',
    tagline: 'Patient management.',
    stack: ['React', 'FHIR', 'AWS'],
    year: '2023',
  },
];

export default function WorkPage() {
  return (
    <>
      {/* ── Top Nav ── */}
      <nav className="bg-background fixed top-0 w-full z-50 border-b border-primary transition-all duration-200 ease-in-out">
        <div className="flex justify-between items-center w-full px-grid-margin-mobile md:px-grid-margin py-stack-md max-w-[1440px] mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-8 md:h-10 w-auto" />
          </Link>
          <div className="hidden md:flex gap-gutter items-center font-body-md text-body-md uppercase tracking-widest">
            <Link className="text-primary font-semibold" href="/work">Work</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/">Audit</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/">Capabilities</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/">Lab</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/contact">Contact</Link>
          </div>
          <Link
            href="/contact"
            className="bg-primary text-on-primary font-label-mono text-label-mono uppercase px-6 py-3 hover:bg-surface-tint transition-colors duration-300 hidden md:block"
          >
            Get Started
          </Link>
          <button className="md:hidden text-primary">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin bg-background min-h-screen">
        {/* ── Page Header ── */}
        <section className="pt-[10rem] pb-section-gap flex flex-col items-start">
          <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest mb-stack-md">
            Portfolio
          </span>
          <h1 className="font-headline-lg text-display-lg text-primary max-w-3xl mb-stack-md leading-tight">
            Selected Transformations
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl border-l border-primary pl-4">
            A curated collection of projects where we diagnosed, designed, and delivered.
          </p>
        </section>

        {/* ── Featured Projects ── */}
        <section className="pb-section-gap border-t border-secondary-container pt-stack-lg">
          <div className="mb-stack-lg flex justify-between items-end">
            <h2 className="font-headline-lg text-headline-lg text-primary">Featured Work</h2>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest hidden md:block">
              {FEATURED_PROJECTS.length} Projects
            </span>
          </div>

          <div className="flex flex-col gap-gutter">
            {FEATURED_PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-outline-variant bg-surface-container-lowest hover:border-primary transition-all duration-300"
              >
                {/* Browser Mockup Visual */}
                <div className="relative w-full h-[320px] md:h-[420px] bg-primary overflow-hidden">
                  {/* Grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />

                  {/* Browser chrome */}
                  <div className="absolute top-6 left-6 right-6 md:top-10 md:left-10 md:right-10 bg-on-background/80 rounded-t-lg overflow-hidden border border-white/10">
                    {/* Title bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-on-background border-b border-white/10">
                      <span className="w-3 h-3 rounded-full bg-red-500/60" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <span className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="ml-4 font-label-mono text-label-mono text-white/40">{project.domain}</span>
                    </div>
                    {/* Content area */}
                    <div className="flex items-center justify-center h-[200px] md:h-[300px] bg-on-background/60">
                      <span className="font-headline-lg text-[clamp(2rem,5vw,4rem)] font-bold text-white/90 tracking-tight group-hover:scale-105 transition-transform duration-500">
                        {project.domain}
                      </span>
                    </div>
                  </div>

                  {/* External link badge */}
                  <div className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <span className="material-symbols-outlined text-white text-lg">arrow_outward</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-stack-lg md:p-stack-lg flex flex-col md:flex-row md:items-center md:justify-between gap-stack-md">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest">
                        {project.category}
                      </span>
                      <span className="w-1 h-1 bg-secondary rounded-full" />
                      <span className="font-label-mono text-label-mono text-secondary">{project.year}</span>
                    </div>
                    <h3 className="font-headline-lg text-headline-lg text-primary mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      {project.name}
                    </h3>
                    <p className="font-body-md text-body-md text-secondary max-w-lg">
                      {project.tagline}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap flex-shrink-0">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-surface-alt text-primary font-label-mono text-label-mono border border-outline-variant"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Other Projects Grid ── */}
        <section className="pb-section-gap border-t border-secondary-container pt-stack-lg">
          <div className="mb-stack-lg flex justify-between items-end">
            <h2 className="font-headline-lg text-headline-lg text-primary">More Projects</h2>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest hidden md:block">
              Archive
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {OTHER_PROJECTS.map((project) => (
              <div
                key={project.name}
                className="group border border-outline-variant p-stack-lg bg-surface-container-lowest hover:bg-surface-alt hover:border-primary transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-stack-md">
                  <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest">
                    {project.category}
                  </span>
                  <span className="w-1 h-1 bg-secondary rounded-full" />
                  <span className="font-label-mono text-label-mono text-secondary">{project.year}</span>
                </div>

                <h3 className="font-headline-md text-headline-md text-primary mb-2 group-hover:translate-x-1 transition-transform duration-300">
                  {project.name}
                </h3>

                <p className="font-body-md text-body-md text-secondary mb-stack-lg">
                  {project.tagline}
                </p>

                <div className="flex gap-2 flex-wrap border-t border-outline-variant pt-stack-md">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-surface-alt text-primary font-label-mono text-label-mono border border-outline-variant"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-section-gap border-t border-secondary-container">
          <div className="bg-primary text-on-primary p-grid-margin-mobile md:p-grid-margin flex flex-col md:flex-row items-center justify-between gap-stack-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg mb-stack-sm">Have a project in mind?</h2>
              <p className="font-body-lg text-body-lg text-on-primary/70 max-w-md">
                Tell us what you&apos;re building. We&apos;ll show you how we&apos;d architect it.
              </p>
            </div>
            <Link
              href="/contact"
              className="bg-on-primary text-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:bg-surface-dim transition-colors duration-300 flex items-center gap-2 flex-shrink-0"
            >
              Start a Conversation
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-primary w-full">
        <div className="grid grid-cols-12 gap-gutter px-grid-margin-mobile md:px-grid-margin py-section-gap max-w-[1440px] mx-auto text-on-primary">
          <div className="col-span-12 md:col-span-6 mb-stack-lg md:mb-0">
            <img src="/floxr-logo-dark.svg" alt="FLOXR" className="h-10 w-auto object-contain object-left mb-stack-sm" />
            <p className="font-body-lg text-body-lg text-left text-on-primary/70 max-w-sm">
              © 2024 FLOXR. Digital Architecture Firm.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col md:flex-row gap-stack-lg md:justify-end">
            <div className="flex flex-col gap-4 font-body-lg text-body-lg text-left">
              <span className="font-label-mono text-label-mono text-on-primary/50 uppercase">Social</span>
              <Link className="text-on-primary/70 hover:opacity-80 transition-opacity" href="/">LinkedIn</Link>
              <Link className="text-on-primary/70 hover:opacity-80 transition-opacity" href="/">Instagram</Link>
            </div>
            <div className="flex flex-col gap-4 font-body-lg text-body-lg text-left">
              <span className="font-label-mono text-label-mono text-on-primary/50 uppercase">Legal</span>
              <Link className="text-on-primary/70 hover:opacity-80 transition-opacity" href="/contact">Contact</Link>
              <Link className="text-on-primary/70 hover:opacity-80 transition-opacity" href="/">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
