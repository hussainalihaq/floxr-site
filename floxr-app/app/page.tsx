'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Temporarily removing sessionStorage check so the popup reliably appears for the user.
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ─── 1. FIXED TOP NAV BAR ─── */}
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 pt-[72px] md:pt-[80px]">
        {/* ─── 2. HERO SECTION ─── */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center pt-0 pb-12 md:py-section-gap overflow-hidden">
          {/* Abstract background pattern to feel less empty */}
          <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
          </div>
          
          <h1 className="font-headline-lg text-[40px] md:text-[80px] text-primary max-w-4xl mb-6 md:mb-8 leading-tight tracking-tight mt-8 md:mt-0">
            We diagnose what is broken, design what should exist, and build what
            moves businesses forward.
          </h1>
          <hr className="w-12 border-t-2 border-primary mb-6" />
          <p className="font-body-md text-[18px] md:text-[24px] text-primary max-w-2xl mb-8 leading-relaxed">
            Digital architecture is destiny. The structural integrity of your platforms determines the ceiling of your growth. We construct the foundation.
          </p>
          <div>
            <Link
              href="/work"
              className="inline-block bg-primary text-on-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:bg-surface-tint hover:scale-[1.02] transition-all duration-300 shadow-sm"
            >
              Explore Our Work
            </Link>
          </div>
        </section>

        {/* ─── 3. THE CORE FRAMEWORK ─── */}
        <section id="capabilities" className="py-section-gap border-t border-outline-variant">
          <div className="mb-8 flex justify-between items-end">
            <h2 className="font-headline-lg text-headline-lg text-primary">
              The Core Framework
            </h2>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest hidden md:block">
              Capabilities
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card: 01. Audit */}
            <div className="border border-outline-variant p-8 bg-surface-container-lowest">
              <div className="text-primary mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-outline">
                  troubleshoot
                </span>
                <h3 className="font-headline-lg text-[24px] font-bold">Audit</h3>
              </div>
              <ul className="space-y-4 border-t border-outline-variant pt-6 font-body-md text-[14px] text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  System mapping & technical debt analysis.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  User experience friction identification.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Performance & scalability benchmarks.
                </li>
              </ul>
            </div>

            {/* Card: 02. Architect */}
            <div className="border border-outline-variant p-8 bg-surface-container-lowest">
              <div className="text-primary mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-outline">
                  architecture
                </span>
                <h3 className="font-headline-lg text-[24px] font-bold">Architect</h3>
              </div>
              <ul className="space-y-4 border-t border-outline-variant pt-6 font-body-md text-[14px] text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Scalable infrastructure blueprints.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Design system & token engineering.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Data flow & API structural design.
                </li>
              </ul>
            </div>

            {/* Card: 03. Build */}
            <div className="border border-outline-variant p-8 bg-surface-container-lowest">
              <div className="text-primary mb-6 flex items-center gap-3">
                <span className="material-symbols-outlined text-outline">
                  construction
                </span>
                <h3 className="font-headline-lg text-[24px] font-bold">Build</h3>
              </div>
              <ul className="space-y-4 border-t border-outline-variant pt-6 font-body-md text-[14px] text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  High-fidelity front-end implementation.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Robust back-end service integration.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">-</span>
                  Continuous deployment pipelines.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ─── 4. LEAD MAGNET – THE FLOXR DIGITAL AUDIT™ ─── */}
        <section id="audit" className="py-section-gap">
          <div className="bg-primary text-on-primary p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            {/* Left Content */}
            <div className="flex-1">
              <div className="font-label-mono text-[10px] text-on-primary/70 mb-4 uppercase tracking-widest">
                DIAGNOSTIC PROTOCOL
              </div>
              <h2 className="font-headline-lg text-[40px] md:text-[56px] leading-tight mb-6">
                The Floxr Digital Audit™
              </h2>
              <p className="font-body-md text-[16px] text-on-primary/90 mb-8 max-w-xl leading-relaxed">
                Stop guessing where your digital product is leaking revenue. We provide a rigorous, objective tear-down of your platform's architecture and UX.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-on-primary text-primary font-label-mono text-[12px] uppercase px-8 py-4 hover:opacity-90 transition-opacity duration-300 w-full md:w-auto text-center"
              >
                REQUEST AN AUDIT
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 5. SELECTED TRANSFORMATIONS ─── */}
        <section className="py-section-gap border-t border-outline-variant">
          <div className="mb-8 flex justify-between items-end">
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Selected Transformations
            </h2>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest hidden md:block">
              Case Studies
            </span>
          </div>

          {/* Case Study 1 — AmeerGlobal */}
          <div className="mb-24">
            {/* Browser Mockup */}
            <a href="https://ameerglobal.ca" target="_blank" rel="noopener noreferrer" className="w-full h-[300px] md:h-[500px] border border-outline-variant relative overflow-hidden bg-surface-alt flex flex-col mb-8 hover:opacity-90 transition-opacity">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant bg-surface-container-lowest">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-surface-alt rounded-sm px-3 py-1 font-label-mono text-label-mono text-secondary text-center text-xs">
                    ameerglobal.ca
                  </div>
                </div>
              </div>
              {/* Page Body */}
              <div className="flex-1 bg-gradient-to-br from-primary/5 via-surface-alt to-primary/10 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="text-center relative z-10">
                  <span className="material-symbols-outlined text-primary/20 text-[4rem] mb-2 block">
                    public
                  </span>
                  <span className="font-headline-lg text-headline-md text-primary/40">
                    ameerglobal.ca
                  </span>
                </div>
              </div>
            </a>

            {/* Case Details */}
            <div className="md:px-8">
              <h3 className="font-headline-lg text-[32px] md:text-[40px] font-bold text-primary mb-8">
                AmeerGlobal Trading & Imports
              </h3>
              
              <div className="space-y-6">
                <div className="border-l-2 border-outline-variant pl-4">
                  <span className="font-label-mono text-[10px] text-secondary uppercase block mb-2 tracking-widest">
                    PROBLEM
                  </span>
                  <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                    A premium international trading company based in Toronto, specializing in import and export partnerships across commodities and logistics.
                  </p>
                </div>
                <div className="border-l-2 border-outline-variant pl-4">
                  <span className="font-label-mono text-[10px] text-secondary uppercase block mb-2 tracking-widest">
                    SOLUTION
                  </span>
                  <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                    Built a modern digital storefront and operational platform to streamline private-label supply and global commodity trading.
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <span className="font-label-mono text-[10px] text-primary uppercase block mb-2 tracking-widest">
                    RESULT
                  </span>
                  <p className="font-body-md text-[14px] text-primary font-bold">
                    Elevated brand positioning and enabled seamless sourcing of premium goods globally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Study 2 — Juriq */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            {/* Case Details (left on desktop for alternating layout) */}
            <div className="md:col-span-5 md:pr-8 order-2 md:order-1">
              <h3 className="font-headline-lg text-headline-md text-primary mb-3">
                Juriq AI Legal Research
              </h3>
              <div className="flex gap-2 mb-6 flex-wrap">
                <span className="px-2 py-1 bg-surface-alt text-primary font-label-mono text-label-mono border border-outline-variant">
                  AI Platform
                </span>
                <span className="px-2 py-1 bg-surface-alt text-primary font-label-mono text-label-mono border border-outline-variant">
                  SaaS
                </span>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-outline-variant pl-4">
                  <span className="font-label-mono text-label-mono text-secondary uppercase block mb-1">
                    Problem
                  </span>
                  <p className="font-body-md text-body-md text-primary">
                    Legal professionals spending 15+ hours per case on manual
                    research across scattered databases.
                  </p>
                </div>
                <div className="border-l-2 border-outline-variant pl-4">
                  <span className="font-label-mono text-label-mono text-secondary uppercase block mb-1">
                    Solution
                  </span>
                  <p className="font-body-md text-body-md text-primary">
                    AI-powered legal research assistant with GPT-4 integration,
                    automated brief generation, and precedent matching.
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4 bg-surface-alt p-3">
                  <span className="font-label-mono text-label-mono text-primary uppercase block mb-1">
                    Result
                  </span>
                  <p className="font-body-md text-body-md text-primary font-bold">
                    Case prep time reduced by 80%. Adopted by 200+ legal
                    professionals.
                  </p>
                </div>
              </div>
              <a
                href="https://juriq.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 font-label-mono text-label-mono text-primary uppercase hover:opacity-70 transition-opacity"
              >
                View Live
                <span className="material-symbols-outlined text-sm">
                  arrow_outward
                </span>
              </a>
            </div>

            <a href="https://juriq.app" target="_blank" rel="noopener noreferrer" className="md:col-span-7 h-[400px] md:h-[500px] border border-outline-variant relative overflow-hidden bg-surface-alt flex flex-col order-1 md:order-2 hover:opacity-90 transition-opacity">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant bg-surface-container-lowest">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-surface-alt rounded-sm px-3 py-1 font-label-mono text-label-mono text-secondary text-center text-xs">
                    juriq.app
                  </div>
                </div>
              </div>
              {/* Page Body */}
              <div className="flex-1 bg-gradient-to-br from-primary/10 via-surface-alt to-primary/5 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="text-center relative z-10">
                  <span className="material-symbols-outlined text-primary/20 text-[4rem] mb-2 block">
                    smart_toy
                  </span>
                  <span className="font-headline-lg text-headline-md text-primary/40">
                    juriq.app
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* ─── 6. THE LAB ─── */}
        <section id="lab" className="py-section-gap border-t border-outline-variant">
          <div className="mb-8">
            <h2 className="font-headline-lg text-[40px] md:text-[56px] leading-tight mb-4 text-primary">
              The Lab
            </h2>
          </div>
          <div className="flex flex-col border-t border-outline-variant">
            {/* Article 1 */}
            <Link
              className="border-b border-outline-variant py-8 block group"
              href="/lab/death-of-decorative-ui"
            >
              <span className="font-label-mono text-[10px] bg-surface-alt px-3 py-1 text-secondary uppercase mb-4 inline-block tracking-widest">
                LATEST
              </span>
              <h3 className="font-headline-lg text-[24px] md:text-[32px] font-bold text-primary mb-4 group-hover:opacity-80 transition-opacity">
                The Death of Decorative UI
              </h3>
              <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                Why pure structural design outlasts trend cycles and drives higher enterprise value.
              </p>
            </Link>

            {/* Article 2 */}
            <Link
              className="border-b border-outline-variant py-8 block group"
              href="/lab/micro-frontends-in-practice"
            >
              <span className="font-label-mono text-[10px] bg-surface-alt px-3 py-1 text-secondary uppercase mb-4 inline-block tracking-widest">
                TECHNICAL
              </span>
              <h3 className="font-headline-lg text-[24px] md:text-[32px] font-bold text-primary mb-4 group-hover:opacity-80 transition-opacity">
                Micro-Frontends in Practice
              </h3>
              <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                Architectural strategies for scaling development teams without increasing technical debt.
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* ─── 7. FOOTER ─── */}
      <footer className="bg-primary w-full">
        <div className="grid grid-cols-12 gap-gutter px-6 md:px-12 py-section-gap max-w-[1440px] mx-auto text-on-primary">
          {/* Left: Logo + Copyright */}
          <div className="col-span-12 md:col-span-6 mb-8 md:mb-0">
            <img
              src="/floxr-logo.svg"
              alt="FLOXR"
              className="h-8 md:h-10 brightness-0 invert mb-4"
            />
            <p className="font-body-md text-body-md text-on-primary/70 max-w-sm">
              © 2026 FLOXR built in house.
            </p>
          </div>

          {/* Right Columns */}
          <div className="col-span-12 md:col-span-6 flex flex-col md:flex-row gap-12 md:justify-end">
            {/* Social */}
            <div className="flex flex-col gap-4 font-body-md text-body-md">
              <span className="font-label-mono text-label-mono text-on-primary/50 uppercase">
                Social
              </span>
              <a
                href="https://linkedin.com/company/floxr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-primary/70 hover:text-on-primary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/floxr.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-primary/70 hover:text-on-primary transition-colors"
              >
                Instagram
              </a>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-4 font-body-md text-body-md">
              <span className="font-label-mono text-label-mono text-on-primary/50 uppercase">
                Legal
              </span>
              <Link
                href="/contact"
                className="text-on-primary/70 hover:text-on-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-on-primary/70 hover:text-on-primary transition-colors"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── 8. FREE AUDIT POPUP ─── */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-surface-container-lowest border border-outline-variant shadow-xl max-w-lg w-full p-8 md:p-10 relative animate-[scaleIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors"
              aria-label="Close popup"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Content */}
            <div className="text-4xl mb-4">🎯</div>
            <h2 className="font-headline-lg text-headline-md text-primary mb-3">
              Get Your Free Digital Audit
            </h2>
            <p className="font-body-md text-body-md text-secondary mb-6 leading-relaxed">
              For a limited time, we are offering a complimentary audit of your
              digital presence. Discover what is broken and what is costing you
              money.
            </p>
            <Link
              href="/contact"
              className="inline-block w-full text-center bg-primary text-on-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:opacity-90 transition-opacity duration-300"
              onClick={() => setShowPopup(false)}
            >
              Claim Your Free Audit
            </Link>
          </div>
        </div>
      )}

      {/* Keyframe animations for the popup */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
