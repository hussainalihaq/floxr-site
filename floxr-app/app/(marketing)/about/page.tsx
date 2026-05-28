'use client';

import Navigation from '@/components/marketing/Navigation';
import Footer from '@/components/marketing/Footer';
import CustomCursor from '@/components/marketing/CustomCursor';
import { Users, Target, Award, TrendingUp } from 'lucide-react';

const STATS = [
  { value: "50+", label: "Projects Shipped" },
  { value: "98%", label: "Client Retention" },
  { value: "15+", label: "Engineers" },
  { value: "4", label: "Countries" },
];

const PRINCIPLES = [
  {
    icon: <Target size={24} className="stroke-[1.5px]" />,
    title: "Outcome-Obsessed",
    desc: "We don't bill hours. We deliver results. Every engagement is measured by the impact it creates."
  },
  {
    icon: <Users size={24} className="stroke-[1.5px]" />,
    title: "Senior-Only Teams",
    desc: "No juniors learning on your project. Every engineer on your team has 5+ years of production experience."
  },
  {
    icon: <Award size={24} className="stroke-[1.5px]" />,
    title: "Design-Engineering Fusion",
    desc: "We don't hand off designs to developers. Our engineers think in pixels and our designers think in systems."
  },
  {
    icon: <TrendingUp size={24} className="stroke-[1.5px]" />,
    title: "Built to Scale",
    desc: "From day one, every architecture decision is made with 10x growth in mind. No rewrites, no regrets."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030303] flex flex-col relative selection:bg-[var(--lime)] selection:text-black">
      <CustomCursor />
      <Navigation />

      {/* Hero */}
      <section className="w-full pt-[180px] pb-24 px-6 md:px-12 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.015] font-[var(--font-display)] text-[25vw] font-extrabold whitespace-nowrap">
          FLOXR
        </div>

        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-white bg-[#111] border border-[#333] px-3 py-1 rounded-sm mb-8">
          About Us
        </span>
        
        <h1 className="font-[var(--font-display)] text-[clamp(34px,8vw,110px)] font-extrabold text-white leading-[0.9] tracking-tight mb-8 max-w-5xl">
          We build software<br /><span className="text-[#555]">that matters.</span>
        </h1>
        
        <p className="font-[var(--font-body)] text-[18px] md:text-[22px] text-[#888] max-w-2xl leading-relaxed">
          Floxr is a digital engineering studio. We partner with ambitious companies to design,
          build, and scale software products that create real value.
        </p>
      </section>

      {/* Stats Strip */}
      <section className="w-full border-y border-[#222] py-12">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <span className="font-[var(--font-display)] text-[48px] md:text-[64px] font-extrabold text-white leading-none">{stat.value}</span>
              <span className="font-[var(--font-mono)] text-[11px] text-[#555] uppercase tracking-wider mt-2">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="w-full max-w-[900px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-[#888]">Our Story</span>
          <div className="flex-1 h-[1px] bg-[#222]" />
        </div>
        
        <div className="flex flex-col gap-8">
          <p className="font-[var(--font-body)] text-[18px] md:text-[22px] text-[#ccc] leading-relaxed">
            We started Floxr because we were tired of watching great ideas die in the hands of mediocre development shops. 
            Too many agencies optimize for billable hours instead of shipped products.
          </p>
          <p className="font-[var(--font-body)] text-[18px] md:text-[22px] text-[#888] leading-relaxed">
            We took a different approach: assemble a small, senior-only team of engineers and designers 
            who genuinely care about craft. People who stay up late not because they have to,
            but because they refuse to ship something they are not proud of.
          </p>
          <p className="font-[var(--font-body)] text-[18px] md:text-[22px] text-[#888] leading-relaxed">
            Today, we work with startups and enterprises across finance, legal tech, healthcare, 
            and e-commerce — building the tools that power their growth.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-16">
          <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-[#888]">How We Operate</span>
          <div className="flex-1 h-[1px] bg-[#222]" />
        </div>

        <div className="flex flex-col">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="group flex items-start gap-8 md:gap-12 py-10 border-b border-[#222] hover:border-[#444] transition-colors duration-300">
              <div className="w-14 h-14 rounded-xl bg-[#111] border border-[#333] flex items-center justify-center text-white flex-shrink-0 group-hover:border-[#555] transition-colors duration-300">
                {p.icon}
              </div>
              <div>
                <h3 className="font-[var(--font-display)] text-[24px] md:text-[32px] font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                  {p.title}
                </h3>
                <p className="font-[var(--font-body)] text-[16px] md:text-[18px] text-[#888] max-w-xl leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-[900px] mx-auto px-6 md:px-12 py-24 flex flex-col items-center text-center">
        <h2 className="font-[var(--font-display)] text-[clamp(32px,5vw,56px)] font-extrabold text-white mb-6 leading-tight">
          Ready to build something?
        </h2>
        <p className="font-[var(--font-body)] text-[18px] text-[#888] mb-10 max-w-md">
          Let&apos;s talk about your next project. No sales pitch, just a real conversation with engineers.
        </p>
        <a 
          href="/contact"
          className="inline-flex items-center gap-2 bg-transparent border border-[#555] text-white font-[var(--font-mono)] text-[12px] uppercase tracking-wider px-8 py-4 rounded-full hover:border-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Start a Conversation
        </a>
      </section>

      <Footer />
    </main>
  );
}
