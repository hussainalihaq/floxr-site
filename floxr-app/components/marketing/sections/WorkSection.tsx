'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const PROJECTS = [
  {
    id: 1,
    name: "Juriq",
    category: "AI PLATFORM",
    stack: ["Next.js", "GPT-4", "Supabase", "Tailwind"],
    large: true
  },
  {
    id: 2,
    name: "Datafly Dashboard",
    category: "B2B SAAS",
    stack: ["React", "Go", "PostgreSQL"],
    large: false
  },
  {
    id: 3,
    name: "Fintech Mobile",
    category: "FINANCE",
    stack: ["React Native", "Node.js", "AWS"],
    large: false
  }
];

export default function WorkSection() {
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.work-card');
    
    cards.forEach((card: any, i) => {
      gsap.fromTo(card, 
        { translateY: 60, opacity: 0 },
        {
          translateY: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // 15% visibility triggers
          },
          delay: i * 0.15 // stagger
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="work" className="w-full bg-[var(--bg)] py-32 flex flex-col items-center">
      <div className="w-full max-w-[1440px] px-6 md:px-12 flex flex-col items-center">
        
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--lime)] tracking-[0.2em] mb-12">
          SELECTED WORK
        </span>

        <div className="w-full flex flex-col gap-3">
          {/* First large card */}
          <div className="work-card relative w-full h-[320px] md:h-[560px] rounded-xl overflow-hidden group cursor-pointer border border-[rgba(255,255,255,0.05)] shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#080808] transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.4]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--glow-lime),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-8 left-8 flex flex-col z-10 pointer-events-none transition-transform duration-500 group-hover:translate-x-2">
              <span className="font-[var(--font-mono)] text-[11px] text-[var(--lime)] mb-2 uppercase">
                {PROJECTS[0].category}
              </span>
              <h3 className="font-[var(--font-display)] text-[32px] font-bold text-[var(--text)] leading-none">
                {PROJECTS[0].name}
              </h3>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
              <span className="font-[var(--font-mono)] text-[13px] text-[var(--lime)]">→ View Project</span>
            </div>

            <div className="absolute bottom-8 left-8 flex gap-2 flex-wrap z-10 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2">
              {PROJECTS[0].stack.map(tech => (
                <div key={tech} className="bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-[var(--text)] rounded-full px-4 py-1.5 font-[var(--font-mono)] text-[11px] shadow-[0_0_15px_rgba(184,255,87,0.05)]">
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (Cards 2 & 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECTS.slice(1).map((project) => (
              <div key={project.id} className="work-card relative w-full h-[280px] md:h-[380px] rounded-xl overflow-hidden group cursor-pointer border border-[rgba(255,255,255,0.05)] shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#181818] to-[#080808] transition-all duration-500 group-hover:scale-105 group-hover:brightness-[0.4]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--glow-lime),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute top-6 left-6 flex flex-col z-10 pointer-events-none transition-transform duration-500 group-hover:translate-x-2">
                  <span className="font-[var(--font-mono)] text-[11px] text-[var(--lime)] mb-2 uppercase">
                    {project.category}
                  </span>
                  <h3 className="font-[var(--font-display)] text-[24px] font-bold text-[var(--text)] leading-none">
                    {project.name}
                  </h3>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <span className="font-[var(--font-mono)] text-[13px] text-[var(--lime)]">→ View Project</span>
                </div>

                <div className="absolute bottom-6 left-6 flex gap-2 flex-wrap z-10 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2">
                  {project.stack.map(tech => (
                    <div key={tech} className="bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-[var(--text)] rounded-full px-3 py-1 font-[var(--font-mono)] text-[10px] shadow-[0_0_15px_rgba(184,255,87,0.05)]">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="mt-16 text-center">
          <a href="/work" className="font-[var(--font-mono)] text-[13px] text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-300 inline-flex items-center">
            View All Work <span className="ml-2">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
