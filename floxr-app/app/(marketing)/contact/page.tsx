'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/marketing/CustomCursor';
import SiteFooter from '@/components/marketing/SiteFooter';
import Reveal from '@/components/marketing/Reveal';
import { TextReveal, ScrollRail, Spotlight } from '@/components/marketing/Motion';
import { SERVICES } from '@/lib/site-content';

const TIMELINES = ['ASAP', 'Within a month', '1–3 months', 'Just exploring'];

const NEXT_STEPS = [
  { step: '01', title: 'You send a brief', note: 'The form below, or an email. A paragraph is enough to start.' },
  { step: '02', title: 'We reply within 24 hours', note: 'With questions, or a call if the scope needs talking through.' },
  { step: '03', title: 'You get a written proposal', note: 'Scope, timeline, and a fixed price. No obligation to proceed.' },
];

/* Practical answers international and local clients ask before engaging. */
const WORKING_FACTS = [
  { label: 'Hours', value: 'PKT (UTC+5)', note: 'Overlaps a full working day with the Gulf and Europe, and mornings with US East.' },
  { label: 'Invoicing', value: 'USD or PKR', note: 'Bank transfer, Wise, or Payoneer. Local clients can be invoiced in PKR.' },
  { label: 'Contracts', value: 'Written scope', note: 'Fixed-fee agreement up front. NDA on request. IP transfers to you on final payment.' },
  { label: 'Languages', value: 'English · Urdu', note: 'All documentation, code, and handover materials are delivered in English.' },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState<string>(SERVICES[0].name);
  const [timeline, setTimeline] = useState<string>('');
  const [draft, setDraft] = useState({ name: '', email: '', company: '', message: '' });

  // Composed so the whole enquiry survives even if only `scope` is stored.
  const composeScope = () =>
    [
      `Service: ${service}`,
      timeline && `Timeline: ${timeline}`,
      draft.company && `Company: ${draft.company}`,
      '',
      draft.message,
    ]
      .filter(Boolean)
      .join('\n');

  const mailtoFallback = () =>
    `mailto:hello@floxr.co?subject=${encodeURIComponent(
      `Project enquiry — ${service}`
    )}&body=${encodeURIComponent(`${composeScope()}\n\n— ${draft.name}`)}`;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: draft.name,
          email: draft.email,
          scope: composeScope(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('sent');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  };

  const field =
    'w-full bg-transparent border-b py-3.5 text-[16px] outline-none transition-colors duration-300 placeholder:text-[var(--text-3)]';

  return (
    <div className="mkt min-h-screen">
      <ScrollRail />
      <CustomCursor />
      <Navbar />

      <main className="pt-[92px] md:pt-[112px]">
        {/* ── Header ── */}
        <section className="relative overflow-hidden grain">
          <div className="absolute inset-0 grid-lines opacity-[0.5] [mask-image:radial-gradient(ellipse_60%_60%_at_30%_20%,#000_5%,transparent_75%)] pointer-events-none" />
          <div className="aura w-[720px] h-[720px] -top-56 -left-40 float-slow" />

          <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12 md:pb-16 relative z-10">
            <div className="flex items-center gap-4 mb-8 anim-fade-up">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--signal)' }} />
              <p className="eyebrow">Start a Project</p>
            </div>
            <h1 className="display-xl max-w-[15ch] mb-8">
              <TextReveal text="Tell us what you need" />{' '}
              <span className="font-serif-it">built</span>.
            </h1>
            <p className="lede max-w-xl anim-fade-up" style={{ animationDelay: '0.25s' }}>
              Send a brief and we&apos;ll come back within 24 hours with scope, timeline, and a
              fixed price. If we&apos;re not the right fit for it, we&apos;ll tell you that instead.
            </p>
          </div>
        </section>

        {/* ── Form + rail ── */}
        <section className="border-t hairline">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-14 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* What happens next */}
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-8">What Happens Next</p>
                <ol className="flex flex-col">
                  {NEXT_STEPS.map((item) => (
                    <li key={item.step} className="py-6 border-t hairline">
                      <div className="flex items-baseline gap-4 mb-2">
                        <span className="eyebrow" style={{ color: 'var(--signal)' }}>{item.step}</span>
                        <span className="text-[17px] font-light tracking-[-0.02em]">{item.title}</span>
                      </div>
                      <p className="body !text-[14px] pl-10">{item.note}</p>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 pt-8 border-t hairline flex flex-col gap-4">
                  <a href="mailto:hello@floxr.co" className="ul-draw w-fit text-[16px] font-light" style={{ color: 'var(--text-1)' }}>
                    hello@floxr.co
                  </a>
                  <a
                    href="https://wa.me/message"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ul-draw w-fit text-[15px] font-light"
                    style={{ color: 'var(--text-2)' }}
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://instagram.com/floxr.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ul-draw w-fit text-[15px] font-light"
                    style={{ color: 'var(--text-2)' }}
                  >
                    Instagram @floxr.co
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <Reveal delay={80}>
                <Spotlight className="plane p-7 md:p-12 rounded-[22px]">
                  {status === 'sent' ? (
                    <div className="py-20 flex flex-col items-center text-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mb-7"
                        style={{ backgroundColor: 'var(--signal-lo)' }}
                      >
                        <Check size={24} strokeWidth={1.6} style={{ color: 'var(--signal)' }} />
                      </div>
                      <h2 className="display-md2 mb-4">Brief received.</h2>
                      <p className="body max-w-sm mb-10">
                        We&apos;ll reply to <strong style={{ color: 'var(--text-1)' }}>{draft.email}</strong> within
                        24 hours. If it&apos;s urgent, email us directly and it&apos;ll jump the queue.
                      </p>
                      <Link href="/work" className="btn-pill btn-paper">
                        See our work in the meantime
                        <ArrowUpRight size={15} strokeWidth={1.75} />
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={submit} className="flex flex-col gap-10">
                      {/* Service chips */}
                      <fieldset>
                        <legend className="eyebrow mb-5">What do you need?</legend>
                        <div className="flex flex-wrap gap-2.5">
                          {SERVICES.map((s) => {
                            const on = service === s.name;
                            return (
                              <button
                                type="button"
                                key={s.id}
                                onClick={() => setService(s.name)}
                                aria-pressed={on}
                                className="px-5 py-3 rounded-full text-[13.5px] font-light border transition-all duration-300"
                                style={{
                                  borderColor: on ? 'var(--signal)' : 'var(--line-1)',
                                  backgroundColor: on ? 'var(--signal-lo)' : 'transparent',
                                  color: on ? 'var(--text-1)' : 'var(--text-2)',
                                }}
                              >
                                {s.name}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <label className="block">
                          <span className="eyebrow block mb-3">Your name</span>
                          <input
                            required
                            value={draft.name}
                            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                            placeholder="Jane Doe"
                            className={field}
                            style={{ borderColor: 'var(--line-1)', color: 'var(--text-1)' }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--signal)')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line-1)')}
                          />
                        </label>
                        <label className="block">
                          <span className="eyebrow block mb-3">Email</span>
                          <input
                            required
                            type="email"
                            value={draft.email}
                            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                            placeholder="jane@company.com"
                            className={field}
                            style={{ borderColor: 'var(--line-1)', color: 'var(--text-1)' }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--signal)')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line-1)')}
                          />
                        </label>
                      </div>

                      <label className="block">
                        <span className="eyebrow block mb-3">
                          Company <span style={{ color: 'var(--text-3)' }}>— optional</span>
                        </span>
                        <input
                          value={draft.company}
                          onChange={(e) => setDraft({ ...draft, company: e.target.value })}
                          placeholder="Where you work"
                          className={field}
                          style={{ borderColor: 'var(--line-1)', color: 'var(--text-1)' }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--signal)')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line-1)')}
                        />
                      </label>

                      <fieldset>
                        <legend className="eyebrow mb-4">Timeline</legend>
                        <div className="flex flex-wrap gap-2">
                          {TIMELINES.map((t) => (
                            <button
                              type="button"
                              key={t}
                              onClick={() => setTimeline(t === timeline ? '' : t)}
                              aria-pressed={t === timeline}
                              className="px-4 py-2.5 rounded-full text-[13px] font-light border transition-all duration-300"
                              style={{
                                borderColor: t === timeline ? 'var(--signal)' : 'var(--line-1)',
                                backgroundColor: t === timeline ? 'var(--signal-lo)' : 'transparent',
                                color: t === timeline ? 'var(--text-1)' : 'var(--text-2)',
                              }}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </fieldset>

                      <label className="block">
                        <span className="eyebrow block mb-3">What are you building?</span>
                        <textarea
                          required
                          rows={5}
                          value={draft.message}
                          onChange={(e) => setDraft({ ...draft, message: e.target.value })}
                          placeholder="What it should do, who it's for, and anything you already have running."
                          className={`${field} resize-none`}
                          style={{ borderColor: 'var(--line-1)', color: 'var(--text-1)' }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--signal)')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line-1)')}
                        />
                      </label>

                      {status === 'error' && (
                        <div
                          className="rounded-2xl p-5 text-[14px] leading-relaxed"
                          style={{ backgroundColor: 'var(--signal-lo)', color: 'var(--text-1)' }}
                        >
                          {error} Your brief hasn&apos;t been lost —{' '}
                          <a href={mailtoFallback()} className="underline underline-offset-4">
                            send it by email instead
                          </a>{' '}
                          and everything you typed comes with it.
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center gap-5 cta-row">
                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="btn-pill btn-ink disabled:opacity-60"
                        >
                          {status === 'sending' ? (
                            <>
                              <Loader2 size={15} className="animate-spin" /> Sending…
                            </>
                          ) : (
                            <>
                              Send Brief <ArrowUpRight size={15} strokeWidth={1.9} />
                            </>
                          )}
                        </button>
                        <p className="body !text-[13px]">
                          No newsletter, no sales sequence. We reply once, personally.
                        </p>
                      </div>
                    </form>
                  )}
                </Spotlight>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Working with us ── */}
        <section className="border-t hairline" style={{ backgroundColor: 'var(--plane-1)' }}>
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-14 md:py-24">
            <Reveal>
              <p className="eyebrow mb-8">Working With Us</p>
              <h2 className="display-lg2 mb-14 max-w-2xl">
                The practical <span className="font-serif-it">details</span>.
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
              {WORKING_FACTS.map((fact, i) => (
                <Reveal key={fact.label} delay={i * 70}>
                  <div className="border-t hairline pt-7">
                    <p className="eyebrow mb-4">{fact.label}</p>
                    <p className="text-[21px] font-light tracking-[-0.028em] mb-3" style={{ color: 'var(--text-1)' }}>
                      {fact.value}
                    </p>
                    <p className="body !text-[14px]">{fact.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
