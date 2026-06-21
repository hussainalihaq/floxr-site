import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { notFound } from 'next/navigation';

// Mock database for the articles
const ARTICLES: Record<string, { title: string; category: string; date: string; content: string[] }> = {
  'death-of-decorative-ui': {
    title: 'The Death of Decorative UI',
    category: 'DESIGN SYSTEMS',
    date: '10/24',
    content: [
      'The era of aesthetic-first design in enterprise software is coming to a close. As applications scale in complexity, the cognitive overhead introduced by decorative elements—shadows, complex gradients, and arbitrary border radii—begins to outweigh their visual appeal.',
      'We are witnessing a shift towards pure structural design. Interfaces that prioritize information architecture over ornamentation outlast trend cycles and drive higher enterprise value.',
      'In our recent teardowns of leading B2B SaaS platforms, we observed a 30% reduction in time-to-task completion when decorative elements were stripped away in favor of high-contrast, strictly utilitarian components.',
      'This isn\'t just about minimalism; it\'s about maximizing the signal-to-noise ratio. Every pixel on the screen must serve a functional purpose.'
    ]
  },
  'micro-frontends-in-practice': {
    title: 'Micro-Frontends in Practice',
    category: 'ENGINEERING',
    date: '11/23',
    content: [
      'Scaling front-end development across multiple autonomous teams presents a unique set of architectural challenges. The monolithic SPA (Single Page Application) model, while simple to start with, often becomes a bottleneck as the organization grows.',
      'Enter Micro-Frontends. By decomposing a monolithic front-end into smaller, independently deployable units, teams can iterate faster and reduce the blast radius of deployments.',
      'However, this architectural pattern is not a silver bullet. It introduces complex challenges around state sharing, routing, and consistent design system implementation.',
      'In this structural review, we explore practical strategies for implementing micro-frontends using Webpack Module Federation, and how to mitigate the inherent technical debt that arises from distributed architectures.'
    ]
  },
  'friction-as-a-feature': {
    title: 'Friction as a Feature',
    category: 'UX RESEARCH',
    date: '08/26',
    content: [
      'In the pursuit of seamless user experiences, designers often equate friction with failure. The prevailing dogma suggests that the fastest path to completion is always the best path. But what happens when the stakes are high?',
      'Our analysis of institutional fintech flows reveals a counterintuitive truth: introducing calculated friction points can actually elevate user trust and prevent critical errors.',
      'When users are making irreversible decisions—such as transferring large sums of capital or deleting critical infrastructure—a momentary pause forced by the interface acts as a cognitive safety net.',
      'We deconstruct the anatomy of "positive friction," exploring techniques like required manual input over autocomplete, delayed confirmation states, and multi-step verifications that reinforce system integrity.'
    ]
  },
  'typographic-scales-in-fluid-contexts': {
    title: 'Typographic Scales in Fluid Contexts',
    category: 'DESIGN SYSTEMS',
    date: '07/26',
    content: [
      'Responsive typography has traditionally relied on arbitrary breakpoints—stepping up font sizes at specific viewport widths. This approach, while functional, often leads to jarring transitions and broken layouts at intermediate sizes.',
      'The modern approach moves away from rigid breakpoints toward clamp-based fluid scales. By defining a mathematical relationship between the viewport dimension and the typographic size, we can ensure harmonic proportions across all devices.',
      'In this essay, we explore the mathematics behind fluid typographic scales, the implementation using CSS clamp(), and how to integrate these fluid values securely within an enterprise design token system.',
      'The result is a typography system that feels organic and mathematically sound, regardless of whether it is viewed on a 320px mobile device or a 4K ultra-wide monitor.'
    ]
  }
};

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-primary font-body-md antialiased">
      <Navbar />

      <main className="flex-grow pb-section-gap max-w-[1440px] mx-auto px-6 md:px-12 pt-[72px] md:pt-[80px]">
        {/* Article Header */}
        <section className="mb-16 pt-12 md:pt-24 border-b border-outline-variant pb-12">
          <Link href="/lab" className="inline-flex items-center gap-2 font-label-mono text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-colors mb-8">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Back to Lab
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="font-label-mono text-[10px] text-secondary uppercase tracking-widest px-3 py-1 bg-surface-alt border border-outline-variant">
              {article.category}
            </span>
            <span className="font-label-mono text-[10px] text-secondary uppercase tracking-widest">
              {article.date}
            </span>
          </div>
          
          <h1 className="font-display-lg text-[48px] md:text-[72px] font-bold tracking-tight text-primary leading-tight max-w-4xl">
            {article.title}
          </h1>
        </section>

        {/* Article Body */}
        <section className="max-w-3xl mb-24">
          <div className="prose prose-invert prose-lg prose-p:font-body-md prose-p:text-[16px] md:prose-p:text-[18px] prose-p:leading-loose prose-p:text-secondary prose-p:mb-8">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Dummy Author Bio */}
          <div className="mt-16 pt-8 border-t border-outline-variant flex items-center gap-6">
            <div className="w-16 h-16 bg-surface-alt border border-outline-variant rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-2xl">person</span>
            </div>
            <div>
              <div className="font-headline-md text-primary font-bold mb-1">Floxr Research Team</div>
              <div className="font-label-mono text-[10px] text-secondary uppercase tracking-widest">Digital Architecture Group</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-on-primary w-full mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-6 md:px-12 py-section-gap max-w-[1440px] mx-auto items-start">
          <div className="md:col-span-6 flex flex-col space-y-8">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-8 md:h-10 w-auto object-contain object-left mb-2 brightness-0 invert" />
            <div className="font-body-sm text-sm text-left text-[#888888] mb-1">hello@floxr.co</div>
            <div className="font-body-sm text-sm text-left text-[#888888]">© 2026 FLOXR built in house.</div>
          </div>
          <div className="md:col-span-6 flex justify-start md:justify-end mt-12 md:mt-0">
            <ul className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0">
              <li><Link className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/about">About</Link></li>
              <li><Link className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/contact">Contact</Link></li>
              <li><Link className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="https://linkedin.com/company/floxr">LinkedIn</Link></li>
              <li><Link className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/privacy">Privacy</Link></li>
              <li><Link className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="https://instagram.com/floxr.co">Instagram</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
