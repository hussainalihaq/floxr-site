'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const SERVICES = [
  {
    num: "01",
    title: "Mobile Apps",
    desc: "iOS, Android, cross-platform. Built for real users."
  },
  {
    num: "02",
    title: "Web Applications",
    desc: "SaaS, portals, dashboards. Fast and scalable."
  },
  {
    num: "03",
    title: "Business Websites",
    desc: "Conversion-first. Premium design, real results."
  },
  {
    num: "04",
    title: "AI & Automation",
    desc: "Workflows that run themselves. LLMs, agents, pipelines."
  },
  {
    num: "05",
    title: "Custom Software",
    desc: "If it doesn't exist, we build it. From scratch."
  },
  {
    num: "06",
    title: "Integrations & APIs",
    desc: "Connect everything. Zapier is not enough."
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const panels = gsap.utils.toArray('.service-panel') as HTMLElement[];
    if (!trackRef.current || !containerRef.current || panels.length === 0) return;

    // The sticky horizontal scroll
    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1, // Smooth dragging
        end: () => "+=" + trackRef.current?.offsetWidth,
        onUpdate: (self) => {
          // Calculate which panel is currently active
          const rawProgress = self.progress * (panels.length - 1);
          const index = Math.round(rawProgress);
          setActiveIndex(index);
        }
      }
    });

    // Cleanup
    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="services" className="relative w-full h-[600vh] bg-[var(--bg)]">
      {/* Sticky Frame */}
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex items-center justify-center">
        
        <div className="absolute top-[64px] left-6 md:left-12 opacity-50 z-20 pt-8">
          <span className="font-[var(--font-mono)] text-[11px] text-[var(--lime)] tracking-[0.2em]">WHAT WE BUILD</span>
        </div>

        {/* The Track sliding horizontally */}
        <div ref={trackRef} className="flex h-full w-[600vw] will-change-transform">
          {SERVICES.map((srv, i) => (
            <div key={srv.num} className="service-panel w-[100vw] h-full flex items-center justify-center relative flex-shrink-0">
              
              {/* Background Decorative Number */}
              <div className="absolute top-1/4 left-1/4 md:left-12 text-[180px] font-[var(--font-display)] font-extrabold text-[#111111] leading-none pointer-events-none select-none">
                {srv.num}
              </div>

              <div className="flex flex-col items-center justify-center max-w-4xl px-6 text-center z-10 w-full">
                {/* We can use standard CSS for slide wiping by applying classes based on activeIndex, or let GSAP do raw scrub. 
                    Given spec: current panel wipe right, next enter from right. Raw CSS is smoother. 
                */}
                <div 
                  className={`overflow-hidden transition-all duration-500 will-change-[clip-path]`}
                  style={{
                    clipPath: activeIndex >= i ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' // Wipes in from right
                  }}
                >
                  <h2 className="font-[var(--font-display)] text-[clamp(48px,6vw,96px)] font-extrabold text-[var(--text)] mb-6 leading-none">
                    {srv.title}
                  </h2>
                </div>
                
                <p 
                  className={`font-[var(--font-body)] text-[20px] italic text-[var(--muted)] transition-all duration-500 delay-100
                    ${activeIndex >= i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  {srv.desc}
                </p>
              </div>
              
              {/* Bottom Right Arrow & helper text for first panel */}
              {i === 0 && (
                <div className="absolute bottom-24 right-12 flex flex-col items-center gap-2">
                  <span className="font-[var(--font-mono)] text-[11px] text-[var(--subtle)] uppercase">scroll to explore</span>
                  <div className="text-[var(--lime)] text-2xl animate-bounce">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fixed Progress Indicator (Bottom Center inside Sticky) */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SERVICES.map((srv, i) => (
            <div 
              key={srv.num} 
              className={`h-[2px] w-6 transition-colors duration-300 rounded-full
                ${activeIndex === i ? 'bg-[var(--lime)]' : 'bg-[var(--border)]'}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
