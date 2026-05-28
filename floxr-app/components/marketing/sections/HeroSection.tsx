'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroOrb from './HeroOrb';

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 1. Background Parallax
    gsap.to(".hero-watermark", {
      y: (i, target) => i === 0 ? -100 : 100,
      ease: "none",
      scrollTrigger: {
        trigger: "section",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // 2. Ambient Floating Motion
    gsap.to(".top-orb", {
      x: "100%",
      y: "50%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to(".bottom-orb", {
      x: "-50%",
      y: "-30%",
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 3. Sequential Entrance Timeline
    const tl = gsap.timeline({ delay: 1.2 });
    
    tl.fromTo(".hero-label", 
      { y: -8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
    );
    
    tl.fromTo(".hero-headline-line span",
      { clipPath: "inset(0 0 100% 0)", y: 40 },
      { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1, stagger: 0.15, ease: "power4.out" },
      "-=0.1"
    );
    
    tl.fromTo(".hero-subheadline",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      "-=0.5"
    );
    
    tl.fromTo(".hero-cta",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    );
  }, []);

  const softwareChars = "SOFTWARE".split('');

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col pt-[64px] overflow-hidden bg-[radial-gradient(ellipse_at_top_left,var(--glow-lime),transparent_50%)]">
      
      {/* Massive Background Watermark Typography for Depth with Parallax */}
      <div className="hero-watermark absolute top-[20%] left-[-10%] select-none pointer-events-none z-0 opacity-[0.015] font-[var(--font-display)] text-[25vw] font-extrabold whitespace-nowrap -rotate-6 text-white">
        FLOXR FLOXR FLOXR
      </div>
      <div className="hero-watermark absolute top-[50%] left-[-5%] select-none pointer-events-none z-0 opacity-[0.015] font-[var(--font-display)] text-[25vw] font-extrabold whitespace-nowrap rotate-2 text-white">
        STUDIO STUDIO
      </div>

      {/* Floating Animated Orbs for "More Animation" */}
      <div className="top-orb absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[var(--lime)] rounded-full blur-[150px] opacity-[0.07] pointer-events-none z-0" />
      <div className="bottom-orb absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-white rounded-full blur-[200px] opacity-[0.03] pointer-events-none z-0" />

      {/* Content wrapper */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Left Side: Typography */}
        <div className="w-full lg:w-[58%] flex flex-col justify-center pb-24 lg:pb-0 pt-20 lg:pt-0 z-10 relative">
          
          <h1 className="font-[var(--font-display)] text-[var(--text)] font-extrabold leading-[0.88] mb-8 uppercase flex flex-col tracking-tighter">
             {/* fluid typography using clamp */}
             <div className="hero-headline-line overflow-hidden py-1"><span className="block text-[clamp(38px,8vw,140px)]">WE BUILD</span></div>
             <div className="hero-headline-line overflow-hidden py-1">
               <span 
                 className="block text-[clamp(38px,8vw,140px)] text-white font-black italic relative"
                 style={{ 
                   textShadow: '0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.1)',
                   WebkitTextStroke: '1px rgba(255,255,255,0.2)'
                 }}
               >
                 SOFTWARE
               </span>
             </div>
             <div className="hero-headline-line overflow-hidden py-1"><span className="block text-[clamp(38px,8vw,140px)]">THAT SHIPS.</span></div>
          </h1>
          
          <p className="hero-subheadline opacity-0 font-[var(--font-body)] text-[18px] md:text-[22px] text-[var(--muted)] mb-12 max-w-lg leading-relaxed">
            Apps · Automation · AI · Web · Mobile · Everything software.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <a href="/contact" className="hero-cta opacity-0 group relative overflow-hidden bg-transparent border border-white text-white font-bold font-[var(--font-mono)] text-[12px] px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
              <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-black">
                Start a Project <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-white scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </a>
            
            <a href="/work" className="hero-cta opacity-0 border border-[#555] text-[#ccc] font-[var(--font-mono)] text-[13px] px-7 py-3.5 rounded-full hover:border-white hover:text-white transition-all duration-300">
              See Our Work
            </a>
          </div>
        </div>
        
        {/* Right Side: 3D Orb */}
        <div className="hidden lg:block w-[42%] h-full absolute right-0 top-0 pointer-events-none">
          <div className="w-full h-full pointer-events-auto">
            <HeroOrb />
          </div>
        </div>
        
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="w-[1px] h-[60px] bg-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[var(--lime)] animate-scroll-dot" />
        </div>
        <span className="font-[var(--font-mono)] text-[10px] text-[var(--subtle)] uppercase">scroll</span>
      </div>
    </section>
  );
}
