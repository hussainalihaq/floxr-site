'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full h-[64px] z-[50] transition-all duration-300 ease-out px-6 md:px-12 flex items-center justify-between
        ${scrolled ? 'bg-[rgba(8,8,8,0.85)] backdrop-blur-[16px] border-b border-[var(--border)]' : 'bg-transparent'}`}
      >
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src="/floxr-logo-dark.svg" alt="Floxr" className="h-[28px] w-auto" />
        </div>

        {/* Center: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Work', 'Process', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="group relative font-[var(--font-mono)] text-[12px] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--lime)] scale-x-0 origin-left transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* Right: CTA & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            className="hidden md:inline-flex items-center justify-center bg-[var(--lime)] text-[var(--bg)] font-[var(--font-mono)] text-[12px] px-5 py-2.5 rounded-full hover:scale-[1.02] transition-transform"
          >
            Start a Project <span className="ml-1">→</span>
          </a>
          
          <button 
            className="md:hidden flex flex-col gap-1.5 w-6 h-6 justify-center items-center"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <span className="w-full h-[1.5px] bg-[var(--text)]" />
            <span className="w-full h-[1.5px] bg-[var(--text)]" />
            <span className="w-full h-[1.5px] bg-[var(--text)]" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[var(--bg)] flex flex-col p-6">
          <div className="flex justify-between items-center h-[64px] mb-8">
            <img src="/floxr-logo-dark.svg" alt="Floxr" className="h-[32px] w-auto" />
            <button 
              className="w-10 h-10 flex items-center justify-center text-[var(--text)] text-2xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            {['Services', 'Work', 'Process', 'Contact'].map((item, i) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-[var(--font-display)] text-[48px] text-[var(--text)] animate-in slide-in-from-bottom-8 fade-in duration-300 fill-mode-both"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="mt-auto pb-8">
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center bg-[var(--lime)] text-[var(--bg)] font-[var(--font-mono)] text-[14px] px-6 py-4 rounded-full"
            >
              Start a Project <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
