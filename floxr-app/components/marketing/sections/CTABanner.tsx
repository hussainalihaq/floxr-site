'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const headline = "LET'S BUILD SOMETHING REAL.";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    // Get all span letters
    const letters = containerRef.current.querySelectorAll('.cta-letter');
    
    gsap.fromTo(letters,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03, // 30ms per letter stagger
        ease: "back.out(1.7)", // Gives a slight wave/bounce feel
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[var(--bg)] py-[160px] flex flex-col items-center justify-center relative overflow-hidden"
    >
      
      <span className="font-[var(--font-mono)] text-[11px] text-[var(--lime)] tracking-[0.3em] mb-8 z-10">
        READY?
      </span>

      <h2 className="font-[var(--font-display)] text-[clamp(64px,8vw,120px)] font-extrabold text-[var(--text)] leading-[0.95] text-center max-w-[1200px] mb-16 flex flex-wrap justify-center gap-x-4 z-10">
        {/* Split words then split letters */}
        {headline.split(' ').map((word, wordIndex) => (
          <div key={wordIndex} className="flex">
            {word.split('').map((letter, letterIndex) => (
              <span key={letterIndex} className="cta-letter inline-block">
                {letter}
              </span>
            ))}
          </div>
        ))}
      </h2>

      {/* Button with custom hover background slide */}
      <a 
        href="#contact"
        className="group relative inline-flex items-center justify-center font-[var(--font-display)] text-[16px] text-[#080808] font-bold px-12 py-[18px] rounded-full overflow-hidden transition-transform duration-200 hover:-translate-y-[2px]"
      >
        {/* Background Base */}
        <span className="absolute inset-0 bg-[var(--lime)] w-full h-full" />
        
        {/* Background Hover slide-in */}
        <span className="absolute inset-0 bg-[var(--heat)] translate-x-[-100%] transition-transform duration-300 ease-out origin-left group-hover:translate-x-0" />
        
        {/* Text and Icon */}
        <span className="relative flex items-center z-10 text-[var(--bg)] group-hover:text-[var(--text)] transition-colors duration-300">
          Start a Project
          {/* Arrow */}
          <span className="ml-2 font-[var(--font-mono)] overflow-hidden inline-flex translate-y-[2px]">
            {/* The arrow that appears */}
            <span className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
              ↗
            </span>
          </span>
        </span>
      </a>

    </section>
  );
}
