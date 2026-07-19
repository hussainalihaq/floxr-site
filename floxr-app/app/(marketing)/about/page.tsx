import Link from 'next/link';
import { ArrowRight, Target, Users, PenTool, BadgeCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';
import FounderPortrait from '@/components/marketing/FounderPortrait';

const PRINCIPLES = [
  {
    icon: Target,
    title: 'Outcome-Obsessed',
    desc: 'We don’t bill hours. We deliver results.',
  },
  {
    icon: Users,
    title: 'Direct Access',
    desc: 'You talk to the person building your product — no account managers, no telephone game.',
  },
  {
    icon: PenTool,
    title: 'Design-Engineering Fusion',
    desc: 'Our engineers think in pixels and our designers think in systems.',
  },
  {
    icon: BadgeCheck,
    title: 'Relentless Standards',
    desc: 'If it’s not exceptional, it doesn’t ship.',
  },
];

export default function AboutPage() {
  return (
    <div className="mkt min-h-screen">
      <Navbar />

      <main className="pt-[72px] md:pt-[80px]">
        {/* ── Header ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_10%,#000_10%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 relative">
            <p className="eyebrow text-[var(--color-rust)] mb-6 anim-fade-up">About</p>
            <h1 className="display-xl max-w-4xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              A small studio with serious{' '}
              <span className="font-serif-it font-normal">standards</span>.
            </h1>
            <p
              className="text-[18px] md:text-[20px] leading-relaxed max-w-2xl anim-fade-up"
              style={{ color: 'var(--color-mist)', animationDelay: '0.2s' }}
            >
              Floxr is a small product studio based in Lahore, working with clients worldwide. We
              design and build websites, platforms, and dashboards. Being small is the point: you
              talk directly to the people doing the work, scope stays honest, and nothing ships
              that we wouldn&apos;t put our name on.
            </p>
          </div>
        </section>

        {/* ── Founder ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20 relative overflow-hidden">
            <div className="absolute inset-0 grid-lines-dark opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_90%_50%,#000_10%,transparent_70%)] pointer-events-none" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
              <FounderPortrait />
              <div>
                <p className="eyebrow text-[var(--color-rust-lt)] mb-4">The Founder</p>
                <h2 className="display-md2 mb-2">Hussain Ali Haq</h2>
                <p className="eyebrow mb-5" style={{ color: 'var(--color-mist-dark)' }}>
                  Founder — Computer Science, LUMS · Lahore
                </p>
                <p className="text-[16px] leading-relaxed max-w-xl" style={{ color: 'var(--color-mist-dark)' }}>
                  Floxr is run by Hussain, a computer science student at LUMS who builds for the
                  web full-tilt alongside his degree. Every project is scoped, designed, and
                  quality-checked by him personally — which is exactly why the standards hold.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Principles ── */}
        <section>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <p className="eyebrow text-[var(--color-rust)] mb-5">01 — Our Principles</p>
            <h2 className="display-lg2 mb-14">How we operate</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PRINCIPLES.map((principle) => (
                <div
                  key={principle.title}
                  className="group rounded-2xl border hairline bg-white p-8 md:p-10 hover:shadow-[0_16px_48px_rgba(18,18,20,0.07)] transition-shadow duration-500"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-8 group-hover:bg-[var(--color-rust)] transition-colors duration-500"
                    style={{ backgroundColor: 'var(--color-paper-2)' }}
                  >
                    <principle.icon
                      size={24}
                      strokeWidth={1.5}
                      className="text-[var(--color-ink)] group-hover:text-white transition-colors duration-500"
                    />
                  </div>
                  <h3 className="display-md2 mb-3">{principle.title}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The Team ── */}
        <section className="border-t hairline relative overflow-hidden" style={{ backgroundColor: 'var(--color-paper-2)' }}>
          <div className="absolute inset-0 grid-lines opacity-50 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,#000_10%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28 relative">
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
              <p className="eyebrow text-[var(--color-rust)] mb-6">02 — Why Small Wins</p>
              <h2 className="display-lg2 mb-6">
                No account managers. No <span className="font-serif-it font-normal">telephone game</span>.
              </h2>
              <p className="text-[17px] leading-relaxed max-w-xl" style={{ color: 'var(--color-mist)' }}>
                When you work with Floxr, you talk to the person building your product. Decisions
                happen in hours, not meetings. That&apos;s how projects ship in weeks instead of
                quarters — and why nothing gets lost in translation.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t hairline">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div
              className="rounded-2xl p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}
            >
              <div className="absolute inset-0 grid-lines-dark opacity-60 [mask-image:radial-gradient(ellipse_60%_100%_at_50%_0%,#000_10%,transparent_80%)] pointer-events-none" />
              <div className="relative flex flex-col items-center">
                <h2 className="display-lg2 mb-5 max-w-2xl">
                  Ready to build something <span className="font-serif-it font-normal">exceptional</span>?
                </h2>
                <p className="text-[16px] leading-relaxed max-w-md mb-10" style={{ color: 'var(--color-mist-dark)' }}>
                  Let&apos;s talk about your next project. No sales pitch — just a real conversation
                  with engineers.
                </p>
                <Link href="/contact" className="btn-pill btn-paper">
                  Start a Conversation
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
