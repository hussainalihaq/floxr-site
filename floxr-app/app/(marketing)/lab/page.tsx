'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function LabPage() {
  const [filter, setFilter] = useState('ALL ENTRIES');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Articles data
  const articles = [
    {
      id: 'death-of-decorative-ui',
      title: 'The Death of Decorative UI',
      category: 'DESIGN SYSTEMS',
      date: '10/24',
      desc: 'Why pure structural design outlasts trend cycles and drives higher enterprise value. We examine the shift towards utility-first, brutalist-inspired interfaces in B2B SaaS.'
    },
    {
      id: 'micro-frontends-in-practice',
      title: 'Micro-Frontends in Practice',
      category: 'ENGINEERING',
      date: '11/23',
      badge: '[STRUCTURAL REVIEW]',
      desc: 'Architectural strategies for scaling development teams without increasing technical debt. A look at Webpack Module Federation and its implications for enterprise product suites.'
    },
    {
      id: 'friction-as-a-feature',
      title: 'Friction as a Feature',
      category: 'UX RESEARCH',
      date: '08/26',
      badge: '[EXPERT ANALYSIS]',
      desc: 'A UX teardown of high-stakes transactional interfaces. Counterintuitively, introducing calculated friction points can elevate user trust and prevent critical errors. An analysis of institutional fintech flows.'
    },
    {
      id: 'typographic-scales-in-fluid-contexts',
      title: 'Typographic Scales in Fluid Contexts',
      category: 'DESIGN SYSTEMS',
      date: '07/26',
      desc: 'Mathematical approaches to responsive typography. Moving away from arbitrary breakpoints toward clamp-based fluid scales that maintain harmonic proportions across all viewport dimensions.'
    }
  ];

  const filteredArticles = filter === 'ALL ENTRIES' 
    ? articles 
    : articles.filter(a => a.category === filter);

  const categories = ['ALL ENTRIES', 'ENGINEERING', 'UX RESEARCH', 'DESIGN SYSTEMS'];

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      // Simulating no more articles available
      alert('You have reached the end of the archive.');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background text-primary font-body-md antialiased flex flex-col">
      <Navbar />

      <main className="flex-grow pb-section-gap max-w-[1440px] mx-auto px-6 md:px-12 pt-[72px] md:pt-[80px] w-full">
        <section className="mb-16">
          <h1 className="font-display-lg text-[64px] md:text-[88px] font-bold tracking-tight text-primary leading-none mb-6">The Lab</h1>
          <p className="font-body-lg text-[16px] text-secondary max-w-2xl leading-relaxed mb-12">
            A rigorous examination of digital architecture, component strategy, and interface kinematics.
          </p>
          
          <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant pb-8">
            <span className="font-label-mono text-[10px] text-secondary uppercase tracking-widest mr-4">Filter By:</span>
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-label-mono text-[10px] uppercase tracking-widest px-4 py-2 transition-colors ${
                  filter === cat 
                    ? 'bg-primary text-on-primary' 
                    : 'bg-surface-alt text-secondary hover:text-primary hover:bg-outline-variant'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col min-h-[400px]">
          {filteredArticles.length === 0 ? (
            <div className="py-20 text-center text-secondary font-label-mono text-[12px] tracking-widest uppercase">
              No entries found for {filter}
            </div>
          ) : (
            filteredArticles.map((article) => (
              <article key={article.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-outline-variant group animate-[fadeIn_0.3s_ease-out]">
                <div className="md:col-span-2 font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2 flex justify-between md:block">
                  <span>{article.category}</span>
                  <span className="md:hidden">{article.date}</span>
                </div>
                <div className="md:col-span-8">
                  <Link href={`/lab/${article.id}`} className="block">
                    <h2 className="font-headline-lg text-[28px] md:text-[36px] font-bold text-primary mb-4 group-hover:opacity-80 transition-opacity">
                      {article.title}
                    </h2>
                    <div className="font-body-md text-[14px] text-secondary leading-relaxed max-w-3xl">
                      {article.badge && (
                        <span className="font-label-mono text-[11px] text-[#ff3333] font-bold uppercase tracking-wider mr-2">
                          {article.badge}
                        </span>
                      )}
                      {article.desc}
                    </div>
                  </Link>
                </div>
                <div className="md:col-span-2 text-right font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2 hidden md:block">
                  {article.date}
                </div>
              </article>
            ))
          )}

          {filteredArticles.length > 0 && (
            <div className="flex justify-center mt-12 mb-16">
              <button 
                onClick={handleLoadMore}
                className="border border-outline hover:border-primary text-secondary hover:text-primary font-label-mono text-[10px] uppercase tracking-widest px-6 py-3 transition-all duration-300 flex items-center gap-2"
              >
                {isLoadingMore ? 'Loading...' : 'Load More Archive'}
                {!isLoadingMore && <span className="material-symbols-outlined text-[14px]">arrow_downward</span>}
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-primary text-on-primary w-full mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-6 md:px-12 py-section-gap max-w-[1440px] mx-auto items-start">
          <div className="md:col-span-6 flex flex-col space-y-8">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-8 md:h-12 w-auto object-contain object-left mb-2 brightness-0 invert" />
            <div className="font-body-sm text-sm text-left text-[#888888] mb-1">hello@floxr.co</div>
            <div className="font-body-sm text-sm text-left text-[#888888]">© 2026 FLOXR built in house.</div>
          </div>
          <div className="md:col-span-6 flex justify-start md:justify-end mt-12 md:mt-0">
            <ul className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0">
              <li><Link className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/about">About</Link></li>
              <li><Link className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/contact">Contact</Link></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="https://linkedin.com">LinkedIn</a></li>
              <li><Link className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/privacy">Privacy</Link></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="https://instagram.com">Instagram</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
