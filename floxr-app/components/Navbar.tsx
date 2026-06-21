'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-max rounded-full bg-background/80 backdrop-blur-xl border border-outline-variant/60 shadow-[0_4px_24px_rgba(0,0,0,0.04)]' 
            : 'top-0 left-0 w-full bg-background border-b border-outline-variant'
        }`}
      >
        <div className={`flex justify-between items-center mx-auto transition-all duration-300 ${
          isScrolled 
            ? 'px-5 py-2.5 gap-6 md:gap-16' 
            : 'px-6 md:px-12 py-4 w-full max-w-[1440px]'
        }`}>
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0">
            <img 
              src="/floxr-logo.svg" 
              alt="FLOXR" 
              className={`w-auto transition-all duration-300 ${isScrolled ? 'h-6' : 'h-8 md:h-10'}`} 
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className={`hidden md:flex items-center font-body-md text-body-md uppercase tracking-widest transition-all duration-300 ${isScrolled ? 'gap-6' : 'gap-gutter'}`}>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/work">Work</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/audit">Audit</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/capabilities">Capabilities</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/lab">Lab</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/contact">Contact</Link>
          </div>

          {/* Get Started Button */}
          <Link
            href="/contact"
            className={`bg-primary text-on-primary font-label-mono text-label-mono uppercase hover:opacity-90 transition-all duration-300 hidden md:block flex-shrink-0 ${
              isScrolled ? 'px-5 py-2 rounded-full' : 'px-6 py-3'
            }`}
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary p-1 -mr-1 flex-shrink-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[65px] bg-background z-[90] flex flex-col px-6 py-8 md:hidden overflow-y-auto animate-[fadeIn_0.2s_ease-out]">
          <div className="flex flex-col gap-8 font-headline-md text-headline-md text-primary mt-8">
            <Link href="/work" onClick={() => setIsOpen(false)} className="hover:text-secondary transition-colors">Work</Link>
            <Link href="/audit" onClick={() => setIsOpen(false)} className="hover:text-secondary transition-colors">Audit</Link>
            <Link href="/capabilities" onClick={() => setIsOpen(false)} className="hover:text-secondary transition-colors">Capabilities</Link>
            <Link href="/lab" onClick={() => setIsOpen(false)} className="hover:text-secondary transition-colors">Lab</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-secondary transition-colors">Contact</Link>
          </div>
          <div className="mt-auto pt-8 border-t border-outline-variant">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex justify-center w-full bg-primary text-on-primary font-label-mono text-label-mono uppercase px-6 py-4 hover:opacity-90 transition-opacity duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
