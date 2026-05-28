'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const PROJECTS = [
  {
    id: 1,
    name: "Juriq",
    category: "AI PLATFORM",
    tagline: "AI-powered legal research assistant that cuts case prep time by 80%.",
    stack: ["Next.js", "GPT-4", "Supabase", "Tailwind"],
    color: "#3b82f6",
    year: "2024",
    stats: { users: "5,000+", queries: "1M+", accuracy: "96%" },
    mockupType: "iframe",
    large: true
  },
  {
    id: 2,
    name: "Datafly Dashboard",
    category: "B2B SAAS",
    tagline: "Real-time business intelligence for growing teams.",
    stack: ["React", "Go", "PostgreSQL"],
    color: "#10b981",
    year: "2024",
    stats: { companies: "200+", dataPoints: "50M+", uptime: "99.9%" },
    mockupType: "analytics",
    large: false
  },
  {
    id: 3,
    name: "Fintech Mobile",
    category: "FINANCE",
    tagline: "Peer-to-peer payments with instant settlement.",
    stack: ["React Native", "Node.js", "AWS"],
    color: "#f59e0b",
    year: "2023",
    stats: { transactions: "$2M+", users: "15K+", speed: "<2s" },
    mockupType: "mobile",
    large: false
  }
];

function DashboardMockup({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-4">
      {/* Mini nav */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-6 h-6 rounded-md" style={{ backgroundColor: `${color}30` }} />
        <div className="flex gap-4">
          {['Dashboard', 'Cases', 'Research'].map(t => (
            <span key={t} className="font-[var(--font-mono)] text-[9px] text-[var(--border)]">{t}</span>
          ))}
        </div>
      </div>
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        {[{ l: 'Active Cases', v: '247' }, { l: 'Resolved', v: '1,893' }, { l: 'AI Queries', v: '12.4K' }].map(s => (
          <div key={s.l} className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-md p-2">
            <div className="font-[var(--font-display)] text-[16px] font-bold" style={{ color }}>{s.v}</div>
            <div className="font-[var(--font-mono)] text-[8px] text-[var(--border)] mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
      {/* Chart bars */}
      <div className="flex-1 flex items-end gap-1.5 pt-2">
        {[65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50, 88].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm transition-all duration-500 hover:opacity-100 opacity-70" style={{ height: `${h}%`, backgroundColor: `${color}${i % 3 === 0 ? '60' : '30'}` }} />
        ))}
      </div>
    </div>
  );
}

function AnalyticsMockup({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-[var(--font-mono)] text-[10px] text-[var(--border)]">Live Analytics</span>
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
      </div>
      {/* Data rows */}
      {[
        { label: 'Revenue', value: '$142,800', change: '+23%' },
        { label: 'Active Users', value: '8,421', change: '+12%' },
        { label: 'Conversion', value: '4.7%', change: '+0.8%' },
        { label: 'Avg Session', value: '6m 32s', change: '+18%' },
      ].map(row => (
        <div key={row.label} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.03)]">
          <span className="font-[var(--font-mono)] text-[11px] text-[var(--muted)]">{row.label}</span>
          <div className="flex items-center gap-3">
            <span className="font-[var(--font-display)] text-[14px] font-bold text-[var(--text)]">{row.value}</span>
            <span className="font-[var(--font-mono)] text-[10px]" style={{ color }}>{row.change}</span>
          </div>
        </div>
      ))}
      {/* Mini line chart */}
      <div className="flex-1 flex items-center justify-center">
        <svg viewBox="0 0 200 60" className="w-full h-full max-h-[60px]">
          <polyline
            points="0,50 20,45 40,48 60,30 80,35 100,20 120,25 140,15 160,18 180,8 200,12"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polyline
            points="0,50 20,45 40,48 60,30 80,35 100,20 120,25 140,15 160,18 180,8 200,12 200,60 0,60"
            fill={`${color}10`}
            stroke="none"
          />
        </svg>
      </div>
    </div>
  );
}

