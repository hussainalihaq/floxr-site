'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import HeroOrb from './HeroOrb';

export default function HeroSection() {
  useEffect(() => {
    // Setup GSAP animations after the preloader (approx 1200ms total)
    const tl = gsap.timeline({ delay: 1.2 });
    
    // Top label
    tl.fromTo(".hero-label", 
      { y: -8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
    
    // Headline staggering
    tl.fromTo(".hero-headline-line span",
      { clipPath: "inset(0 0 100% 0)", y: 20 },
      { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" },
      "-=0.1"
    );
    
    // Subheadline
    tl.fromTo(".hero-subheadline",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "+=0.2"
    );
    
    // CTAs
    tl.fromTo(".hero-cta",
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col pt-[64px] overflow-hidden bg-[radial-gradient(ellipse_at_top_left,var(--glow-lime),transparent_50%)]">
      {/* Content wrapper */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Left Side: Typography (58%) */}
        <div className="w-full lg:w-[58%] flex flex-col justify-center pb-24 lg:pb-0 pt-20 lg:pt-0 z-10 relative">
          
          <div className="hero-label opacity-0 font-[var(--font-mono)] text-[11px] text-[var(--lime)] tracking-[0.2em] mb-8">
            [ SOFTWARE STUDIO — LAHORE · 2024 ]
          </div>
          
          <h1 className="font-[var(--font-display)] text-[var(--text)] font-extrabold leading-[0.95] mb-8 uppercase flex flex-col gap-2">
             {/* fluid typography using clamp */}
             <div className="hero-headline-line overflow-hidden py-1"><span className="block text-[clamp(72px,9vw,140px)]">WE BUILD</span></div>
             <div className="hero-headline-line overflow-hidden py-1"><span className="block text-[clamp(72px,9vw,140px)] text-[var(--text-muted)]">SOFTWARE</span></div>
             <div className="hero-headline-line overflow-hidden py-1"><span className="block text-[clamp(72px,9vw,140px)]">THAT SHIPS.</span></div>
          </h1>
          
          <p className="hero-subheadline opacity-0 font-[var(--font-body)] text-[22px] text-[var(--muted)] mb-12 max-w-lg leading-relaxed">
            Apps · Automation · AI · Web · Mobile · Everything software.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a href="#contact" className="hero-cta opacity-0 bg-[var(--lime)] text-[var(--bg)] font-[var(--font-mono)] text-[14px] px-7 py-3.5 rounded-full hover:scale-[1.02] transition-transform">
              Start a Project <span className="ml-1">→</span>
            </a>
            
            <a href="#work" className="hero-cta opacity-0 border-[0.5px] border-[var(--border)] text-[var(--muted)] font-[var(--font-mono)] text-[14px] px-7 py-3.5 rounded-full hover:border-[var(--text)] hover:text-[var(--text)] transition-colors duration-300">
              See Our Work
            </a>
          </div>
        </div>
        
        {/* Right Side: 3D Orb (42%) */}
        <div className="hidden lg:block w-[42%] h-full absolute right-0 top-0 pointer-events-none">
          <div className="w-full h-full pointer-events-auto">
            <HeroOrb />
          </div>
        </div>
        
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-[1px] h-[60px] bg-[var(--border)] relative overflow-hidden">
          {/* We'll use CSS for this simple infinite animation */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[var(--lime)] animate-scroll-dot" />
        </div>
        <span className="font-[var(--font-mono)] text-[10px] text-[var(--subtle)] uppercase">scroll</span>
      </div>
    </section>
  );
}
