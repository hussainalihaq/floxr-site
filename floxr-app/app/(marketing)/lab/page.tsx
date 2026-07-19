'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';

const ARTICLES = [
  {
    id: 'death-of-decorative-ui',
    title: 'The Death of Decorative UI',
    category: 'DESIGN SYSTEMS',
    date: '10/24',
    desc: 'Why pure structural design outlasts trend cycles and drives higher enterprise value. We examine the shift towards utility-first, brutalist-inspired interfaces in B2B SaaS.',
  },
  {
    id: 'micro-frontends-in-practice',
    title: 'Micro-Frontends in Practice',
    category: 'ENGINEERING',
    date: '11/23',
    badge: 'Structural Review',
    desc: 'Architectural strategies for scaling development teams without increasing technical debt. A look at Webpack Module Federation and its implications for enterprise product suites.',
  },
  {
    id: 'friction-as-a-feature',
    title: 'Friction as a Feature',
    category: 'UX RESEARCH',
    date: '08/26',
    badge: 'Expert Analysis',
    desc: 'A UX teardown of high-stakes transactional interfaces. Counterintuitively, introducing calculated friction points can elevate user trust and prevent critical errors. An analysis of institutional fintech flows.',
  },
  {
    id: 'typographic-scales-in-fluid-contexts',
    title: 'Typographic Scales in Fluid Contexts',
    category: 'DESIGN SYSTEMS',
    date: '07/26',
    desc: 'Mathematical approaches to responsive typography. Moving away from arbitrary breakpoints toward clamp-based fluid scales that maintain harmonic proportions across all viewport dimensions.',
  },
];

const CATEGORIES = ['ALL ENTRIES', 'ENGINEERING', 'UX RESEARCH', 'DESIGN SYSTEMS'];

export default function LabPage() {
  const [filter, setFilter] = useState('ALL ENTRIES');

  const filteredArticles =
    filter === 'ALL ENTRIES' ? ARTICLES : ARTICLES.filter((a) => a.category === filter);

  return (
    <div className="mkt min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-[72px] md:pt-[80px]">
        {/* ── Header ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_10%,#000_10%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-12 md:pb-16 relative">
            <p className="eyebrow text-[var(--color-rust)] mb-6 anim-fade-up">Research & Writing</p>
            <h1 className="display-xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              The <span className="font-serif-it font-normal">Lab</span>.
            </h1>
            <p
              className="text-[18px] md:text-[20px] leading-relaxed max-w-2xl mb-14 anim-fade-up"
              style={{ color: 'var(--color-mist)', animationDelay: '0.2s' }}
            >
              A rigorous examination of digital architecture, component strategy, and interface
              kinematics.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`eyebrow rounded-full px-5 py-2.5 border transition-all duration-300 cursor-pointer ${
                    filter === cat
                      ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]'
                      : 'hairline text-[var(--color-mist)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Entries ── */}
        <section className="border-t hairline">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-20 md:pb-28 min-h-[400px]">
            {filteredArticles.length === 0 ? (
              <div className="py-24 text-center eyebrow" style={{ color: 'var(--color-mist)' }}>
                No entries found for {filter}
              </div>
            ) : (
              filteredArticles.map((article, i) => (
                <Link
                  key={article.id}
                  href={`/lab/${article.id}`}
                  className={`group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-10 md:py-12 items-baseline ${
                    i > 0 ? 'border-t hairline' : ''
                  }`}
                >
                  <div className="md:col-span-2 flex justify-between md:block">
                    <span className="eyebrow" style={{ color: 'var(--color-mist)' }}>{article.category}</span>
                    <span className="eyebrow md:hidden" style={{ color: 'var(--color-mist)' }}>{article.date}</span>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="display-md2 mb-4 group-hover:text-[var(--color-rust)] transition-colors duration-300">
                      {article.title}
                    </h2>
                    <p className="text-[15px] leading-relaxed max-w-3xl" style={{ color: 'var(--color-mist)' }}>
                      {article.badge && (
                        <span className="eyebrow text-[var(--color-rust)] mr-3">[{article.badge}]</span>
                      )}
                      {article.desc}
                    </p>
                  </div>
                  <div className="md:col-span-2 hidden md:flex items-center justify-end gap-6">
                    <span className="eyebrow" style={{ color: 'var(--color-mist)' }}>{article.date}</span>
                    <ArrowUpRight
                      size={20}
                      strokeWidth={1.75}
                      className="text-[var(--color-mist)] group-hover:text-[var(--color-rust)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    />
                  </div>
                </Link>
              ))
            )}

            {filteredArticles.length > 0 && (
              <div className="border-t hairline pt-10 text-center">
                <p className="eyebrow" style={{ color: 'var(--color-mist)' }}>
                  End of archive — {filteredArticles.length} {filteredArticles.length === 1 ? 'entry' : 'entries'}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
