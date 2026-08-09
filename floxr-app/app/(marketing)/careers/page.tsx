import Link from 'next/link';
import { ArrowRight, Code2, Zap, Shield, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';

const VALUES = [
  {
    icon: Code2,
    title: 'Craft Over Convention',
    desc: 'Every line of code is purpose-built.',
  },
  {
    icon: Zap,
    title: 'Speed Is a Feature',
    desc: 'We ship fast, iterate faster.',
  },
  {
    icon: Shield,
    title: 'Ownership Culture',
    desc: 'Whoever builds it, owns it end-to-end.',
  },
  {
    icon: Globe,
    title: 'Remote-First, Global',
    desc: 'We work with talent, not timezones.',
  },
];

export default function CareersPage() {
  return (
    <div className="mkt min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-[72px] md:pt-[80px]">
        {/* ── Header ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_10%,#000_10%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-20 relative">
            <p className="eyebrow text-[var(--color-rust)] mb-6 anim-fade-up">Work With Us</p>
            <h1 className="display-xl max-w-4xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              Build what <span className="font-serif-it font-normal">matters</span>.
            </h1>
            <p
              className="text-[18px] md:text-[20px] leading-relaxed max-w-2xl anim-fade-up"
              style={{ color: 'var(--color-mist)', animationDelay: '0.2s' }}
            >
              We hire deliberately rather than continuously, so we don&apos;t always run open
              listings. We do collaborate with strong freelance engineers and designers on a
              project basis, and we always want to hear from exceptional people.
            </p>
          </div>
        </section>

        {/* ── Values ── */}
        <section className="border-t hairline">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <p className="eyebrow text-[var(--color-rust)] mb-5">01 — How We Work</p>
            <h2 className="display-lg2 mb-14">What we care about</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="group rounded-2xl border hairline bg-white p-8 hover:shadow-[0_16px_48px_rgba(18,18,20,0.07)] transition-shadow duration-500"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-7 group-hover:bg-[var(--color-rust)] transition-colors duration-500"
                    style={{ backgroundColor: 'var(--color-paper-2)' }}
                  >
                    <value.icon
                      size={20}
                      strokeWidth={1.5}
                      className="text-[var(--color-ink)] group-hover:text-white transition-colors duration-500"
                    />
                  </div>
                  <h3 className="text-[19px] font-bold tracking-tight mb-2">{value.title}</h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Collaborate ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--color-paper-2)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center">
              <p className="eyebrow text-[var(--color-rust)] mb-6">02 — Open Door</p>
              <h2 className="display-lg2 mb-5">
                Think you&apos;d make us <span className="font-serif-it font-normal">better</span>?
              </h2>
              <p className="text-[16px] leading-relaxed max-w-lg mb-10" style={{ color: 'var(--color-mist)' }}>
                If you&apos;re a freelance engineer or designer who ships great work — or a student
                who builds things for the joy of it — send us your portfolio and tell us what
                you&apos;re great at. When the right project comes through, we&apos;ll know who to
                call.
              </p>
              <Link href="/contact" className="btn-pill btn-ink">
                Introduce Yourself
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
