'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ArrowDown, Route, Code2, Gem, Workflow, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';

const VECTORS = [
  {
    index: '01',
    icon: Route,
    title: 'UX & Navigation',
    desc: 'Where visitors get stuck, confused, or drop off — and what it costs you in enquiries and sales.',
    wide: true,
  },
  {
    index: '02',
    icon: Code2,
    title: 'Speed & Code',
    desc: 'Load times, mobile performance, and technical debt.',
    wide: false,
  },
  {
    index: '03',
    icon: Gem,
    title: 'Design & Credibility',
    desc: 'Whether your site looks coherent and trustworthy.',
    wide: false,
  },
  {
    index: '04',
    icon: Workflow,
    title: 'SEO & Content Basics',
    desc: 'Titles, structure, and whether search engines can actually read and rank your pages.',
    wide: true,
  },
];

const PHASES = [
  {
    label: 'Step 1 / 2 Minutes',
    title: 'Send Us Your Site',
    desc: 'Fill in the short form below — your name, email, and what you most want to improve. That’s it.',
  },
  {
    label: 'Step 2 / We Review',
    title: 'We Go Through It',
    desc: 'We review your site page by page across the four areas above — the same people who would build the fixes.',
  },
  {
    label: 'Step 3 / Within 48 Hours',
    title: 'You Get the List',
    desc: 'A concrete, prioritized list of what’s broken, what’s slow, and what to fix first. Free, whether or not you hire us.',
  },
];

const inputClass =
  'w-full bg-transparent border-b hairline py-3 text-[16px] text-[var(--color-ink)] placeholder:text-[var(--color-mist)]/50 focus:border-[var(--color-ink)] outline-none transition-colors rounded-none';

