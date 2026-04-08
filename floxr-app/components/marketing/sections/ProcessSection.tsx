'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Deep dive into your goals, users, and constraints."
  },
  {
    num: "02",
    title: "Architect",
    desc: "Tech stack, wireframes, and a plan that doesn't change mid-build."
  },
  {
    num: "03",
    title: "Build",
    desc: "Sprint-based. You see real progress every single week."
  },
  {
    num: "04",
    title: "Launch",
    desc: "Deploy, monitor, iterate. We don't disappear post-launch."
  }
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;
    
    // Line Drawing
    const linePath = document.querySelector('.process-line-path') as SVGPathElement;
    if (linePath) {
      const length = linePath.getTotalLength();
      gsap.set(linePath, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(linePath, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });
    }

    // Nodes animation (triggered when line reaches them)
    const nodes = gsap.utils.toArray('.process-node');
    nodes.forEach((node: any, i) => {
      const ring = node.querySelector('.process-node-ring');
      const dot = node.querySelector('.process-node-dot');
      const card = document.querySelectorAll('.process-card')[i];
      
      gsap.set(ring, { scale: 0.3, opacity: 0 });
      gsap.set(card, { opacity: 0, x: i % 2 === 0 ? -20 : 20 });
      
      ScrollTrigger.create({
        trigger: node,
        start: "top 60%", // roughly when line reaches it
        onEnter: () => {
          gsap.to(dot, { backgroundColor: "var(--lime)", duration: 0.3 });
          
          gsap.fromTo(ring, 
            { scale: 0.3, opacity: 1 },
            { scale: 1, opacity: 0, duration: 0.6, ease: "power2.out" }
          );
          
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.1
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative w-full py-32 bg-[var(--bg)] flex justify-center overflow-hidden">
      
      <div className="w-full max-w-[900px] flex flex-col items-center">
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--lime)] tracking-[0.2em] mb-20 text-center w-full block">
          HOW WE WORK
        </span>

        {/* Timeline wrapper */}
        <div className="relative w-full flex justify-center py-20 min-h-[800px]">
          
          {/* Vertical SVG Line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px]">
            <svg width="2" height="100%" className="overflow-visible">
              <path 
                className="process-line-path"
                d="M1,0 L1,10000" // Arbitrary large number, SVG handles overflow
                stroke="var(--border)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>

          <div className="w-full relative flex flex-col justify-between gap-32">
            {PROCESS_STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              
              return (
                <div key={step.num} className="relative flex justify-center w-full">
                  
                  {/* The Node (Center) */}
                  <div className="process-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-4 h-4 flex items-center justify-center">
                    {/* Ring that expands */}
                    <div className="process-node-ring absolute w-[40px] h-[40px] rounded-full border border-[var(--lime)]" />
                    {/* Inner Dot */}
                    <div className="process-node-dot w-[12px] h-[12px] rounded-full bg-[var(--border)] transition-colors" />
                  </div>
                  
                  {/* The Card Content */}
                  <div className={`process-card w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-[45%] flex flex-col ${isLeft ? 'text-right items-end pr-12' : 'text-left items-start pl-12'}`}>
                      <span className="font-[var(--font-mono)] text-[11px] text-[var(--lime)] mb-2">
                        {step.num}
                      </span>
                      <h3 className="font-[var(--font-display)] text-[32px] font-bold text-[var(--text)] mb-3">
                        {step.title}
                      </h3>
                      <p className="font-[var(--font-body)] text-[16px] italic text-[var(--muted)] max-w-sm">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}
