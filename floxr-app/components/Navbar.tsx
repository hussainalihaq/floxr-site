'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { href: '/work', label: 'Work' },
    { href: '/audit', label: 'Audit' },
    { href: '/capabilities', label: 'Capabilities' },
    { href: '/lab', label: 'Lab' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-link-animate {
          opacity: 0;
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      <nav 
        className={`fixed z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-max rounded-full bg-background/80 backdrop-blur-xl border border-outline-variant/60 shadow-[0_4px_24px_rgba(0,0,0,0.04)]' 
            : 'top-0 left-0 w-full bg-background border-b border-outline-variant/30'
        }`}
      >
        <div className={`flex justify-between items-center mx-auto transition-all duration-300 ${
          isScrolled 
            ? 'px-5 py-2.5 gap-6 md:gap-12 lg:gap-16' 
            : 'px-6 md:px-12 py-4 w-full max-w-[1440px]'
        }`}>
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0">
            <img 
              src="/floxr-logo.svg" 
              alt="FLOXR" 
              className={`w-auto transition-all duration-300 ${isScrolled ? 'h-6' : 'h-7 md:h-8'}`} 
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className={`hidden md:flex items-center text-[12px] font-medium uppercase tracking-widest transition-all duration-300 ${isScrolled ? 'gap-6' : 'gap-10'}`}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link 
                  key={link.href}
                  className={`relative py-1 transition-colors duration-300 ${
                    isActive 
                      ? 'text-primary font-bold' 
                      : 'text-secondary hover:text-primary'
                  }`} 
                  href={link.href}
                >
                  {link.label}
                  {/* Active Indicator Underline */}
                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-[1.5px] bg-primary rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Get Started Button */}
          <Link
            href="/contact"
            className={`text-[12px] uppercase tracking-widest font-medium text-primary border border-outline-variant/60 hover:bg-surface-alt transition-all duration-300 hidden md:block flex-shrink-0 ${
              isScrolled ? 'px-5 py-2 rounded-full' : 'px-6 py-2.5 rounded'
            }`}
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary p-1 -mr-1 flex-shrink-0 relative z-[110]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 top-0 bg-background z-[90] flex flex-col px-8 py-24 md:hidden overflow-y-auto transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {isOpen && (
          <div className="flex flex-col gap-6 mt-4">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className={`mobile-link-animate text-[36px] tracking-tight transition-all duration-300 flex items-center gap-4 ${
                    isActive 
                      ? 'text-primary font-bold' 
                      : 'text-secondary hover:text-primary'
                  }`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {isActive && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>}
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
        
        {isOpen && (
          <div className="mt-auto pt-10 mobile-link-animate" style={{ animationDelay: `${navLinks.length * 0.08}s` }}>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex justify-center items-center w-full bg-primary text-on-primary text-[14px] font-medium tracking-widest uppercase px-6 py-5 rounded-full hover:bg-[#424245] transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