export default function AuditPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    objective: 'UX Modernization',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please email hello@floxr.co instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mkt min-h-screen">
      <Navbar />

      <main className="pt-[72px] md:pt-[80px]">
        {/* ── Hero (ink) ── */}
        <section style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
            <div className="absolute inset-0 grid-lines-dark opacity-60 [mask-image:radial-gradient(ellipse_70%_90%_at_85%_20%,#000_10%,transparent_70%)] pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
              <div className="lg:col-span-7">
                <p className="eyebrow text-[var(--color-rust-lt)] mb-6 anim-fade-up">
                  Free Right Now
                </p>
                <h1 className="display-xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
                  The Floxr Website{' '}
                  <span className="font-serif-it font-normal">Audit</span>
                </h1>
                <p
                  className="text-[17px] md:text-[19px] leading-relaxed max-w-xl mb-10 anim-fade-up"
                  style={{ color: 'var(--color-mist-dark)', animationDelay: '0.2s' }}
                >
                  A straightforward, honest review of your website or product. We look at speed, UX,
                  design, and SEO basics — then send you a prioritized list of what to fix, within
                  48 hours, free. No sales pitch.
                </p>
                <div className="anim-fade-up" style={{ animationDelay: '0.3s' }}>
                  <Link href="#initiate-audit" className="btn-pill btn-paper">
                    Get Your Free Audit
                    <ArrowDown size={14} strokeWidth={2.25} />
                  </Link>
                </div>
              </div>

              {/* Score card */}
              <div className="lg:col-span-5 hidden lg:block">
                <div
                  className="rounded-2xl border p-8 max-w-sm ml-auto"
                  style={{ backgroundColor: 'var(--color-ink-2)', borderColor: 'var(--color-line-dark)' }}
                >
                  <p className="eyebrow mb-6" style={{ color: 'var(--color-mist-dark)' }}>Sample Audit Score</p>
                  <div className="text-[72px] font-bold leading-none tracking-tight mb-8">
                    92.4<span className="text-[0.4em] font-medium" style={{ color: 'var(--color-mist-dark)' }}>%</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="eyebrow rounded-full px-4 py-2 bg-[var(--color-rust)]/15 text-[var(--color-rust-lt)]">Critical</span>
                    <span className="eyebrow rounded-full px-4 py-2" style={{ backgroundColor: 'rgba(250,249,245,0.08)', color: 'var(--color-mist-dark)' }}>Stable</span>
                    <span className="eyebrow rounded-full px-4 py-2" style={{ backgroundColor: 'rgba(250,249,245,0.08)', color: 'var(--color-paper)' }}>Optimal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Critical Vectors ── */}
        <section>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <p className="eyebrow text-[var(--color-rust)] mb-5">01 — What We Review</p>
            <h2 className="display-lg2 mb-4">Four Things That Cost You Customers</h2>
            <p className="text-[16px] leading-relaxed max-w-xl mb-14" style={{ color: 'var(--color-mist)' }}>
              We go through your site the way a skeptical customer would — then the way an engineer
              would.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {VECTORS.map((vector) => (
                <div
                  key={vector.index}
                  className={`${vector.wide ? 'md:col-span-8' : 'md:col-span-4'} rounded-2xl border hairline bg-white p-8 md:p-9 min-h-[220px] flex flex-col justify-between hover:shadow-[0_16px_48px_rgba(18,18,20,0.07)] transition-shadow duration-500`}
                >
                  <div className="flex justify-between items-start mb-10">
                    <vector.icon size={26} strokeWidth={1.5} className="text-[var(--color-ink)]" />
                    <span className="eyebrow text-[var(--color-rust)]">{vector.index}</span>
                  </div>
                  <div>
                    <h3 className="text-[22px] font-bold tracking-tight mb-2">{vector.title}</h3>
                    <p className="text-[15px] leading-relaxed max-w-lg" style={{ color: 'var(--color-mist)' }}>
                      {vector.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Methodology ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--color-paper-2)' }}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <p className="eyebrow text-[var(--color-rust)] mb-5">02 — How It Works</p>
            <h2 className="display-lg2 mb-14">Three Steps, 48 Hours</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PHASES.map((phase, i) => (
                <div key={phase.title} className="rounded-2xl border hairline bg-white p-8 md:p-9 relative">
                  <span className="text-[48px] font-bold tracking-tight leading-none text-[var(--color-line)] block mb-8">
                    0{i + 1}
                  </span>
                  <p className="eyebrow text-[var(--color-rust)] mb-3">{phase.label}</p>
                  <h3 className="text-[22px] font-bold tracking-tight mb-3">{phase.title}</h3>
                  <p className="text-[15px] leading-relaxed" style={{ color: 'var(--color-mist)' }}>
                    {phase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead capture ── */}
        <section id="initiate-audit" className="border-t hairline scroll-mt-[80px]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <p className="eyebrow text-[var(--color-rust)] mb-5">03 — Get Started</p>
                <h2 className="display-lg2 mb-6">
                  Get your free <span className="font-serif-it font-normal">audit</span>.
                </h2>
                <p className="text-[16px] leading-relaxed max-w-md" style={{ color: 'var(--color-mist)' }}>
                  Tell us where to look. We review every submission ourselves and reply within
                  48 hours with your prioritized fix list.
                </p>
                <div className="mt-10 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} strokeWidth={1.75} className="text-[var(--color-rust)]" />
                    <span className="text-[15px]" style={{ color: 'var(--color-mist)' }}>Reviewed by the people who&apos;d build the fixes — not a sales team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} strokeWidth={1.75} className="text-[var(--color-rust)]" />
                    <span className="text-[15px]" style={{ color: 'var(--color-mist)' }}>Reply within 48 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} strokeWidth={1.75} className="text-[var(--color-rust)]" />
                    <span className="text-[15px]" style={{ color: 'var(--color-mist)' }}>Free — no obligation, no follow-up spam</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border hairline bg-white p-8 md:p-10">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--color-paper-2)' }}>
                      <CheckCircle2 size={28} strokeWidth={1.75} className="text-[var(--color-rust)]" />
                    </div>
                    <h3 className="text-[24px] font-bold tracking-tight mb-3">Request Received</h3>
                    <p className="text-[15px] leading-relaxed max-w-xs" style={{ color: 'var(--color-mist)' }}>
                      We&apos;re on it. You&apos;ll get your prioritized fix list by email within
                      48 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {errorMsg && (
                      <div className="rounded-lg p-4 text-center text-[14px] bg-[var(--color-rust)]/10 text-[var(--color-rust)]">
                        {errorMsg}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="eyebrow block mb-2" style={{ color: 'var(--color-mist)' }}>First Name</label>
                        <input
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className={inputClass}
                          placeholder="Jane"
                          type="text"
                        />
                      </div>
                      <div>
                        <label className="eyebrow block mb-2" style={{ color: 'var(--color-mist)' }}>Last Name</label>
                        <input
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className={inputClass}
                          placeholder="Doe"
                          type="text"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="eyebrow block mb-2" style={{ color: 'var(--color-mist)' }}>Corporate Email</label>
                      <input
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={inputClass}
                        placeholder="jane@company.com"
                        type="email"
                      />
                    </div>

                    <div>
                      <label className="eyebrow block mb-2" style={{ color: 'var(--color-mist)' }}>Primary Objective</label>
                      <select
                        required
                        value={formData.objective}
                        onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option>UX Modernization</option>
                        <option>Tech Stack Consolidation</option>
                        <option>Brand Realignment</option>
                        <option>Comprehensive Overhaul</option>
                      </select>
                    </div>

                    <button disabled={isSubmitting} type="submit" className="btn-pill btn-ink w-full disabled:opacity-50">
                      {isSubmitting ? 'Submitting…' : 'Submit Request'}
                      {!isSubmitting && <ArrowRight size={14} strokeWidth={2.25} />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
