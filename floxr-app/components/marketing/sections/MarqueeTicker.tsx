'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MARQUEE_TEXT = "MOBILE APPS · WEB APPLICATIONS · AI AUTOMATION · BUSINESS SOFTWARE · CUSTOM PLATFORMS · API INTEGRATIONS · MACHINE LEARNING · UI/UX DESIGN · ";

export default function MarqueeTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    
    // Create an infinite duplicate scrolling effect
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50, // Move left by 50% of the total width (which contains 2 sets of the original text)
      ease: "none",
      duration: 40,
      repeat: -1
    });

  }, []);

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      tweenRef.current?.pause();
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      tweenRef.current?.play();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-[60px] bg-[rgba(10,10,10,0.8)] backdrop-blur-xl border-y border-[rgba(184,255,87,0.15)] overflow-hidden flex items-center group cursor-default relative shadow-[0_0_30px_rgba(184,255,87,0.05)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={trackRef} 
        className="flex whitespace-nowrap min-w-max will-change-transform"
      >
        {/* We output the text 4 times to ensure it fills any screen and loops smoothly */}
        {[1, 2, 3, 4].map((i) => (
          <span 
            key={i}
            className="font-[var(--font-mono)] text-[14px] text-[var(--subtle)] tracking-[0.2em] px-6 group-hover:text-[var(--lime)] transition-colors duration-500 drop-shadow-[0_0_8px_rgba(184,255,87,0)] group-hover:drop-shadow-[0_0_8px_rgba(184,255,87,0.5)] font-medium"
          >
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
