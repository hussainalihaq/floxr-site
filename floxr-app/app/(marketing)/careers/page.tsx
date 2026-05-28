'use client';

import Navigation from '@/components/marketing/Navigation';
import Footer from '@/components/marketing/Footer';
import CustomCursor from '@/components/marketing/CustomCursor';
import { Code, Zap, Shield, Globe, Briefcase, ArrowUpRight } from 'lucide-react';

const VALUES = [
  { 
    icon: <Code size={28} className="stroke-[1.5px]" />,
    title: "Craft Over Convention",
    desc: "We don't use templates. Every line of code is purpose-built for the problem it solves."
  },
  { 
    icon: <Zap size={28} className="stroke-[1.5px]" />,
    title: "Speed Is a Feature",
    desc: "We ship fast, iterate faster, and treat performance as a first-class citizen."
  },
  { 
    icon: <Shield size={28} className="stroke-[1.5px]" />,
    title: "Ownership Culture",
    desc: "Every engineer owns their domain end-to-end. No hand-offs, no excuses."
  },
  { 
    icon: <Globe size={28} className="stroke-[1.5px]" />,
    title: "Remote-First, Global",
    desc: "Work from anywhere. We hire talent, not timezones."
  }
];

const POSITIONS = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "AI/ML Engineer",
    department: "AI Lab",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "DevOps / Infrastructure",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
  },
  {
    title: "Technical Project Manager",
    department: "Operations",
    location: "Remote",
    type: "Full-time",
  },
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#030303] flex flex-col relative selection:bg-[var(--lime)] selection:text-black">
      <CustomCursor />
      <Navigation />

      {/* Hero */}
      <section className="w-full pt-[180px] pb-24 px-6 md:px-12 flex flex-col items-center text-center relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.015] font-[var(--font-display)] text-[25vw] font-extrabold whitespace-nowrap">
          CAREERS
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#b8ff57] animate-pulse" />
          <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-white bg-[#111] border border-[#333] px-3 py-1 rounded-sm">
            We&apos;re Hiring
          </span>
        </div>
        
        <h1 className="font-[var(--font-display)] text-[clamp(34px,8vw,110px)] font-extrabold text-white leading-[0.9] tracking-tight mb-8 max-w-5xl">
          Build the future.<br /><span className="text-[#888]">From the dark.</span>
        </h1>
        
        <p className="font-[var(--font-body)] text-[18px] md:text-[22px] text-[#888] max-w-2xl leading-relaxed">
          We are a collective of engineers, designers, and product thinkers who build software that matters. If you want to work on things that scale, this is the place.
        </p>
      </section>

      {/* Culture Values — Dual-direction infinite marquee */}
      <section className="w-full py-16 md:py-24 overflow-hidden relative">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-[#888]">
              Our DNA
            </span>
            <div className="flex-1 h-[1px] bg-[#222]" />
          </div>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="flex w-max animate-[marquee-left_30s_linear_infinite] mb-6">
          {[...VALUES, ...VALUES, ...VALUES].map((val, i) => (
            <div key={i} className="flex items-center gap-6 mr-12 group cursor-default">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#333] flex items-center justify-center text-white group-hover:border-white transition-colors duration-300">
                {val.icon}
              </div>
              <div className="flex flex-col min-w-[280px]">
                <h3 className="font-[var(--font-display)] text-[22px] font-bold text-white whitespace-nowrap group-hover:text-[#b8ff57] transition-colors duration-300">
                  {val.title}
                </h3>
                <p className="font-[var(--font-mono)] text-[11px] text-[#555] whitespace-nowrap mt-1">
                  {val.desc}
                </p>
              </div>
              <span className="text-[#222] mx-4">—</span>
            </div>
          ))}
        </div>

        {/* Row 2 — scrolls right (reverse) */}
        <div className="flex w-max animate-[marquee-right_35s_linear_infinite]">
          {[...VALUES, ...VALUES, ...VALUES].reverse().map((val, i) => (
            <div key={i} className="flex items-center gap-6 mr-12 group cursor-default">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#0a0a0a] border border-[#333] flex items-center justify-center text-white group-hover:border-white transition-colors duration-300">
                {val.icon}
              </div>
              <div className="flex flex-col min-w-[280px]">
                <h3 className="font-[var(--font-display)] text-[22px] font-bold text-white whitespace-nowrap group-hover:text-[#b8ff57] transition-colors duration-300">
                  {val.title}
                </h3>
                <p className="font-[var(--font-mono)] text-[11px] text-[#555] whitespace-nowrap mt-1">
                  {val.desc}
                </p>
              </div>
              <span className="text-[#222] mx-4">—</span>
            </div>
          ))}
        </div>

        <style jsx>{`
          @keyframes marquee-left {
            from { transform: translateX(0); }
            to { transform: translateX(-33.33%); }
          }
          @keyframes marquee-right {
            from { transform: translateX(-33.33%); }
            to { transform: translateX(0); }
          }
        `}</style>
      </section>

      {/* Open Positions */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-[#888]">
            Open Positions
          </span>
          <div className="flex-1 h-[1px] bg-[#222]" />
          <span className="font-[var(--font-mono)] text-[11px] text-[#555]">{POSITIONS.length} roles</span>
        </div>

        <div className="flex flex-col">
          {POSITIONS.map((pos, i) => (
            <a 
              key={i}
              href={`mailto:careers@floxr.co?subject=Application: ${pos.title}`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[#222] hover:border-[#555] transition-all duration-300 cursor-pointer relative"
            >
              {/* Left */}
              <div className="flex flex-col mb-4 md:mb-0">
                <h3 className="font-[var(--font-display)] text-[22px] md:text-[28px] font-bold text-white group-hover:text-[#b8ff57] transition-colors duration-300 mb-2">
                  {pos.title}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="font-[var(--font-mono)] text-[11px] text-[#555] uppercase">{pos.department}</span>
                  <span className="text-[#333]">·</span>
                  <span className="font-[var(--font-mono)] text-[11px] text-[#555]">{pos.location}</span>
                  <span className="text-[#333]">·</span>
                  <span className="font-[var(--font-mono)] text-[11px] text-[#555]">{pos.type}</span>
                </div>
              </div>

              {/* Right: Apply button */}
              <div className="flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-all duration-300">
                <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-wider text-white">Apply</span>
                <div className="w-10 h-10 rounded-full border border-[#444] group-hover:border-[#b8ff57] flex items-center justify-center group-hover:bg-[#b8ff57] transition-all duration-300">
                  <ArrowUpRight size={16} className="text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* bottom CTA */}
        <div className="flex flex-col items-center text-center mt-24 py-16 border border-[#222] rounded-[32px] bg-[#080808]">
          <Briefcase size={32} className="text-[#555] mb-6" />
          <h3 className="font-[var(--font-display)] text-[28px] md:text-[40px] font-bold text-white mb-4">
            Don&apos;t see your role?
          </h3>
          <p className="font-[var(--font-body)] text-[16px] text-[#888] mb-8 max-w-md">
            We&apos;re always looking for exceptional people. Send us your portfolio and we&apos;ll find a way to work together.
          </p>
          <a 
            href="mailto:careers@floxr.co"
            className="inline-flex items-center gap-2 bg-[#b8ff57] text-black font-bold font-[var(--font-mono)] text-[12px] uppercase tracking-wider px-8 py-4 rounded-full hover:scale-[1.05] transition-transform duration-300 shadow-[0_0_20px_rgba(184,255,87,0.3)]"
          >
            Get in Touch
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
