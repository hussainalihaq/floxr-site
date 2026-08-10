import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_LINE } from '@/lib/site-content';

const COLUMNS = [
  {
    label: 'Company',
    links: [
      { href: '/work', text: 'Work' },
      { href: '/capabilities', text: 'Capabilities' },
      { href: '/about', text: 'About' },
      { href: '/careers', text: 'Careers' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { href: '/lab', text: 'The Lab' },
      { href: '/contact', text: 'Contact' },
      { href: '/privacy', text: 'Privacy' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: 'var(--void)' }}>
      <div className="aura w-[640px] h-[640px] -bottom-80 left-1/2 -translate-x-1/2" />

      {/* Closing statement */}
      <div className="border-t hairline relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-24 md:pt-36 pb-20 md:pb-28">
          <p className="eyebrow mb-8">Next Step</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <h2 className="display-lg2 max-w-3xl">
              Tell us what you need built. We&apos;ll come back with scope, timeline, and a{' '}
              <span className="font-serif-it">fixed price</span>.
            </h2>
            <Link href="/contact" className="btn-pill btn-ink flex-shrink-0">
              Start a Conversation
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </Link>
          </div>
        </div>
      </div>

      {/* Directory */}
      <div className="border-t hairline relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20 grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-14">
          <div className="col-span-2 md:col-span-5">
            <img src="/floxr-logo.svg" alt="Floxr" className="h-7 brightness-0 invert mb-7" />
            <p className="body max-w-xs mb-8">{COMPANY_LINE}</p>
            <a
              href="mailto:hello@floxr.co"
              className="text-[15px] font-light transition-colors duration-300 hover:text-[var(--signal)]"
              style={{ color: 'var(--text-1)' }}
            >
              hello@floxr.co
            </a>
          </div>

          {COLUMNS.map((column, i) => (
            <div key={column.label} className={i === 0 ? 'md:col-span-2 md:col-start-7' : 'md:col-span-2'}>
              <p className="eyebrow mb-6">{column.label}</p>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] font-light transition-colors duration-300 hover:text-[var(--text-1)]"
                      style={{ color: 'var(--text-2)' }}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <p className="eyebrow mb-6">Connect</p>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://linkedin.com/company/floxr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-light transition-colors duration-300 hover:text-[var(--text-1)]"
                  style={{ color: 'var(--text-2)' }}
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/floxr.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-light transition-colors duration-300 hover:text-[var(--text-1)]"
                  style={{ color: 'var(--text-2)' }}
                >
                  Instagram <span style={{ color: 'var(--text-3)' }}>@floxr.co</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Baseline */}
      <div className="border-t hairline relative z-10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-7 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="eyebrow">© 2026 Floxr — All Rights Reserved</p>
          <p className="eyebrow">Global · Remote-First</p>
        </div>
      </div>
    </footer>
  );
}
