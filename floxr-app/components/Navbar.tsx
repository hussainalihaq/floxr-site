'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/audit', label: 'Audit' },
  { href: '/lab', label: 'Lab' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @keyframes navLinkIn {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-link-animate {
          opacity: 0;
          animation: navLinkIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_1px_0_var(--color-line),0_8px_32px_rgba(18,18,20,0.05)]' : 'shadow-[0_1px_0_var(--color-line)]'
        }`}
        style={{ backgroundColor: 'rgba(250,249,245,0.88)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] md:h-[80px] flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0" aria-label="FLOXR home">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-7 md:h-8 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`eyebrow relative py-2 transition-colors duration-300 ${
                    isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-mist)] hover:text-[var(--color-ink)]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-rust)]" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Link href="/contact" className="btn-pill btn-ink hidden md:inline-flex !px-6 !py-3">
            Start a Project
            <ArrowUpRight size={14} strokeWidth={2.25} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[var(--color-ink)] p-1 -mr-1 relative z-[110]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col px-8 pt-28 pb-10 md:hidden overflow-y-auto transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'var(--color-paper)' }}
      >
        {isOpen && (
          <>
            <div className="flex flex-col">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="mobile-link-animate flex items-baseline gap-4 py-5 border-b hairline group"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    <span className="eyebrow text-[var(--color-rust)]">0{i + 1}</span>
                    <span
                      className={`text-[34px] font-bold tracking-tight leading-none ${
                        isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-mist)]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-12 mobile-link-animate" style={{ animationDelay: `${NAV_LINKS.length * 0.06}s` }}>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-pill btn-ink w-full">
                Start a Project
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </Link>
              <p className="eyebrow text-[var(--color-mist)] text-center mt-6">hello@floxr.co</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
