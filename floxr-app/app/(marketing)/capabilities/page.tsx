import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-background text-primary font-body-md antialiased">
      <Navbar />

      <main className="flex-grow pb-section-gap px-6 md:px-12 max-w-[1440px] mx-auto pt-[72px] md:pt-[80px]">
        {/* Hero Section */}
        <header className="mb-section-gap md:mt-section-gap">
          <h1 className="font-display-lg text-[48px] md:text-[80px] font-bold text-primary mb-8 max-w-4xl leading-[1.1]">
            Engineering Digital <br /><span className="text-secondary">Excellence.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
            Our capabilities are built on a rigorous framework of Audit, Architecture, and Build. We don't just design interfaces; we engineer scalable digital systems that drive measurable business outcomes.
          </p>
        </header>

        {/* Framework Grid */}
        <section className="mb-section-gap">
          <div className="flex flex-col gap-12 border-l border-outline-variant pl-4 md:pl-8">
            {/* Pillar 1: Audit */}
            <div className="flex gap-4 md:gap-8 hover:bg-surface-alt transition-colors duration-300 group pt-4">
              <div className="font-display-lg text-[80px] md:text-[120px] font-bold text-outline-variant leading-none group-hover:text-primary transition-colors">
                01
              </div>
              <div className="border border-outline-variant p-6 flex-1 bg-surface-container-lowest">
                <h3 className="font-label-mono text-[12px] uppercase tracking-widest text-primary mb-4 font-bold">Audit</h3>
                <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                  Deep analytical review of existing infrastructure. We identify bottlenecks, technical debt, and opportunities for architectural optimization before writing a single line of code.
                </p>
              </div>
            </div>

            {/* Pillar 2: Architect */}
            <div className="flex gap-4 md:gap-8 hover:bg-surface-alt transition-colors duration-300 group">
              <div className="font-display-lg text-[80px] md:text-[120px] font-bold text-outline-variant leading-none group-hover:text-primary transition-colors">
                02
              </div>
              <div className="border border-outline-variant p-6 flex-1 bg-surface-container-lowest">
                <h3 className="font-label-mono text-[12px] uppercase tracking-widest text-primary mb-4 font-bold">Architect</h3>
                <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                  System design phase. We construct detailed technical blueprints, select optimal tech stacks, and define data models to ensure a robust, scalable foundation.
                </p>
              </div>
            </div>

            {/* Pillar 3: Build */}
            <div className="flex gap-4 md:gap-8 hover:bg-surface-alt transition-colors duration-300 group">
              <div className="font-display-lg text-[80px] md:text-[120px] font-bold text-outline-variant leading-none group-hover:text-primary transition-colors">
                03
              </div>
              <div className="border border-outline-variant p-6 flex-1 bg-surface-container-lowest">
                <h3 className="font-label-mono text-[12px] uppercase tracking-widest text-primary mb-4 font-bold">Build</h3>
                <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                  Precision engineering. Agile execution of the architectural blueprint utilizing modern frameworks, rigorous testing protocols, and CI/CD pipelines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-section-gap">
          <div className="mb-8">
            <h2 className="font-headline-lg text-[24px] md:text-[32px] font-bold text-primary mb-4 uppercase tracking-wider">Tech Stack</h2>
            <p className="font-body-md text-[14px] text-secondary leading-relaxed max-w-2xl">
              Our tools of choice for high-performance enterprise applications.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="font-label-mono text-[10px] bg-surface-alt border border-outline-variant px-3 py-2 text-primary uppercase tracking-widest">React</span>
            <span className="font-label-mono text-[10px] bg-surface-alt border border-outline-variant px-3 py-2 text-primary uppercase tracking-widest">Next.js</span>
            <span className="font-label-mono text-[10px] bg-surface-alt border border-outline-variant px-3 py-2 text-primary uppercase tracking-widest">TypeScript</span>
            <span className="font-label-mono text-[10px] bg-surface-alt border border-outline-variant px-3 py-2 text-primary uppercase tracking-widest">Node.js</span>
            <span className="font-label-mono text-[10px] bg-surface-alt border border-outline-variant px-3 py-2 text-primary uppercase tracking-widest">PostgreSQL</span>
            <span className="font-label-mono text-[10px] bg-surface-alt border border-outline-variant px-3 py-2 text-primary uppercase tracking-widest">Tailwind</span>
            <span className="font-label-mono text-[10px] bg-surface-alt border border-outline-variant px-3 py-2 text-primary uppercase tracking-widest">AWS</span>
            <span className="font-label-mono text-[10px] bg-surface-alt border border-outline-variant px-3 py-2 text-primary uppercase tracking-widest">Docker</span>
          </div>
        </section>

        {/* Built For Scale */}
        <section className="mb-section-gap border-t border-outline-variant pt-12">
          <h2 className="font-headline-lg text-[24px] md:text-[32px] font-bold text-primary mb-8 uppercase tracking-wider">Built For Scale</h2>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-label-mono text-[12px] font-bold text-primary mb-2 uppercase tracking-widest">01. Modularity</h4>
              <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                Component-driven architecture allowing independent scaling and updates.
              </p>
            </div>
            
            <div className="border-t border-outline-variant pt-8">
              <h4 className="font-label-mono text-[12px] font-bold text-primary mb-2 uppercase tracking-widest">02. Performance</h4>
              <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                Strict budgets on payload sizes and core web vitals optimization.
              </p>
            </div>
            
            <div className="border-t border-outline-variant pt-8">
              <h4 className="font-label-mono text-[12px] font-bold text-primary mb-2 uppercase tracking-widest">03. Security</h4>
              <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                Enterprise-grade encryption, zero-trust network policies, and regular audits.
              </p>
            </div>
            
            <div className="border-t border-outline-variant pt-8 border-b pb-8">
              <h4 className="font-label-mono text-[12px] font-bold text-primary mb-2 uppercase tracking-widest">04. Observability</h4>
              <p className="font-body-md text-[14px] text-secondary leading-relaxed">
                Comprehensive logging, tracing, and real-time metrics dashboards.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-on-primary w-full mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-6 md:px-12 py-section-gap max-w-[1440px] mx-auto items-start">
          <div className="md:col-span-6 flex flex-col space-y-8">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-8 md:h-12 w-auto object-contain object-left mb-2 brightness-0 invert" />
            <div className="font-body-sm text-sm text-left text-[#888888] mb-1">hello@floxr.co</div>
            <div className="font-body-sm text-sm text-left text-[#888888]">© 2026 FLOXR built in house.</div>
          </div>
          <div className="md:col-span-6 flex justify-start md:justify-end mt-12 md:mt-0">
            <ul className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0">
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/">About</a></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/">Contact</a></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/">LinkedIn</a></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/">Privacy</a></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="/">Instagram</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
