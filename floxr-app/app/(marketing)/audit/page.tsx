'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function AuditPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white font-body-md antialiased selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-grow pt-32 pb-section-gap max-w-[1440px] mx-auto">
        {/* Hero Section */}
        <section className="px-grid-margin-mobile md:px-grid-margin py-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-7 flex flex-col space-y-stack-lg">
              <div className="inline-flex items-center space-x-2">
                <span className="bg-[#222222] px-3 py-1 font-label-mono text-label-mono text-white uppercase border border-[#444444]">Diagnostic Tool</span>
                <span className="material-symbols-outlined text-white text-sm">architecture</span>
              </div>
              <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-white font-bold leading-tight">
                  The Floxr Digital Audit™
              </h1>
              <p className="font-body-lg text-body-lg text-[#aaaaaa] max-w-2xl leading-relaxed">
                  A rigorous, multi-disciplinary analysis of your digital architecture. We uncover structural inefficiencies, evaluate technological debt, and identify high-impact opportunities for systematic growth.
              </p>
              <div className="pt-stack-md">
                <Link href="#initiate-audit">
                  <button className="bg-[#222222] text-white font-label-mono text-label-mono uppercase px-8 py-4 border border-[#444444] hover:bg-white hover:text-black transition-colors duration-300 flex items-center space-x-2 w-fit">
                    <span>Request Diagnostic</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="md:col-span-5 mt-stack-lg md:mt-0">
              <div className="relative w-full aspect-square bg-[#1a1a1a] border border-[#333333] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                <div className="z-10 bg-white border border-white p-stack-md shadow-xl text-black">
                  <div className="font-label-mono text-label-mono uppercase mb-2 text-[#555]">Typical Audit Readiness Score</div>
                  <div className="font-headline-lg text-headline-lg font-bold">92.4%</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Analyze (Bento Grid) */}
        <section className="px-grid-margin-mobile md:px-grid-margin py-section-gap border-t border-[#333333]">
          <div className="mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-white font-bold">Structural Diagnostics</h2>
            <p className="font-body-md text-body-md text-[#aaaaaa] mt-stack-sm max-w-xl">We deconstruct your digital presence across four critical vectors to ensure architectural integrity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[240px]">
            {/* UX Card */}
            <div className="md:col-span-8 bg-[#1a1a1a] border border-[#333333] p-stack-lg flex flex-col justify-between group hover:bg-[#222222] transition-colors duration-300">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-white text-3xl">route</span>
                <span className="font-label-mono text-label-mono text-[#888888]">01 / Vector</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-white font-bold">User Experience (UX) Architecture</h3>
                <p className="font-body-md text-body-md text-[#aaaaaa] mt-2 max-w-lg">Evaluating navigation flows, friction points, and cognitive load to ensure seamless user journeys.</p>
              </div>
            </div>
            
            {/* Tech Stack Card */}
            <div className="md:col-span-4 bg-[#222222] border border-[#444444] text-white p-stack-lg flex flex-col justify-between group">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-white text-3xl">code_blocks</span>
                <span className="font-label-mono text-label-mono text-[#aaaaaa]">02 / Vector</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-white font-bold">Tech Stack Integrity</h3>
                <p className="font-body-md text-body-md text-[#aaaaaa] mt-2">Assessing performance, technical debt, and scalability.</p>
              </div>
            </div>
            
            {/* Brand Card */}
            <div className="md:col-span-4 bg-[#1a1a1a] border border-[#333333] p-stack-lg flex flex-col justify-between group hover:bg-[#222222] transition-colors duration-300">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-white text-3xl">diamond</span>
                <span className="font-label-mono text-label-mono text-[#888888]">03 / Vector</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-white font-bold">Brand Cohesion</h3>
                <p className="font-body-md text-body-md text-[#aaaaaa] mt-2">Analyzing visual consistency and semantic alignment.</p>
              </div>
            </div>
            
            {/* Operations Card */}
            <div className="md:col-span-8 bg-[#222222] border border-[#333333] p-stack-lg flex flex-col justify-between group">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-white text-3xl">settings_account_box</span>
                <span className="font-label-mono text-label-mono text-[#888888]">04 / Vector</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-white font-bold">Operational Systems</h3>
                <p className="font-body-md text-body-md text-[#aaaaaa] mt-2 max-w-lg">Reviewing internal workflows, CMS utilization, and integration efficiencies that support the digital facade.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="px-grid-margin-mobile md:px-grid-margin py-section-gap border-t border-[#333333]">
          <div className="mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-white font-bold">Methodology</h2>
          </div>
          
          <div className="relative border-l border-[#333333] ml-4 md:ml-8 pl-8 md:pl-16 space-y-stack-lg py-stack-md">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[33px] md:-left-[65px] top-1 w-4 h-4 bg-white border-4 border-[#111111]"></div>
              <div className="font-label-mono text-label-mono text-[#888888] mb-1">Phase I / Week 1</div>
              <h3 className="font-headline-md text-headline-md text-white font-bold">Discovery & Intake</h3>
              <p className="font-body-md text-body-md text-[#aaaaaa] mt-2 max-w-2xl">We conduct stakeholder interviews and gather all existing analytics, documentation, and access credentials to establish a baseline.</p>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[33px] md:-left-[65px] top-1 w-4 h-4 bg-[#111111] border-2 border-white"></div>
              <div className="font-label-mono text-label-mono text-[#888888] mb-1">Phase II / Week 2-3</div>
              <h3 className="font-headline-md text-headline-md text-white font-bold">Rigorous Analysis</h3>
              <p className="font-body-md text-body-md text-[#aaaaaa] mt-2 max-w-2xl">Our architects deploy proprietary diagnostic tools to evaluate the four vectors, identifying structural flaws and optimization opportunities.</p>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[33px] md:-left-[65px] top-1 w-4 h-4 bg-[#111111] border-2 border-white"></div>
              <div className="font-label-mono text-label-mono text-[#888888] mb-1">Phase III / Week 4</div>
              <h3 className="font-headline-md text-headline-md text-white font-bold">Blueprint Delivery</h3>
              <p className="font-body-md text-body-md text-[#aaaaaa] mt-2 max-w-2xl">Presentation of the comprehensive Audit Report, including a prioritized, actionable roadmap for systematic improvement.</p>
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="initiate-audit" className="bg-[#efefef] text-black px-grid-margin-mobile md:px-grid-margin py-section-gap border-t border-[#333333] -mx-grid-margin-mobile md:-mx-grid-margin rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-black font-bold">Initiate Audit</h2>
              <p className="font-body-md text-body-md text-[#555555] mt-stack-md max-w-md">
                  Provide preliminary details regarding your current digital infrastructure. A senior architect will review your submission and contact you within 24 hours.
              </p>
            </div>
            <form className="space-y-stack-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                <div>
                  <label className="block font-label-mono text-label-mono text-[#555555] mb-2 uppercase">First Name</label>
                  <input className="w-full bg-transparent border-b border-[#aaaaaa] py-2 font-body-md text-black focus:border-black outline-none transition-colors" placeholder="Jane" type="text" />
                </div>
                <div>
                  <label className="block font-label-mono text-label-mono text-[#555555] mb-2 uppercase">Last Name</label>
                  <input className="w-full bg-transparent border-b border-[#aaaaaa] py-2 font-body-md text-black focus:border-black outline-none transition-colors" placeholder="Doe" type="text" />
                </div>
              </div>
              
              <div>
                <label className="block font-label-mono text-label-mono text-[#555555] mb-2 uppercase">Corporate Email</label>
                <input className="w-full bg-transparent border-b border-[#aaaaaa] py-2 font-body-md text-black focus:border-black outline-none transition-colors" placeholder="jane@company.com" type="email" />
              </div>
              
              <div>
                <label className="block font-label-mono text-label-mono text-[#555555] mb-2 uppercase">Primary Objective</label>
                <select className="w-full bg-transparent border-b border-[#aaaaaa] py-2 font-body-md text-black focus:border-black outline-none transition-colors appearance-none rounded-none">
                  <option>UX Modernization</option>
                  <option>Tech Stack Consolidation</option>
                  <option>Brand Realignment</option>
                  <option>Comprehensive Overhaul</option>
                </select>
              </div>
              
              <div className="pt-stack-md">
                <button className="bg-black text-white font-label-mono text-label-mono uppercase px-8 py-4 w-full border border-black hover:bg-white hover:text-black transition-colors duration-300" type="submit">
                    Submit Request
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#111111] text-white w-full border-t border-[#333333]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-grid-margin-mobile md:px-grid-margin py-section-gap max-w-[1440px] mx-auto items-start">
          <div className="md:col-span-6 flex flex-col space-y-stack-md">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-10 md:h-12 w-auto object-contain object-left mb-stack-sm brightness-0 invert" />
            <div className="font-body-lg text-body-lg text-left text-[#aaaaaa]">© 2024 FLOXR. Digital Architecture Firm.</div>
          </div>
          <div className="md:col-span-6 flex justify-start md:justify-end mt-stack-lg md:mt-0">
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
              <li><a className="font-body-lg text-body-lg text-[#aaaaaa] hover:text-white transition-opacity cursor-pointer" href="#">LinkedIn</a></li>
              <li><a className="font-body-lg text-body-lg text-[#aaaaaa] hover:text-white transition-opacity cursor-pointer" href="#">Instagram</a></li>
              <li><Link className="font-body-lg text-body-lg text-[#aaaaaa] hover:text-white transition-opacity cursor-pointer" href="/contact">Contact</Link></li>
              <li><a className="font-body-lg text-body-lg text-[#aaaaaa] hover:text-white transition-opacity cursor-pointer" href="#">Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
