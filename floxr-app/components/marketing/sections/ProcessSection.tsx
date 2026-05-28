'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "Deep dive into your goals, users, and constraints. Every detail is mapped before a single pixel is placed.",
    icon: <Search size={22} className="stroke-[1.5px]" />,
    details: ["Stakeholder interviews", "Market audit", "User journey mapping", "Technical feasibility"]
  },
  {
    num: "02",
    title: "Architect",
    desc: "Tech stack, wireframes, and a roadmap that doesn't change mid-build. Designed for scale from day one.",
    icon: <PenTool size={22} className="stroke-[1.5px]" />,
    details: ["System architecture", "Hi-fi prototypes", "API contracts", "Sprint planning"]
  },
  {
    num: "03",
    title: "Build",
    desc: "Sprint-based delivery. You see real, working progress every single week. No surprises.",
    icon: <Code size={22} className="stroke-[1.5px]" />,
    details: ["Weekly demos", "CI/CD pipelines", "Code reviews", "QA automation"]
  },
  {
    num: "04",
    title: "Launch",
    desc: "Deploy, monitor, iterate. We don't disappear post-launch. Your product is our product.",
    icon: <Rocket size={22} className="stroke-[1.5px]" />,
    details: ["Production deploy", "Performance monitoring", "Analytics setup", "Ongoing support"]
  }
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    const mm = gsap.matchMedia();

    // Draw the center line
    const linePath = sectionRef.current.querySelector('.process-line-draw') as HTMLElement;
    if (linePath) {
      gsap.fromTo(linePath,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1,
          }
        }
      );
    }

    // Traveling light pulse
    gsap.to(".process-light-pulse", {
      top: "100%",
      duration: 3,
      repeat: -1,
      ease: "none",
    });

    const steps = gsap.utils.toArray('.process-step-card') as HTMLElement[];

    // Responsive step entrance animations
    mm.add("(min-width: 768px)", () => {
      // Desktop: alternating slide from sides
      steps.forEach((step, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(step,
          { opacity: 0, x: isLeft ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
            }
          }
        );
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: slide up smoothly
      steps.forEach((step) => {
        gsap.fromTo(step,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
            }
          }
        );
      });
    });

    // Animate nodes
    const nodes = gsap.utils.toArray('.process-node') as HTMLElement[];
    nodes.forEach((node) => {
      gsap.fromTo(node,
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: node,
            start: "top 70%",
          }
        }
      );
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative w-full py-32 bg-[#030303] flex justify-center overflow-hidden">
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-[30%] left-1/4 w-[30vw] h-[30vw] bg-white rounded-full blur-[200px] opacity-[0.02] pointer-events-none" />

      <div className="w-full max-w-[1100px] px-6 md:px-12 flex flex-col items-center relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-28">
          <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-white bg-[#111] border border-[#333] px-4 py-2 rounded-sm mb-6">
            HOW WE WORK
          </span>
          <h2 className="font-[var(--font-display)] text-[clamp(28px,5vw,64px)] font-extrabold text-white leading-[0.95] tracking-tight">
            Four phases.<br /><span className="text-[#555]">Zero surprises.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative w-full min-h-[900px]">
          
          {/* Center vertical line (background track) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-[#1a1a1a] hidden md:block">
            <div className="process-light-pulse absolute top-[-50px] left-[-2px] w-[5px] h-[50px] bg-[linear-gradient(to_bottom,transparent,white,transparent)] opacity-40 blur-[2px] z-10" />
          </div>
          {/* Animated fill line */}
          <div className="process-line-draw absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white origin-top hidden md:block" />
          
          {/* Mobile: left-aligned line */}
          <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#1a1a1a] md:hidden">
            <div className="process-light-pulse absolute top-[-50px] left-[-2px] w-[5px] h-[50px] bg-[linear-gradient(to_bottom,transparent,white,transparent)] opacity-40 blur-[2px] z-10" />
          </div>
          <div className="process-line-draw absolute left-6 top-0 bottom-0 w-[1px] bg-white origin-top md:hidden" />

          {/* Steps */}
          <div className="flex flex-col gap-24 md:gap-32">
            {PROCESS_STEPS.map((step, i) => {
              const isLeft = i % 2 === 0;
              
              return (
                <div key={step.num} className="relative w-full">
                  
                  {/* Center Node — desktop */}
                  <div className="process-node absolute left-1/2 -translate-x-1/2 top-8 z-20 hidden md:flex">
                    <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-[#333] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                      {step.icon}
                    </div>
                  </div>

                  {/* Mobile Node */}
                  <div className="process-node absolute left-[14px] top-8 z-20 md:hidden">
                    <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border-2 border-[#333] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Card — alternates sides on desktop, always right on mobile */}
                  <div className={`process-step-card w-full flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} pl-14 md:pl-0`}>
                    <div className={`w-full md:w-[44%] ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                      <div className="group p-8 md:p-10 rounded-[24px] border border-[#222] bg-[#080808] hover:border-[#444] transition-all duration-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.015),transparent)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10">
                          {/* Phase tag */}
                          <div className="flex items-center gap-3 mb-6">
                            <span className="font-[var(--font-mono)] text-[10px] text-[#888] uppercase tracking-wider">Phase {step.num}</span>
                            <div className="flex-1 h-[1px] bg-[#222]" />
                          </div>

                          <h3 className="font-[var(--font-display)] text-[32px] md:text-[40px] font-bold text-white mb-4 leading-none group-hover:translate-x-1 transition-transform duration-300">
                            {step.title}
                          </h3>
                          
                          <p className="font-[var(--font-body)] text-[15px] md:text-[16px] text-[#888] mb-8 leading-relaxed">
                            {step.desc}
                          </p>

                          {/* Detail chips */}
                          <div className="flex flex-wrap gap-2">
                            {step.details.map((detail, di) => (
                              <span 
                                key={di}
                                className="font-[var(--font-mono)] text-[10px] text-[#888] bg-[#0a0a0a] border border-[#222] px-3 py-1.5 rounded-full group-hover:border-[#444] group-hover:text-white transition-all duration-300"
                              >
                                {detail}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
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
