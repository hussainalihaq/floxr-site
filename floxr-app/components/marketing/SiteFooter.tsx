import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="w-full" style={{ backgroundColor: 'var(--color-ink)', color: 'var(--color-paper)' }}>
      {/* Top CTA band */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-20">
        <p className="eyebrow text-[var(--color-rust-lt)] mb-6">Next Steps</p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <h2 className="display-lg2 max-w-2xl">
            Have a project in mind? Let&apos;s build it{' '}
            <span className="font-serif-it font-normal">right</span>.
          </h2>
          <Link href="/contact" className="btn-pill btn-paper flex-shrink-0">
            Start a Conversation
            <ArrowUpRight size={14} strokeWidth={2.25} />
          </Link>
        </div>
      </div>

      {/* Link columns */}
      <div className="border-t" style={{ borderColor: 'var(--color-line-dark)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-16 grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-5">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-8 brightness-0 invert mb-5" />
            <p className="text-[15px] leading-relaxed max-w-xs" style={{ color: 'var(--color-mist-dark)' }}>
              A small product studio. We design and build the websites, platforms, and dashboards
              your business runs on — clear scope, fixed quotes, fast delivery.
            </p>
            <a
              href="mailto:hello@floxr.co"
              className="eyebrow inline-block mt-6 text-[var(--color-paper)] hover:text-[var(--color-rust-lt)] transition-colors"
            >
              hello@floxr.co
            </a>
          </div>

          {/* Explore */}
          <div className="md:col-span-2 md:col-start-7">
            <p className="eyebrow mb-5" style={{ color: 'var(--color-mist-dark)' }}>Explore</p>
            <ul className="space-y-3.5 text-[15px]">
              <li><Link href="/work" className="hover:text-[var(--color-rust-lt)] transition-colors">Work</Link></li>
              <li><Link href="/capabilities" className="hover:text-[var(--color-rust-lt)] transition-colors">Capabilities</Link></li>
              <li><Link href="/audit" className="hover:text-[var(--color-rust-lt)] transition-colors">The Audit</Link></li>
              <li><Link href="/lab" className="hover:text-[var(--color-rust-lt)] transition-colors">The Lab</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <p className="eyebrow mb-5" style={{ color: 'var(--color-mist-dark)' }}>Company</p>
            <ul className="space-y-3.5 text-[15px]">
              <li><Link href="/about" className="hover:text-[var(--color-rust-lt)] transition-colors">About</Link></li>
              <li><Link href="/careers" className="hover:text-[var(--color-rust-lt)] transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--color-rust-lt)] transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--color-rust-lt)] transition-colors">Privacy</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2">
            <p className="eyebrow mb-5" style={{ color: 'var(--color-mist-dark)' }}>Connect</p>
            <ul className="space-y-3.5 text-[15px]">
              <li>
                <a href="https://linkedin.com/company/floxr" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-rust-lt)] transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://instagram.com/floxr.co" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-rust-lt)] transition-colors">
                  Instagram <span style={{ color: 'var(--color-mist-dark)' }}>@floxr.co</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'var(--color-line-dark)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="eyebrow" style={{ color: 'var(--color-mist-dark)' }}>
            © 2026 FLOXR — All Rights Reserved
          </p>
          <p className="eyebrow" style={{ color: 'var(--color-mist-dark)' }}>
            Built In House · Global, Remote-First
          </p>
        </div>
      </div>
    </footer>
  );
}