function MobileMockup({ color }: { color: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* Phone frame */}
      <div className="w-[160px] h-[280px] md:w-[200px] md:h-[360px] bg-[#0a0a0a] rounded-[24px] border-2 border-[rgba(255,255,255,0.08)] p-2 flex flex-col overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        {/* Notch */}
        <div className="w-16 h-4 bg-[#000] rounded-full mx-auto mb-2" />
        {/* Screen */}
        <div className="flex-1 bg-[#111] rounded-[16px] flex flex-col p-3 gap-2 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="font-[var(--font-display)] text-[12px] font-bold text-[var(--text)]">Wallet</span>
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: `${color}40` }} />
          </div>
          <div className="text-center py-3">
            <div className="font-[var(--font-display)] text-[22px] font-bold text-[var(--text)]">$4,280</div>
            <div className="font-[var(--font-mono)] text-[8px] mt-1" style={{ color }}>+$340 today</div>
          </div>
          {/* Transactions */}
          {[{ n: 'Payment', a: '-$120' }, { n: 'Received', a: '+$500' }, { n: 'Transfer', a: '-$80' }].map(t => (
            <div key={t.n} className="flex items-center justify-between py-1.5 border-t border-[rgba(255,255,255,0.04)]">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `${color}20` }} />
                <span className="font-[var(--font-mono)] text-[8px] text-[var(--muted)]">{t.n}</span>
              </div>
              <span className="font-[var(--font-mono)] text-[8px] text-[var(--text)]">{t.a}</span>
            </div>
          ))}
          {/* Action button */}
          <div className="mt-auto rounded-lg py-1.5 text-center font-[var(--font-mono)] text-[9px] text-[#000] font-bold" style={{ backgroundColor: color }}>
            Send Money
          </div>
        </div>
      </div>
    </div>
  );
}

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
            start: "top 85%",
          },
          delay: i * 0.15
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="work" className="w-full bg-[var(--bg)] py-32 flex flex-col items-center relative overflow-hidden">
      {/* Background Typography */}
      <div className="absolute top-[10%] left-[-5%] select-none pointer-events-none z-0 opacity-[0.015] font-[var(--font-display)] text-[20vw] font-extrabold whitespace-nowrap -rotate-3">
        PORTFOLIO
      </div>

      <div className="w-full max-w-[1440px] px-6 md:px-12 flex flex-col items-center relative z-10">
        
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--lime)] tracking-[0.2em] mb-4 bg-[rgba(0,0,0,0.6)] px-4 py-2 border border-[rgba(184,255,87,0.2)] rounded-sm backdrop-blur-sm">
          SELECTED WORK
        </span>
        <h2 className="font-[var(--font-display)] text-[clamp(26px,4vw,56px)] font-extrabold text-[var(--text)] mb-16 text-center leading-tight">
          Projects that shipped.
        </h2>

        <div className="w-full flex flex-col gap-6">
          {/* First large card — Juriq (Real DOM iframe & Redirect) */}
          <a href="https://juriq.app" target="_blank" rel="noopener noreferrer" className="work-card relative w-full min-h-[400px] md:min-h-[560px] rounded-2xl overflow-hidden group cursor-pointer border border-[#1a1a1a] shadow-2xl block bg-[#030303] hover:border-[#333] transition-colors duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.03),transparent)] pointer-events-none" />
            
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row">
              {/* Left Text */}
              <div className="w-full md:w-[45%] flex flex-col justify-center p-8 md:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-[var(--font-mono)] text-[10px] text-[#fff] bg-[#111] px-3 py-1 rounded-sm border border-[#333] uppercase tracking-widest">
                    {PROJECTS[0].category}
                  </span>
                  <span className="font-[var(--font-mono)] text-[10px] text-[var(--border)]">{PROJECTS[0].year}</span>
                </div>
                <h3 className="font-[var(--font-display)] text-[36px] md:text-[48px] font-extrabold text-[var(--text)] leading-none mb-4">
                  {PROJECTS[0].name}
                </h3>
                <p className="font-[var(--font-body)] text-[16px] text-[var(--muted)] mb-6 max-w-sm leading-relaxed">
                  {PROJECTS[0].tagline}
                </p>
                <div className="flex gap-2 flex-wrap mb-6">
                  {PROJECTS[0].stack.map(tech => (
                    <div key={tech} className="bg-[#111] border border-[#222] text-[#ccc] rounded-full px-3 py-1 font-[var(--font-mono)] text-[10px]">
                      {tech}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(PROJECTS[0].stats).map(([key, val]) => (
                    <div key={key} className="text-center">
                      <div className="font-[var(--font-display)] text-[18px] font-bold text-[#fff]">{val}</div>
                      <div className="font-[var(--font-mono)] text-[8px] text-[var(--border)] uppercase mt-0.5">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right Mockup (Real DOM via iframe) */}
              <div className="w-full md:w-[55%] flex items-center justify-center p-4 md:p-8">
                <div className="w-full max-w-[500px] h-[280px] md:h-[400px] rounded-xl border border-[#333] bg-[#000] overflow-hidden group-hover:border-[#555] transition-colors duration-500 relative shadow-[0_0_50px_rgba(255,255,255,0.02)]">
                  <div className="h-8 bg-[#0a0a0a] border-b border-[#222] flex items-center px-3 gap-1.5 z-20 relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                    <span className="ml-3 font-[var(--font-mono)] text-[9px] text-[#555]">juriq.app (Live Render)</span>
                  </div>
                  
                  {/* REAL DOM IFRAME */}
                  <div className="w-full h-[calc(100%-32px)] relative overflow-hidden bg-white">
                    <iframe 
                      src="https://juriq.app"
                      className="absolute top-0 left-0 w-[1280px] h-[800px] origin-top-left pointer-events-none select-none opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-[0.23] sm:scale-[0.35] md:scale-[0.5]"
                      style={{ border: 'none' }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Arrow */}
            <div className="absolute bottom-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
               <span className="w-12 h-12 rounded-full border border-[#444] flex items-center justify-center bg-[#111] text-[#fff] backdrop-blur-sm">
                 →
               </span>
            </div>
          </a>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(1).map((project, idx) => (
              <div key={project.id} className="work-card relative w-full min-h-[380px] md:min-h-[480px] rounded-2xl overflow-hidden group cursor-pointer border border-[#1a1a1a] shadow-2xl bg-[#030303] hover:border-[#333] transition-colors duration-500">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.02),transparent)] pointer-events-none" />
                
                <div className="relative z-10 w-full h-full flex flex-col">
                  {/* Text */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-[var(--font-mono)] text-[10px] px-3 py-1 rounded-sm border uppercase tracking-widest text-[#fff] bg-[#111] border-[#333]">
                        {project.category}
                      </span>
                      <span className="font-[var(--font-mono)] text-[10px] text-[var(--border)]">{project.year}</span>
                    </div>
                    <h3 className="font-[var(--font-display)] text-[28px] md:text-[36px] font-extrabold text-[var(--text)] leading-none mb-3">
                      {project.name}
                    </h3>
                    <p className="font-[var(--font-body)] text-[14px] text-[var(--muted)] mb-4 max-w-sm leading-relaxed">
                      {project.tagline}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {project.stack.map(tech => (
                        <div key={tech} className="bg-[#111] border border-[#222] text-[#ccc] rounded-full px-3 py-1 font-[var(--font-mono)] text-[10px]">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mockup */}
                  <div className="flex-1 px-4 md:px-6 pb-4">
                    <div className="w-full h-full rounded-xl border border-[#333] bg-[#0a0a0a] overflow-hidden group-hover:border-[#555] transition-colors duration-500 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                      <div className="h-7 bg-[#050505] border-b border-[#222] flex items-center px-3 gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#333]" />
                        <div className="w-2 h-2 rounded-full bg-[#333]" />
                        <div className="w-2 h-2 rounded-full bg-[#333]" />
                      </div>
                      {/* Monochrome internal mockups */}
                      <div className="opacity-80 saturate-0 hover:saturate-100 hover:opacity-100 transition-all duration-500 h-full">
                        {idx === 0 ? <AnalyticsMockup color="#fff" /> : <MobileMockup color="#fff" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                   <span className="w-10 h-10 rounded-full border border-[#444] flex items-center justify-center text-[12px] backdrop-blur-sm bg-[#111] text-[#fff]">
                     ↗
                   </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="mt-16 text-center">
          <a href="/work" className="group font-[var(--font-mono)] text-[13px] text-[var(--muted)] hover:text-[var(--lime)] transition-colors duration-300 inline-flex items-center gap-2 border border-[var(--border)] hover:border-[var(--lime)] px-6 py-3 rounded-full">
            View All Work <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
