'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setHidden(false);
      }
      
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div 
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex justify-center px-4 md:px-0 pointer-events-none 
          ${hidden && !mobileMenuOpen ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
        style={{ top: scrolled ? '16px' : '24px' }}
      >
        <nav 
          className={`pointer-events-auto h-[56px] md:h-[60px] flex items-center justify-between px-4 md:px-6 transition-all duration-500 ease-out 
            w-full max-w-[95vw] md:w-[700px] lg:w-[800px] xl:w-[880px] rounded-full border 
            ${scrolled 
              ? 'bg-[rgba(5,5,5,0.75)] backdrop-blur-2xl border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_rgba(0,0,0,0.6)]' 
              : 'bg-[rgba(5,5,5,0.4)] backdrop-blur-xl border-[rgba(255,255,255,0.04)]'}`}
        >
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center cursor-pointer">
              <img src="/floxr-logo-dark.svg" alt="Floxr" className="h-[40px] md:h-[44px] w-auto" />
            </a>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            {[
              { name: 'Services', href: '/#services' },
              { name: 'Work', href: '/work' },
              { name: 'Careers', href: '/careers' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="group relative font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-[#999] hover:text-white transition-colors duration-300"
              >
                {item.name}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white scale-0 transition-transform duration-300 ease-out group-hover:scale-100" />
              </a>
            ))}
          </div>

          {/* Right: CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA — subtle outline, not solid fill */}
            <a 
              href="/contact" 
              className="group hidden md:inline-flex relative overflow-hidden items-center justify-center h-[36px] bg-transparent border border-white text-white font-[var(--font-mono)] text-[10px] uppercase tracking-wider px-6 rounded-full transition-all duration-300"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">Start a Project</span>
              <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </a>
            
            {/* Mobile Hamburger — larger, more visible */}
            <button 
              className="md:hidden flex flex-col gap-[5px] w-10 h-10 justify-center items-center rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] active:scale-90 transition-all duration-200"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="w-[18px] h-[1.5px] bg-white rounded-full" />
              <span className="w-[14px] h-[1.5px] bg-white rounded-full" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[200] bg-[#030303] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Mobile header */}
        <div className="flex justify-between items-center h-[80px] px-6">
          <img src="/floxr-logo-dark.svg" alt="Floxr" className="h-[40px] w-auto" />
          <button 
            className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white active:scale-90 transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        
        {/* Nav links */}
        <div className="flex flex-col gap-1 px-6 mt-8">
          {[
            { name: 'Services', href: '/#services' },
            { name: 'Work', href: '/work' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' }
          ].map((item, i) => (
            <a 
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`py-5 border-b border-[#1a1a1a] font-[var(--font-display)] text-[32px] sm:text-[36px] text-white tracking-tight transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: `${mobileMenuOpen ? i * 75 : 0}ms` }}
            >
              {item.name}
            </a>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className={`mt-auto px-6 pb-10 transition-all duration-500 ease-out ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ transitionDelay: `${mobileMenuOpen ? 300 : 0}ms` }}
        >
          <a 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="w-full h-[56px] flex items-center justify-center bg-white text-black font-bold font-[var(--font-mono)] tracking-wider text-[13px] uppercase rounded-full shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-95 transition-all duration-200"
          >
            Start a Project
          </a>
        </div>
      </div>
    </>
  );
}
