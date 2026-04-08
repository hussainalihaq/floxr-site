'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import gsap from 'gsap';

export default function WhyFloxrSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const [leftLinesStarted, setLeftLinesStarted] = useState(false);
  const [rightLinesStarted, setRightLinesStarted] = useState(false);

  const leftLines = [
    { text: "> initializing project...", type: "normal" },
    { text: "> ERROR: timeline undefined", type: "error" },
    { text: "> WARNING: scope creep detected", type: "warn" },
    { text: "> ERROR: designer left the company", type: "error" },
    { text: "> running estimate recalculation...", type: "normal" },
    { text: "> ERROR: budget exceeded (2.4x)", type: "error" },
    { text: "> > ghosting client...", type: "error" },
    { text: "> process terminated unexpectedly", type: "error" }
  ];

  const rightLines = [
    { text: "> initializing project...", type: "normal" },
    { text: "> discovery call complete ✓", type: "success" },
    { text: "> architecture locked ✓", type: "success" },
    { text: "> sprint 1 delivered on time ✓", type: "success" },
    { text: "> sprint 2 delivered on time ✓", type: "success" },
    { text: "> client review: approved ✓", type: "success" },
    { text: "> deployment successful ✓", type: "success" },
    { text: "> > system operational.", type: "normal" }
  ];

  const [visibleLeft, setVisibleLeft] = useState(0);
  const [visibleRight, setVisibleRight] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%", 
      onEnter: () => {
        setLeftLinesStarted(true);
        setTimeout(() => setRightLinesStarted(true), 400); // 400ms delay for right
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Animators
  useEffect(() => {
    if (leftLinesStarted && visibleLeft < leftLines.length) {
      const timer = setTimeout(() => {
        setVisibleLeft(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [leftLinesStarted, visibleLeft, leftLines.length]);

  useEffect(() => {
    if (rightLinesStarted && visibleRight < rightLines.length) {
      const timer = setTimeout(() => {
        setVisibleRight(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [rightLinesStarted, visibleRight, rightLines.length]);

  const getColor = (type: string) => {
    if (type === 'error') return 'text-[var(--heat)]';
    if (type === 'success') return 'text-[var(--lime)]';
    return 'text-[var(--muted)]';
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#0a0a0a] border-t border-[var(--border)] py-32 px-6 md:px-12 flex flex-col items-center">
      
      <span className="font-[var(--font-mono)] text-[11px] text-[var(--lime)] tracking-[0.2em] mb-12">
        WHY NOT JUST ANYONE
      </span>

      <div className="w-full max-w-[1100px] flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Left Terminal */}
        <div className="w-full md:w-1/2 border-[0.5px] border-[var(--border)] rounded-lg bg-[var(--bg)] flex flex-col overflow-hidden">
          {/* Chrome Bar */}
          <div className="h-[28px] bg-[#161616] border-b border-[var(--border)] flex items-center px-4 relative">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
              <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
              <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 font-[var(--font-mono)] text-[11px] text-[#222222]">
              typical-agency.exe
            </span>
          </div>
          {/* Content */}
          <div className="p-6 font-[var(--font-mono)] text-[13px] leading-[1.8] min-h-[300px]">
            {leftLines.slice(0, visibleLeft).map((line, i) => (
              <div key={i} className={getColor(line.type)}>{line.text}</div>
            ))}
            {visibleLeft > 0 && <div className="inline-block w-2.5 h-[1.2em] bg-[var(--heat)] animate-pulse align-middle ml-1" />}
          </div>
        </div>

        {/* Right Terminal */}
        <div className="w-full md:w-1/2 border-[0.5px] border-[var(--border)] rounded-lg bg-[var(--bg)] flex flex-col overflow-hidden relative">
          {/* Chrome Bar */}
          <div className="h-[28px] bg-[#161616] border-b border-[var(--border)] flex items-center px-4 relative">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
              <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
              <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 font-[var(--font-mono)] text-[11px] text-[#222222]">
              floxr.sh
            </span>
          </div>
          {/* Content */}
          <div className="p-6 font-[var(--font-mono)] text-[13px] leading-[1.8] min-h-[300px]">
            {rightLines.slice(0, visibleRight).map((line, i) => (
              <div key={i} className={getColor(line.type)}>{line.text}</div>
            ))}
            {visibleRight > 0 && <div className="inline-block w-2.5 h-[1.2em] bg-[var(--lime)] animate-pulse align-middle ml-1" />}
          </div>
          
          {/* Subtle Glow Background on Right wrapper */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(184,255,87,0.03)] to-transparent pointer-events-none" />
        </div>

      </div>

    </section>
  );
}
