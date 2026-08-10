'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/marketing/ThemeToggle';

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/lab', label: 'Lab' },
  { href: '/contact', label: 'Contact' },
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
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .mobile-link-animate {
          opacity: 0;
          animation: navLinkIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <nav
        className="fixed top-0 left-0 w-full z-[100] transition-colors duration-500"
        style={{
          backgroundColor: isScrolled ? 'var(--nav-scrim)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(140%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(140%)' : 'none',
          borderBottom: `1px solid ${isScrolled ? 'var(--line-1)' : 'transparent'}`,
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-[76px] md:h-[88px] flex items-center justify-between gap-8">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0" aria-label="Floxr home">
            <img src="/floxr-logo.svg" alt="Floxr" className="brand-mark h-6 md:h-7 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-[14px] font-light tracking-[-0.008em] transition-colors duration-300"
                  style={{ color: isActive ? 'var(--text-1)' : 'var(--text-2)' }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-2 left-0 w-full h-px"
                      style={{ backgroundColor: 'var(--signal)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link href="/contact" className="btn-pill btn-ink !py-2.5 !px-6 !text-[13px]">
              Start a Project
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3 relative z-[110]">
            <ThemeToggle />
          <button
            className="p-1 -mr-1"
            style={{ color: 'var(--text-1)' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} strokeWidth={1.25} /> : <Menu size={24} strokeWidth={1.25} />}
          </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col px-8 pt-32 pb-12 md:hidden overflow-y-auto transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'var(--void)' }}
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
                    className="mobile-link-animate flex items-baseline gap-5 py-6 border-b hairline"
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    <span className="eyebrow" style={{ color: 'var(--signal)' }}>0{i + 1}</span>
                    <span
                      className="text-[34px] font-light tracking-[-0.035em] leading-none"
                      style={{ color: isActive ? 'var(--text-1)' : 'var(--text-2)' }}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-14 mobile-link-animate" style={{ animationDelay: `${NAV_LINKS.length * 0.07}s` }}>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-pill btn-ink w-full">
                Start a Project
              </Link>
              <p className="eyebrow text-center mt-8">hello@floxr.co</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
