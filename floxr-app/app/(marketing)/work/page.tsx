import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/marketing/CustomCursor';
import SiteFooter from '@/components/marketing/SiteFooter';
import Reveal from '@/components/marketing/Reveal';
import GearMotif from '@/components/marketing/GearMotif';
import { CASE_STUDIES, CLIENT_LINE, COMPANY_LINE } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'Work',
  description: COMPANY_LINE,
};

export default function WorkPage() {
  return (
    <div className="mkt min-h-screen">
      <CustomCursor />
      <Navbar />

      <main className="pt-[72px] md:pt-[80px]">
        {/* ── Header ── */}
        <section className="relative overflow-hidden grain">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_65%_15%,#000_10%,transparent_72%)] pointer-events-none" />
          <GearMotif className="absolute -right-24 -top-20 w-[520px] h-[520px] hidden lg:block text-[var(--text-1)] pointer-events-none" opacity={0.06} />

          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 relative z-10">
            <p className="eyebrow text-[var(--signal)] mb-6 anim-fade-up">Work</p>
            <h1 className="display-xl max-w-4xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              Work we have <span className="font-serif-it font-normal">shipped</span>.
            </h1>
            <p
              className="text-[18px] md:text-[20px] leading-relaxed max-w-2xl anim-fade-up"
              style={{ color: 'var(--text-2)', animationDelay: '0.2s' }}
            >
              {CLIENT_LINE} Every project below is live — you can open it and judge it yourself.
            </p>
          </div>
        </section>

        {/* ── Case studies ── */}
        <section className="border-t hairline">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="flex flex-col gap-16 md:gap-24">
              {CASE_STUDIES.map((project, i) => (
                <Reveal key={project.name}>
                  <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* Visual */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group lg:col-span-7 block relative overflow-hidden rounded-2xl ${i % 2 === 1 ? 'lg:order-2' : ''}`}
                      style={{ backgroundColor: 'var(--plane-1)' }}
                    >
                      <div className="absolute inset-0 grid-lines-dark" />
                      <div className="relative p-6 md:p-12 pb-0 md:pb-0">
                        <div
                          className="rounded-t-xl overflow-hidden border border-b-0 translate-y-px"
                          style={{ borderColor: 'var(--line-1)', backgroundColor: 'var(--plane-2)' }}
                        >
                          <div className="flex items-center gap-2 px-5 py-3.5 border-b" style={{ borderColor: 'var(--line-1)' }}>
                            <span className="w-2.5 h-2.5 rounded-full bg-[var(--signal)]/70" />
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--line-2)' }} />
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--line-2)' }} />
                            <span className="eyebrow ml-4" style={{ color: 'var(--text-2)' }}>{project.domain}</span>
                          </div>
                          <div className="h-[240px] md:h-[340px] flex items-center justify-center">
                            <span className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-light tracking-[-0.03em] text-[var(--text-1)]/90 group-hover:scale-[1.04] transition-transform duration-700">
                              {project.domain}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/[0.08] backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight size={18} className="text-[var(--text-1)]" />
                      </div>
                    </a>

                    {/* Detail */}
                    <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className="flex gap-2 mb-5 flex-wrap">
                        <span className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--text-2)' }}>
                          {project.sector}
                        </span>
                        <span className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--text-2)' }}>
                          {project.year}
                        </span>
                      </div>

                      <h2 className="display-md2 mb-6">{project.name}</h2>

                      <div className="flex gap-2 mb-8 flex-wrap">
                        {project.categories.map((cat) => (
                          <span key={cat} className="eyebrow text-[var(--signal)]">
                            {cat}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-6">
                        <div className="border-l-2 pl-5" style={{ borderColor: 'var(--line-1)' }}>
                          <p className="eyebrow mb-2" style={{ color: 'var(--text-2)' }}>Brief</p>
                          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-2)' }}>{project.brief}</p>
                        </div>
                        <div className="border-l-2 pl-5" style={{ borderColor: 'var(--line-1)' }}>
                          <p className="eyebrow mb-2" style={{ color: 'var(--text-2)' }}>Delivered</p>
                          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text-2)' }}>{project.delivered}</p>
                        </div>
                        <div className="border-l-2 border-[var(--signal)] pl-5">
                          <p className="eyebrow text-[var(--signal)] mb-2">Outcome</p>
                          <p className="text-[15px] leading-relaxed font-semibold">{project.outcome}</p>
                        </div>
                      </div>

                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-arrow mt-8 inline-flex"
                      >
                        View Live
                        <ArrowUpRight size={14} strokeWidth={2.25} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <Reveal>
              <div
                className="rounded-2xl p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8 relative overflow-hidden grain"
                style={{ backgroundColor: 'var(--plane-1)', color: 'var(--text-1)' }}
              >
                <div className="absolute inset-0 grid-lines-dark opacity-60 [mask-image:radial-gradient(ellipse_60%_100%_at_50%_0%,#000_10%,transparent_80%)] pointer-events-none" />
                <div className="relative z-10">
                  <h2 className="display-lg2 mb-4">Have a project in mind?</h2>
                  <p className="text-[16px] leading-relaxed max-w-md" style={{ color: 'var(--text-2)' }}>
                    Tell us what you&apos;re building. We&apos;ll come back with scope, timeline,
                    and a fixed price.
                  </p>
                </div>
                <Link href="/contact" className="btn-pill btn-paper flex-shrink-0 relative z-10">
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
