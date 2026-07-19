import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';

const FEATURED_PROJECTS = [
  {
    name: 'AmeerGlobal',
    category: 'Website + Dashboard',
    tagline:
      'Public website and internal operations dashboard, built end-to-end — profitable within two months of launch, ahead of the client’s own projections.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    year: '2024',
    url: 'https://ameerglobal.ca',
    domain: 'ameerglobal.ca',
  },
  {
    name: 'Juriq',
    category: 'AI Legal Research',
    tagline: 'AI legal research assistant — GPT-4-powered search, automated brief generation, and precedent matching.',
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
    <div className="mkt min-h-screen">
      <Navbar />

      <main className="pt-[72px] md:pt-[80px]">
        {/* ── Page Header ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_10%,#000_10%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 relative">
            <p className="eyebrow text-[var(--color-rust)] mb-6 anim-fade-up">Portfolio</p>
            <h1 className="display-xl max-w-4xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              Selected <span className="font-serif-it font-normal">transformations</span>.
            </h1>
            <p
              className="text-[18px] md:text-[20px] leading-relaxed max-w-2xl anim-fade-up"
              style={{ color: 'var(--color-mist)', animationDelay: '0.2s' }}
            >
              A curated collection of projects where we diagnosed, designed, and delivered.
            </p>
          </div>
        </section>

        {/* ── Featured Projects ── */}
        <section className="border-t hairline">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="flex items-end justify-between mb-12">
              <h2 className="display-lg2">Featured Work</h2>
              <span className="eyebrow hidden md:block" style={{ color: 'var(--color-mist)' }}>
                {FEATURED_PROJECTS.length} Projects
              </span>
            </div>

            <div className="flex flex-col gap-10">
              {FEATURED_PROJECTS.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-2xl overflow-hidden border hairline bg-white hover:shadow-[0_24px_64px_rgba(18,18,20,0.08)] transition-shadow duration-500"
                >
                  {/* Mockup visual */}
                  <div className="relative h-[300px] md:h-[420px] overflow-hidden" style={{ backgroundColor: 'var(--color-ink)' }}>
                    <div className="absolute inset-0 grid-lines-dark" />
                    <div
                      className="absolute top-8 left-6 right-6 md:top-14 md:left-14 md:right-14 rounded-t-xl overflow-hidden border border-b-0"
                      style={{ borderColor: 'var(--color-line-dark)', backgroundColor: 'var(--color-ink-2)' }}
                    >
                      <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: 'var(--color-line-dark)' }}>
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-rust)]/70" />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-line-dark)' }} />
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--color-line-dark)' }} />
                        <span className="eyebrow ml-4" style={{ color: 'var(--color-mist-dark)' }}>{project.domain}</span>
                      </div>
                      <div className="h-[240px] md:h-[340px] flex items-center justify-center">
                        <span className="text-[clamp(1.8rem,4.5vw,3.5rem)] font-bold tracking-tight text-[var(--color-paper)]/90 group-hover:scale-[1.04] transition-transform duration-700">
                          {project.domain}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[var(--color-paper)]/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={18} className="text-[var(--color-paper)]" />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-7 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="eyebrow" style={{ color: 'var(--color-mist)' }}>{project.category}</span>
                        <span className="w-1 h-1 rounded-full bg-[var(--color-rust)]" />
                        <span className="eyebrow" style={{ color: 'var(--color-mist)' }}>{project.year}</span>
                      </div>
                      <h3 className="display-md2 mb-3 group-hover:text-[var(--color-rust)] transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="text-[15px] leading-relaxed max-w-lg" style={{ color: 'var(--color-mist)' }}>
                        {project.tagline}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap flex-shrink-0">
                      {project.stack.map((tech) => (
                        <span key={tech} className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--color-mist)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Archive ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--color-paper-2)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="flex items-end justify-between mb-12">
              <h2 className="display-lg2">More Projects</h2>
              <span className="eyebrow hidden md:block" style={{ color: 'var(--color-mist)' }}>Archive</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OTHER_PROJECTS.map((project) => (
                <div
                  key={project.name}
                  className="group rounded-2xl border hairline bg-white p-7 md:p-9 hover:shadow-[0_16px_48px_rgba(18,18,20,0.07)] transition-shadow duration-500"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="eyebrow" style={{ color: 'var(--color-mist)' }}>{project.category}</span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-rust)]" />
                    <span className="eyebrow" style={{ color: 'var(--color-mist)' }}>{project.year}</span>
                  </div>
                  <h3 className="display-md2 mb-2 group-hover:text-[var(--color-rust)] transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-[15px] leading-relaxed mb-8" style={{ color: 'var(--color-mist)' }}>
                    {project.tagline}
                  </p>
                  <div className="flex gap-2 flex-wrap border-t hairline pt-6">
                    {project.stack.map((tech) => (
                      <span key={tech} className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--color-mist)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 rounded-2xl p-8 md:p-12" style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}>
              <div>
                <h2 className="display-md2 mb-3">Have a project in mind?</h2>
                <p className="text-[16px] leading-relaxed max-w-md" style={{ color: 'var(--color-mist-dark)' }}>
                  Tell us what you&apos;re building. We&apos;ll show you how we&apos;d architect it.
                </p>
              </div>
              <Link href="/contact" className="btn-pill btn-paper flex-shrink-0">
                Start a Conversation
                <ArrowRight size={14} strokeWidth={2.25} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
