'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Smartphone, Globe, Briefcase, Bot, Settings, Link } from 'lucide-react';

const SERVICES = [
  {
    num: "01",
    title: "Mobile Apps",
    desc: "iOS, Android, cross-platform. Built for real users.",
    icon: <Smartphone size={32} className="stroke-[1.5px]" />,
    features: ["Native iOS & Android", "Cross-platform with React Native", "Push Notifications & Analytics", "App Store Optimization"],
    metrics: { projects: "40+", rating: "4.9★", downloads: "2M+" }
  },
  {
    num: "02",
    title: "Web Applications",
    desc: "SaaS, portals, dashboards. Fast and scalable.",
    icon: <Globe size={32} className="stroke-[1.5px]" />,
    features: ["React / Next.js SPAs", "Real-time Dashboards", "Multi-tenant Architecture", "Role-based Access Control"],
    metrics: { projects: "60+", uptime: "99.9%", users: "500K+" }
  },
  {
    num: "03",
    title: "Business Websites",
    desc: "Conversion-first. Premium design, real results.",
    icon: <Briefcase size={32} className="stroke-[1.5px]" />,
    features: ["Landing Pages that Convert", "SEO-first Architecture", "CMS Integration", "Performance Optimized"],
    metrics: { conversion: "+340%", speed: "<1s", leads: "10K+" }
  },
  {
    num: "04",
    title: "AI & Automation",
    desc: "Workflows that run themselves. LLMs, agents, pipelines.",
    icon: <Bot size={32} className="stroke-[1.5px]" />,
    features: ["Custom LLM Integrations", "Intelligent Chatbots", "Document Processing", "Workflow Automation"],
    metrics: { automated: "1M+ tasks", accuracy: "98.5%", saved: "2000hrs" }
  },
  {
    num: "05",
    title: "Custom Software",
    desc: "If it doesn't exist, we build it. From scratch.",
    icon: <Settings size={32} className="stroke-[1.5px]" />,
    features: ["Enterprise-grade Systems", "Legacy Modernization", "Microservices Architecture", "Cloud Infrastructure"],
    metrics: { systems: "25+", reliability: "99.99%", scale: "∞" }
  },
  {
    num: "06",
    title: "Integrations & APIs",
    desc: "Connect everything. Zapier is not enough.",
    icon: <Link size={32} className="stroke-[1.5px]" />,
    features: ["RESTful & GraphQL APIs", "Third-party Integrations", "Payment Gateways", "Data Sync Pipelines"],
    metrics: { endpoints: "500+", partners: "50+", uptime: "99.95%" }
  }
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const cards = gsap.utils.toArray('.service-stack-card') as HTMLElement[];
    const mm = gsap.matchMedia();

    cards.forEach((card, index) => {
      // 1. Entrance animation (all devices)
      gsap.fromTo(card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    });

    // 2. Sticky stack scale-down effect (Desktop only: md/768px and up)
    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, index) => {
        if (index !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top top",
              end: () => `+=${card.offsetHeight}`,
              scrub: true,
            }
          });
        }
      });
    });

    // Animate the metrics and load bars on card enter
    gsap.utils.toArray('.metric-bar').forEach((bar: any) => {
      gsap.fromTo(bar,
        { width: "0%" },
        { 
          width: bar.dataset.width, 
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 95%"
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
    <section ref={containerRef} id="services" className="relative w-full bg-[#030303] py-24 pb-[20vh] px-6 md:px-12 flex flex-col items-center z-10">
      
      {/* Background Typography */}
      <div className="fixed top-[20%] left-[-5%] select-none pointer-events-none z-0 opacity-[0.015] font-[var(--font-display)] text-[30vw] font-extrabold whitespace-nowrap -rotate-6 mix-blend-screen">
        SERVICES
      </div>

      <div className="w-full max-w-[1200px] flex flex-col relative z-10">
        
        {/* Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <span className="font-[var(--font-mono)] text-[11px] text-[#fff] bg-[#111] px-4 py-2 border border-[#333] rounded-sm tracking-[0.2em] mb-6">
            WHAT WE BUILD
          </span>
          <h2 className="font-[var(--font-display)] text-[clamp(32px,6vw,80px)] font-extrabold text-[var(--text)] leading-[0.95] tracking-tight">
            Engineering for scale.
          </h2>
        </div>

        {/* Vertical Sticky Stack */}
        <div className="w-full flex flex-col">
          {SERVICES.map((srv, i) => (
            <div 
              key={srv.num}
              className="service-stack-card md:sticky flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 w-full p-8 md:p-16 mb-12 md:mb-[15vh] rounded-[32px] border border-[#222] bg-[#0a0a0a] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] origin-top will-change-transform"
              style={{
                top: `calc(15vh + ${i * 40}px)`,
                zIndex: i + 10,
              }}
            >
              
              {/* Left Content */}
              <div className="w-full md:w-1/2 flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#111] border border-[#333] flex items-center justify-center text-white">
                    {srv.icon}
                  </div>
                  <span className="font-[var(--font-mono)] text-[11px] text-[#888]">SERVICE {srv.num}</span>
                </div>
                
                <h3 className="font-[var(--font-display)] text-[28px] sm:text-[36px] md:text-[56px] font-bold text-white mb-4 leading-none">
                  {srv.title}
                </h3>
                
                <p className="font-[var(--font-body)] text-[16px] md:text-[18px] text-[#888] mb-8 max-w-md">
                  {srv.desc}
                </p>

                <div className="flex flex-col gap-3">
                  {srv.features.map((feature, fi) => (
                    <div key={fi} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#444]" />
                      <span className="font-[var(--font-mono)] text-[13px] text-[#aaa]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Flashy CTA */}
                <a 
                  href={`/contact?service=${encodeURIComponent(srv.title)}`}
                  className="group/cta relative mt-10 inline-flex items-center gap-3 w-fit overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2 font-[var(--font-mono)] text-[12px] uppercase tracking-wider text-black bg-white px-6 py-3 rounded-full font-bold transition-all duration-300 group-hover/cta:shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover/cta:scale-[1.05]">
                    I want this
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover/cta:translate-x-1"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span className="font-[var(--font-mono)] text-[10px] text-[#555] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    Free consultation
                  </span>
                </a>
              </div>

              {/* Right Minimal Dashboard / UI Abstract */}
              <div className="w-full md:w-1/2 h-[240px] xs:h-[300px] md:h-[450px] rounded-2xl bg-[#030303] border border-[#222] p-6 flex flex-col relative overflow-hidden group">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
                
                {/* Mockup Header */}
                <div className="flex items-center justify-between border-b border-[#222] pb-4 mb-6">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                  </div>
                  <span className="font-[var(--font-mono)] text-[9px] text-[#555] uppercase tracking-wider overflow-hidden whitespace-nowrap overflow-ellipsis ml-2">
                    floxr/{srv.title.toLowerCase().replace(' ', '-')}.ui
                  </span>
                </div>

                {/* Abstract Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(srv.metrics).map(([key, val], idx) => (
                    <div key={key} className={`p-4 rounded-xl border border-[#222] bg-[#0a0a0a] flex flex-col justify-center ${idx === 2 ? 'col-span-2' : ''}`}>
                      <span className="font-[var(--font-display)] text-[24px] text-white font-bold">{val}</span>
                      <span className="font-[var(--font-mono)] text-[9px] text-[#666] uppercase mt-1">{key}</span>
                    </div>
                  ))}
                </div>

                {/* Load Bars */}
                <div className="flex-1 flex flex-col justify-end gap-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                  {['Performance', 'Reliability'].map((l, idx) => (
                    <div key={l} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-end">
                        <span className="font-[var(--font-mono)] text-[9px] text-[#555]">{l}</span>
                        <span className="font-[var(--font-mono)] text-[9px] text-white">{99 - (idx * 2)}%</span>
                      </div>
                      <div className="h-1 w-full bg-[#111] rounded-full overflow-hidden">
                        <div className="metric-bar h-full bg-white rounded-full transition-all duration-1000 ease-out relative" data-width={`${99 - (idx * 2)}%`} style={{ width: "0%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
