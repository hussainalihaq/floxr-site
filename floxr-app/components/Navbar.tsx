'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  const [isFloating, setIsFloating] = useState(false);
  const pathname = usePathname();

  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number; show: boolean }>({ x: 0, w: 0, show: false });

  useEffect(() => {
    const onScroll = () => setIsFloating(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Park the sliding pill on the active link whenever the route changes.
  const settle = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>('[data-active="true"]');
    if (!active) return setPill((p) => ({ ...p, show: false }));
    setPill({ x: active.offsetLeft, w: active.offsetWidth, show: true });
  }, []);

  useEffect(() => {
    settle();
    window.addEventListener('resize', settle);
    return () => window.removeEventListener('resize', settle);
  }, [pathname, settle]);

  const glide = (el: HTMLElement) => setPill({ x: el.offsetLeft, w: el.offsetWidth, show: true });

  return (
    <>
      <style>{`
        @keyframes navLinkIn { from { opacity:0; transform: translateY(26px);} to { opacity:1; transform:none; } }
        .mobile-link-animate { opacity:0; animation: navLinkIn .6s cubic-bezier(.16,1,.3,1) forwards; }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-[100] px-3 md:px-6 pt-3 md:pt-4">
        <nav
          className={`nav-pill max-w-[1200px] mx-auto ${isFloating ? 'is-floating' : ''}`}
          
        >
          <div className="flex items-center justify-between gap-6 h-[62px] md:h-[68px] px-5 md:px-6">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0" aria-label="Floxr home">
              <img src="/floxr-logo.svg" alt="Floxr" className="brand-mark h-[22px] md:h-6 w-auto" />
            </Link>

            {/* Desktop links with a pill that glides between them */}
            <div
              ref={listRef}
              className="hidden md:flex items-center relative"
              onMouseLeave={settle}
            >
              <span
                className="nav-ind"
                style={{
                  transform: `translateX(${pill.x}px)`,
                  width: pill.w,
                  height: 34,
                  top: '50%',
                  marginTop: -17,
                  opacity: pill.show ? 1 : 0,
                }}
                aria-hidden="true"
              />
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-active={isActive || undefined}
                    onMouseEnter={(e) => glide(e.currentTarget)}
                    className="relative z-10 px-4 py-2 text-[13.5px] font-light tracking-[-0.008em] transition-colors duration-300"
                    style={{ color: isActive ? 'var(--text-1)' : 'var(--text-2)' }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link href="/contact" className="btn-pill btn-ink !py-2.5 !px-5 !text-[13px]">
                Start a Project
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-2 relative z-[110]">
              <ThemeToggle />
              <button
                className="p-2"
                style={{ color: 'var(--text-1)' }}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[90] flex flex-col px-7 pt-28 pb-10 md:hidden overflow-y-auto transition-opacity duration-500 ${
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
                      className="text-[32px] font-light tracking-[-0.035em] leading-none"
                      style={{ color: isActive ? 'var(--text-1)' : 'var(--text-2)' }}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-12 mobile-link-animate" style={{ animationDelay: `${NAV_LINKS.length * 0.07}s` }}>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-pill btn-ink w-full">
                Start a Project
              </Link>
              <p className="eyebrow text-center mt-7">hello@floxr.co</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
