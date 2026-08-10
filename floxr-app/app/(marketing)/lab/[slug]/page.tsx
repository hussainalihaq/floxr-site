import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/marketing/CustomCursor';
import SiteFooter from '@/components/marketing/SiteFooter';

// Mock database for the articles
const ARTICLES: Record<string, { title: string; category: string; date: string; content: string[] }> = {
  'death-of-decorative-ui': {
    title: 'The Death of Decorative UI',
    category: 'DESIGN SYSTEMS',
    date: '10/24',
    content: [
      'The era of aesthetic-first design in enterprise software is coming to a close. As applications scale in complexity, the cognitive overhead introduced by decorative elements—shadows, complex gradients, and arbitrary border radii—begins to outweigh their visual appeal.',
      'We are witnessing a shift towards pure structural design. Interfaces that prioritize information architecture over ornamentation outlast trend cycles and drive higher enterprise value.',
      'Consider the evolution of developer tools and institutional financial software. The most heavily utilized platforms in the world index heavily on high-contrast, strictly utilitarian components. The "boring" UI is paradoxically the most engaging because it respects the user\'s time.',
      'In our recent teardowns of leading B2B SaaS platforms, we observed a 30% reduction in time-to-task completion when decorative elements were stripped away. Drop shadows were replaced with hard borders. Soft, rounded corners were sharpened to clearly define interactive hit areas.',
      'This isn\'t just about minimalism; it\'s about maximizing the signal-to-noise ratio. Every pixel on the screen must serve a functional purpose. When you remove the decorative layer, the underlying structural logic of the application is exposed. If the logic is flawed, the UI breaks down. This forces engineering and design teams to build better foundational systems.',
      'Ultimately, the death of decorative UI is the birth of high-performance architecture. Design is no longer how it looks, but how it structuralizes information.',
    ],
  },
  'micro-frontends-in-practice': {
    title: 'Micro-Frontends in Practice',
    category: 'ENGINEERING',
    date: '11/23',
    content: [
      'Scaling front-end development across multiple autonomous teams presents a unique set of architectural challenges. The monolithic SPA (Single Page Application) model, while simple to start with, often becomes a bottleneck as the organization grows.',
      'Enter Micro-Frontends. By decomposing a monolithic front-end into smaller, independently deployable units, teams can iterate faster and reduce the blast radius of deployments.',
      'However, this architectural pattern is not a silver bullet. It introduces complex challenges around state sharing, routing, and consistent design system implementation. A poorly implemented micro-frontend architecture can easily devolve into a distributed monolith, combining the worst aspects of both paradigms.',
      'In our practical implementation, we strongly advocate for Webpack Module Federation as the underlying engine. It allows teams to share vendor dependencies at runtime while maintaining distinct build processes. But the technology is only half the battle.',
      'The true challenge lies in governance. How do you ensure four different teams don\'t load four different versions of React? How do you enforce a unified UX when the UI is stitched together from different repositories at runtime?',
      'We found that establishing a rigorous "host" shell application, coupled with strict dependency management contracts, is the only sustainable path forward. In this structural review, we explore these strategies and how to mitigate the inherent technical debt that arises from distributed architectures.',
    ],
  },
  'friction-as-a-feature': {
    title: 'Friction as a Feature',
    category: 'UX RESEARCH',
    date: '08/26',
    content: [
      'In the pursuit of seamless user experiences, designers often equate friction with failure. The prevailing dogma suggests that the fastest path to completion is always the best path. But what happens when the stakes are high?',
      'Our analysis of institutional fintech flows reveals a counterintuitive truth: introducing calculated friction points can actually elevate user trust and prevent critical errors.',
      'When users are making irreversible decisions—such as transferring large sums of capital, deleting critical infrastructure, or altering permission sets—a momentary pause forced by the interface acts as a cognitive safety net.',
      'Consider the classic "type the repository name to delete" pattern. It breaks the flow. It requires active cognitive engagement. And it saves countless engineering hours every year by preventing accidental deletions.',
      'We deconstruct the anatomy of "positive friction," exploring techniques like required manual input over autocomplete, delayed confirmation states, and multi-step verifications. These are not dark patterns; they are defensive design mechanisms.',
      'Ultimately, a system that protects the user from their own fast-twitch reflexes is a system that earns long-term loyalty.',
    ],
  },
  'typographic-scales-in-fluid-contexts': {
    title: 'Typographic Scales in Fluid Contexts',
    category: 'DESIGN SYSTEMS',
    date: '07/26',
    content: [
      'Responsive typography has traditionally relied on arbitrary breakpoints—stepping up font sizes at specific viewport widths. This approach, while functional, often leads to jarring transitions and broken layouts at intermediate sizes.',
      'The modern approach moves away from rigid breakpoints toward clamp-based fluid scales. By defining a mathematical relationship between the viewport dimension and the typographic size, we can ensure harmonic proportions across all devices.',
      'CSS clamp() allows us to set a minimum size, a preferred fluid size (usually based on viewport width), and a maximum size. But implementing this arbitrarily leads to a disjointed typographic hierarchy.',
      'In this essay, we explore the mathematics behind fluid typographic scales. By utilizing a modular scale ratio (like the Golden Ratio or Perfect Fourth) and mapping it to viewport bounds, we can generate a design token system that scales organically.',
      'Furthermore, we explore how to integrate these fluid values securely within an enterprise design token system (like Tailwind CSS or styled-components), ensuring consistency across the entire engineering organization.',
      'The result is a typography system that feels organic and mathematically sound, regardless of whether it is viewed on a 320px mobile device or a 4K ultra-wide monitor.',
    ],
  },
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="mkt min-h-screen flex flex-col">
      <CustomCursor />
      <Navbar />

      <main className="flex-grow pt-[72px] md:pt-[80px]">
        {/* ── Article Header ── */}
        <section className="relative overflow-hidden border-b hairline">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_10%,#000_10%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-14 md:pb-16 relative">
            <Link
              href="/lab"
              className="eyebrow inline-flex items-center gap-2 text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors mb-10"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Back to Lab
            </Link>

            <div className="flex items-center gap-3 mb-8">
              <span className="eyebrow border hairline rounded-full px-4 py-2" style={{ color: 'var(--text-2)' }}>
                {article.category}
              </span>
              <span className="eyebrow text-[var(--signal)]">{article.date}</span>
            </div>

            <h1 className="display-xl max-w-4xl">{article.title}</h1>
          </div>
        </section>

        {/* ── Article Body ── */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20 w-full">
          <div className="max-w-3xl">
            <div className="space-y-8">
              {article.content.map((paragraph, index) => (
                <p
                  key={index}
                  className={`leading-loose ${
                    index === 0
                      ? 'text-[19px] md:text-[22px] text-[var(--text-1)] font-medium'
                      : 'text-[16px] md:text-[18px]'
                  }`}
                  style={index === 0 ? undefined : { color: 'var(--text-2)' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Author */}
            <div className="mt-16 pt-10 border-t hairline flex items-center gap-5">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'var(--plane-1)' }}
              >
                <span className="text-[var(--text-1)] font-bold text-[16px] tracking-tight">fl</span>
              </div>
              <div>
                <div className="text-[17px] font-light tracking-[-0.03em] mb-1">Floxr Research Team</div>
                <div className="eyebrow" style={{ color: 'var(--text-2)' }}>Digital Architecture Group</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
