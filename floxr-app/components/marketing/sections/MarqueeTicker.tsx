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
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.play();
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-[48px] bg-[var(--surface)] border-y border-[var(--border)] overflow-hidden flex items-center group cursor-default"
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
            className="font-[var(--font-mono)] text-[12px] text-[var(--subtle)] tracking-[0.15em] px-4 group-hover:text-[var(--muted)] transition-colors duration-300"
          >
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
