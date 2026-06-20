'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('floxr_audit_popup_shown');
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setShowPopup(true);
      sessionStorage.setItem('floxr_audit_popup_shown', 'true');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ─── 1. FIXED TOP NAV BAR ─── */}
      <nav className="bg-background fixed top-0 w-full z-50 border-b border-outline-variant">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex gap-gutter items-center font-body-md text-body-md uppercase tracking-widest">
            <Link
              className="text-secondary hover:text-primary transition-colors duration-300"
              href="/work"
            >
              Work
            </Link>
            <Link
              className="text-secondary hover:text-primary transition-colors duration-300"
              href="#audit"
            >
              Audit
            </Link>
            <Link
              className="text-secondary hover:text-primary transition-colors duration-300"
              href="#capabilities"
            >
              Capabilities
            </Link>
            <Link
              className="text-secondary hover:text-primary transition-colors duration-300"
              href="#lab"
            >
              Lab
            </Link>
            <Link
              className="text-secondary hover:text-primary transition-colors duration-300"
              href="/contact"
            >
              Contact
            </Link>
          </div>

          {/* Get Started Button */}
          <Link
            href="/contact"
            className="bg-primary text-on-primary font-label-mono text-label-mono uppercase px-6 py-3 hover:opacity-90 transition-opacity duration-300 hidden md:block"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-primary">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* ─── 2. HERO SECTION ─── */}
        <section className="min-h-[80vh] flex flex-col justify-center py-section-gap">
          <h1 className="font-headline-lg text-display-lg text-primary max-w-4xl mb-8 leading-tight">
            We diagnose what is broken, design what should exist, and build what
            moves businesses forward.
          </h1>
          <p className="font-body-md text-body-lg text-secondary max-w-2xl mb-8 border-l-2 border-primary pl-4">
            Digital Architecture &amp; Product Systems for ambitious companies.
          </p>
          <div>
            <Link
              href="/work"
              className="inline-block bg-primary text-on-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:opacity-90 transition-opacity duration-300"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card: 01. Audit */}
            <div className="border border-outline-variant p-stack-lg bg-surface-container-lowest hover:bg-surface-alt transition-colors duration-300 group">
              <div className="text-primary mb-4 flex justify-between items-start">
                <h3 className="font-headline-lg text-headline-md">01. Audit</h3>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                  troubleshoot
                </span>
              </div>
              <p className="font-body-md text-body-md text-secondary mb-4 min-h-[4rem]">
                Deep forensic analysis of your existing digital footprint to
                identify critical failure points.
              </p>
              <ul className="space-y-4 border-t border-outline-variant pt-4 font-label-mono text-label-mono text-primary">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Website Performance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  UX/UI Teardowns
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Product Systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Operational Automation
                </li>
              </ul>
            </div>

            {/* Card: 02. Architect */}
            <div className="border border-outline-variant p-stack-lg bg-surface-container-lowest hover:bg-surface-alt transition-colors duration-300 group">
              <div className="text-primary mb-4 flex justify-between items-start">
                <h3 className="font-headline-lg text-headline-md">02. Architect</h3>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                  architecture
                </span>
              </div>
              <p className="font-body-md text-body-md text-secondary mb-4 min-h-[4rem]">
                Designing scalable systems, rigid structures, and precise
                blueprints for growth.
              </p>
              <ul className="space-y-4 border-t border-outline-variant pt-4 font-label-mono text-label-mono text-primary">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Design Systems
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Information Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Data Structuring
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Brand Frameworks
                </li>
              </ul>
            </div>

            {/* Card: 03. Build */}
            <div className="border border-outline-variant p-stack-lg bg-surface-container-lowest hover:bg-surface-alt transition-colors duration-300 group">
              <div className="text-primary mb-4 flex justify-between items-start">
                <h3 className="font-headline-lg text-headline-md">03. Build</h3>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
                  construction
                </span>
              </div>
              <p className="font-body-md text-body-md text-secondary mb-4 min-h-[4rem]">
                Executing the blueprint with high-performance engineering and
                uncompromised quality.
              </p>
              <ul className="space-y-4 border-t border-outline-variant pt-4 font-label-mono text-label-mono text-primary">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Web Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Custom Applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  CMS Integration
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary inline-block" />
                  Performance Tuning
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
              <div className="inline-block px-3 py-1 border border-on-primary/30 font-label-mono text-label-mono mb-4 uppercase tracking-wider">
                Proprietary Tool
              </div>
              <h2 className="font-headline-lg text-headline-lg mb-4">
                The Floxr Digital Audit™
              </h2>
              <p className="font-body-md text-body-lg text-on-primary/70 mb-8 max-w-xl">
                A rigorous, unvarnished review of your current tech stack, brand
                coherence, and operational efficiency. Stop guessing where
                you&apos;re losing money.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-on-primary text-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:opacity-90 transition-opacity duration-300"
              >
                Request an Audit
              </Link>
            </div>

            {/* Right Visual */}
            <div className="flex-1 w-full h-64 md:h-96 relative border border-on-primary/20 overflow-hidden flex items-center justify-center group bg-on-primary/5">
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <span className="material-symbols-outlined text-on-primary/20 text-[8rem] group-hover:scale-110 transition-transform duration-700 ease-out relative z-10">
                search_insights
              </span>
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-24 items-center">
            {/* Browser Mockup */}
            <div className="md:col-span-7 h-[400px] md:h-[500px] border border-outline-variant relative overflow-hidden bg-surface-alt flex flex-col">
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
            </div>

            {/* Case Details */}
            <div className="md:col-span-5 md:pl-8">
              <h3 className="font-headline-lg text-headline-md text-primary mb-3">
                AmeerGlobal Study Abroad & Immigration Consultancy
              </h3>
              <div className="flex gap-2 mb-6 flex-wrap">
                <span className="px-2 py-1 bg-surface-alt text-primary font-label-mono text-label-mono border border-outline-variant">
                  Web Platform
                </span>
                <span className="px-2 py-1 bg-surface-alt text-primary font-label-mono text-label-mono border border-outline-variant">
                  Full-Stack
                </span>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-outline-variant pl-4">
                  <span className="font-label-mono text-label-mono text-secondary uppercase block mb-1">
                    Problem
                  </span>
                  <p className="font-body-md text-body-md text-primary">
                    Complex immigration processes with fragmented client intake
                    and document management causing delays.
                  </p>
                </div>
                <div className="border-l-2 border-outline-variant pl-4">
                  <span className="font-label-mono text-label-mono text-secondary uppercase block mb-1">
                    Solution
                  </span>
                  <p className="font-body-md text-body-md text-primary">
                    Built end-to-end digital platform with automated workflows,
                    client portal, and real-time case tracking.
                  </p>
                </div>
                <div className="border-l-2 border-primary pl-4 bg-surface-alt p-3">
                  <span className="font-label-mono text-label-mono text-primary uppercase block mb-1">
                    Result
                  </span>
                  <p className="font-body-md text-body-md text-primary font-bold">
                    Client processing time reduced by 70%. Zero document loss
                    incidents.
                  </p>
                </div>
              </div>
              <a
                href="https://ameerglobal.ca"
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

            {/* Browser Mockup */}
            <div className="md:col-span-7 h-[400px] md:h-[500px] border border-outline-variant relative overflow-hidden bg-surface-alt flex flex-col order-1 md:order-2">
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
            </div>
          </div>
        </section>

        {/* ─── 6. THE LAB ─── */}
        <section id="lab" className="py-section-gap border-t border-outline-variant">
          <div className="mb-8 flex justify-between items-end">
            <h2 className="font-headline-lg text-headline-lg text-primary">
              The Lab
            </h2>
            <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest hidden md:block">
              Insights &amp; Teardowns
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter border-t border-l border-outline-variant">
            {/* Article 1 */}
            <Link
              className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group"
              href="/"
            >
              <span className="font-label-mono text-label-mono text-secondary uppercase mb-3 block">
                UX Teardown
              </span>
              <h3 className="font-body-md text-body-lg text-primary mb-8 group-hover:underline underline-offset-4">
                Why major SaaS platforms fail at complex navigation.
              </h3>
              <div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
                <span className="font-label-mono text-label-mono">Read</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </Link>

            {/* Article 2 */}
            <Link
              className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group"
              href="/"
            >
              <span className="font-label-mono text-label-mono text-secondary uppercase mb-3 block">
                Engineering
              </span>
              <h3 className="font-body-md text-body-lg text-primary mb-8 group-hover:underline underline-offset-4">
                Implementing AI: A pragmatic framework without the hype.
              </h3>
              <div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
                <span className="font-label-mono text-label-mono">Read</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </Link>

            {/* Article 3 */}
            <Link
              className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group"
              href="/"
            >
              <span className="font-label-mono text-label-mono text-secondary uppercase mb-3 block">
                Design Systems
              </span>
              <h3 className="font-body-md text-body-lg text-primary mb-8 group-hover:underline underline-offset-4">
                The ROI of rigid constraints in enterprise product design.
              </h3>
              <div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
                <span className="font-label-mono text-label-mono">Read</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </Link>

            {/* Article 4 */}
            <Link
              className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group"
              href="/"
            >
              <span className="font-label-mono text-label-mono text-secondary uppercase mb-3 block">
                View All
              </span>
              <h3 className="font-body-md text-body-lg text-primary mb-8 group-hover:underline underline-offset-4">
                Explore the complete archive of technical essays.
              </h3>
              <div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
                <span className="font-label-mono text-label-mono">Archive</span>
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
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
              className="h-8 brightness-0 invert mb-4"
            />
            <p className="font-body-md text-body-md text-on-primary/70 max-w-sm">
              © 2024 FLOXR. Digital Architecture Firm.
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
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-primary/70 hover:text-on-primary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
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
                href="/"
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
