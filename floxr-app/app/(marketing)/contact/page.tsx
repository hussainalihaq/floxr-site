'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import SiteFooter from '@/components/marketing/SiteFooter';

export default function ContactPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      scope: formData.get('scope'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please email hello@floxr.co instead.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = (name: string, value: string) => {
    if (value) {
      setFilledFields((prev) => new Set(prev).add(name));
    } else {
      const next = new Set(filledFields);
      next.delete(name);
      setFilledFields(next);
    }
    setFocusedField(null);
  };

  const isActive = (name: string) => focusedField === name || filledFields.has(name);

  const fieldWrap = (name: string) =>
    `relative px-5 py-4 rounded-xl border transition-all duration-300 ${
      focusedField === name
        ? 'border-[var(--color-ink)] bg-white shadow-[0_8px_24px_rgba(18,18,20,0.05)]'
        : 'hairline bg-white hover:border-[var(--color-mist)]'
    }`;

  const labelClass = (name: string) =>
    `absolute left-5 transition-all duration-300 pointer-events-none eyebrow ${
      isActive(name) ? 'top-2.5 !text-[9px] text-[var(--color-rust)]' : 'top-5 text-[var(--color-mist)]'
    }`;

  return (
    <div className="mkt min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-[72px] md:pt-[80px] relative overflow-hidden">
        <div className="absolute inset-0 grid-lines opacity-40 [mask-image:radial-gradient(ellipse_80%_70%_at_20%_10%,#000_10%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 relative">
          {/* Left: copy & info */}
          <div className="lg:col-span-6 flex flex-col">
            <p className="eyebrow text-[var(--color-rust)] mb-6 anim-fade-up">Contact</p>
            <h1 className="display-xl mb-8 anim-fade-up" style={{ animationDelay: '0.1s' }}>
              Let&apos;s build the <span className="font-serif-it font-normal">future</span>.
            </h1>
            <p
              className="text-[17px] md:text-[19px] leading-relaxed max-w-md mb-16 anim-fade-up"
              style={{ color: 'var(--color-mist)', animationDelay: '0.2s' }}
            >
              Whether you need a new website, a custom platform or dashboard, or an AI tool built
              into your workflow — tell us what you&apos;re after and we&apos;ll reply within 24
              hours with honest next steps and a fixed quote.
            </p>

            <div className="mt-auto border-t hairline pt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <p className="eyebrow mb-3" style={{ color: 'var(--color-mist)' }}>Email</p>
                <a
                  href="mailto:hello@floxr.co"
                  className="text-[15px] font-semibold hover:text-[var(--color-rust)] transition-colors"
                >
                  hello@floxr.co
                </a>
              </div>
              <div>
                <p className="eyebrow mb-3" style={{ color: 'var(--color-mist)' }}>Location</p>
                <p className="text-[15px] font-semibold">Global · Remote</p>
              </div>
              <div>
                <p className="eyebrow mb-3" style={{ color: 'var(--color-mist)' }}>Response Time</p>
                <p className="text-[15px] font-semibold">&lt; 24 Hours</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-6 flex items-start justify-center lg:justify-end">
            <div className="w-full max-w-lg rounded-2xl border hairline p-8 md:p-10" style={{ backgroundColor: 'var(--color-paper-2)' }}>
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6">
                    <CheckCircle2 size={28} strokeWidth={1.75} className="text-[var(--color-rust)]" />
                  </div>
                  <h3 className="text-[26px] font-bold tracking-tight mb-3">Sent.</h3>
                  <p className="text-[15px] leading-relaxed max-w-xs" style={{ color: 'var(--color-mist)' }}>
                    We&apos;ve received your brief and will reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col">
                  {error && (
                    <div className="rounded-lg p-4 mb-5 text-center text-[14px] bg-[var(--color-rust)]/10 text-[var(--color-rust)]">
                      {error}
                    </div>
                  )}

                  {/* Name */}
                  <div className={`${fieldWrap('name')} mb-4`}>
                    <label className={labelClass('name')}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-transparent pt-4 pb-0.5 text-[16px] text-[var(--color-ink)] outline-none"
                      onFocus={() => setFocusedField('name')}
                      onBlur={(e) => handleBlur('name', e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div className={`${fieldWrap('email')} mb-4`}>
                    <label className={labelClass('email')}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-transparent pt-4 pb-0.5 text-[16px] text-[var(--color-ink)] outline-none"
                      onFocus={() => setFocusedField('email')}
                      onBlur={(e) => handleBlur('email', e.target.value)}
                    />
                  </div>

                  {/* Scope */}
                  <div className={fieldWrap('scope')}>
                    <label className={labelClass('scope')}>Tell us about your project</label>
                    <textarea
                      name="scope"
                      required
                      rows={4}
                      className="w-full bg-transparent pt-4 pb-0.5 text-[16px] text-[var(--color-ink)] outline-none resize-none"
                      onFocus={() => setFocusedField('scope')}
                      onBlur={(e) => handleBlur('scope', e.target.value)}
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-pill btn-ink w-full mt-8 disabled:opacity-50">
                    {isSubmitting ? (
                      <span className="animate-pulse">Processing…</span>
                    ) : (
                      <>
                        Submit Request
                        <Send size={14} strokeWidth={2} />
                      </>
                    )}
                  </button>

                  <p className="eyebrow text-center mt-5" style={{ color: 'var(--color-mist)' }}>
                    Your information is encrypted.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
