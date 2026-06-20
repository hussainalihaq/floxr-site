'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-background fixed top-0 w-full z-[100] border-b border-outline-variant transition-colors duration-200">
        <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/" onClick={() => setIsOpen(false)}>
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex gap-gutter items-center font-body-md text-body-md uppercase tracking-widest">
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/work">Work</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/audit">Audit</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/capabilities">Capabilities</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/lab">Lab</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/contact">Contact</Link>
          </div>

          {/* Get Started Button */}
          <Link
            href="/contact"
            className="bg-primary text-on-primary font-label-mono text-label-mono uppercase px-6 py-3 hover:opacity-90 transition-opacity duration-300 hidden md:block"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary p-2 -mr-2"
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
