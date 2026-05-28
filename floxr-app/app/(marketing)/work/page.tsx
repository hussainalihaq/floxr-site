'use client';

import Navigation from '@/components/marketing/Navigation';
import Footer from '@/components/marketing/Footer';
import CustomCursor from '@/components/marketing/CustomCursor';
import { ArrowUpRight } from 'lucide-react';

const ALL_PROJECTS = [
  {
    name: "Juriq",
    category: "AI Platform",
    tagline: "AI-powered legal research assistant that cuts case prep time by 80%.",
    stack: ["Next.js", "GPT-4", "Supabase"],
    year: "2024",
    url: "https://juriq.app",
    featured: true,
  },
  {
    name: "Datafly Dashboard",
    category: "B2B SaaS",
    tagline: "Real-time business intelligence for growing teams.",
    stack: ["React", "Go", "PostgreSQL"],
    year: "2024",
    url: "#",
    featured: false,
  },
  {
    name: "Fintech Mobile",
    category: "Finance",
    tagline: "Peer-to-peer payments with instant settlement.",
    stack: ["React Native", "Node.js", "AWS"],
    year: "2023",
    url: "#",
    featured: false,
  },
  {
    name: "MedSync Portal",
    category: "Healthcare",
    tagline: "Patient data synchronization across hospital networks.",
    stack: ["Next.js", "FHIR API", "Azure"],
    year: "2023",
    url: "#",
    featured: false,
  },
  {
    name: "LogiTrack",
    category: "Logistics",
    tagline: "Fleet management and real-time GPS tracking for delivery networks.",
    stack: ["React", "Python", "MapBox"],
    year: "2023",
    url: "#",
    featured: false,
  },
  {
    name: "EduFlow LMS",
    category: "EdTech",
    tagline: "Learning management system serving 50K+ students across 12 institutions.",
    stack: ["Next.js", "Supabase", "Stripe"],
    year: "2022",
    url: "#",
    featured: false,
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#030303] flex flex-col relative selection:bg-[var(--lime)] selection:text-black">
      <CustomCursor />
      <Navigation />

      {/* Hero */}
      <section className="w-full pt-[180px] pb-16 px-6 md:px-12 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.015] font-[var(--font-display)] text-[25vw] font-extrabold whitespace-nowrap">
          WORK
        </div>

        <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-white bg-[#111] border border-[#333] px-3 py-1 rounded-sm mb-8">
          Portfolio
        </span>
        
        <h1 className="font-[var(--font-display)] text-[clamp(34px,8vw,100px)] font-extrabold text-white leading-[0.9] tracking-tight mb-8 max-w-5xl">
          Projects that<br /><span className="text-[#555]">shipped & scaled.</span>
        </h1>
        
        <p className="font-[var(--font-body)] text-[18px] md:text-[22px] text-[#888] max-w-2xl leading-relaxed">
          A selection of products we&apos;ve designed, engineered, and deployed for clients across industries.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col gap-4">
          {ALL_PROJECTS.map((project, i) => (
            <a 
              key={i}
              href={project.url}
              target={project.url !== '#' ? '_blank' : undefined}
              rel={project.url !== '#' ? 'noopener noreferrer' : undefined}
              className="group flex flex-col md:flex-row md:items-center justify-between p-8 md:p-10 rounded-2xl border border-[#1a1a1a] bg-[#080808] hover:border-[#444] hover:bg-[#0a0a0a] transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col mb-4 md:mb-0">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-widest text-white bg-[#111] border border-[#333] px-3 py-1 rounded-sm">
                    {project.category}
                  </span>
                  <span className="font-[var(--font-mono)] text-[10px] text-[#555]">{project.year}</span>
                </div>
                
                <h3 className="font-[var(--font-display)] text-[28px] md:text-[36px] font-bold text-white leading-none mb-2 group-hover:translate-x-2 transition-transform duration-300">
                  {project.name}
                </h3>
                
                <p className="font-[var(--font-body)] text-[15px] text-[#888] max-w-lg mb-4">
                  {project.tagline}
                </p>

                <div className="flex gap-2 flex-wrap">
                  {project.stack.map(tech => (
                    <span key={tech} className="font-[var(--font-mono)] text-[10px] text-[#888] bg-[#111] border border-[#222] px-3 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
                <div className="w-12 h-12 rounded-full border border-[#444] group-hover:border-white flex items-center justify-center group-hover:bg-white transition-all duration-300">
                  <ArrowUpRight size={18} className="text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full max-w-[900px] mx-auto px-6 md:px-12 py-24 flex flex-col items-center text-center">
        <h2 className="font-[var(--font-display)] text-[clamp(32px,5vw,56px)] font-extrabold text-white mb-6 leading-tight">
          Want to be next?
        </h2>
        <p className="font-[var(--font-body)] text-[18px] text-[#888] mb-10 max-w-md">
          Tell us about your project. We&apos;ll tell you how we&apos;d build it.
        </p>
        <a 
          href="/contact"
          className="inline-flex items-center gap-2 bg-transparent border border-[#555] text-white font-[var(--font-mono)] text-[12px] uppercase tracking-wider px-8 py-4 rounded-full hover:border-white hover:bg-white hover:text-black transition-all duration-300"
        >
          Start a Project
        </a>
      </section>

      <Footer />
    </main>
  );
}
