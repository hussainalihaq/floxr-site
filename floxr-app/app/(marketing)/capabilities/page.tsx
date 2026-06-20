import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-background text-primary font-body-md antialiased">
      <Navbar />

      <main className="flex-grow pt-[140px] pb-section-gap px-6 md:px-12 max-w-[1440px] mx-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Audit */}
            <div className="bg-surface-container-lowest border border-outline-variant p-8 hover:bg-surface-alt transition-colors duration-300 group">
              <div className="flex justify-between items-start mb-8">
                <span className="font-label-mono text-[12px] bg-surface-alt px-3 py-1 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">01</span>
                <span className="material-symbols-outlined text-primary text-3xl font-light">analytics</span>
              </div>
              <h3 className="font-headline-md text-[32px] font-bold text-primary mb-4">Audit</h3>
              <p className="font-body-md text-secondary mb-8 leading-relaxed">
                Deep forensic analysis of your existing digital infrastructure. We identify performance bottlenecks, UX friction points, and architectural debt before writing a single line of code.
              </p>
              <ul className="space-y-3 font-body-md text-secondary">
                <li className="flex items-center gap-2 border-t border-outline-variant pt-3"><span className="material-symbols-outlined text-sm">check_small</span> Technical Due Diligence</li>
                <li className="flex items-center gap-2 border-t border-outline-variant pt-3"><span className="material-symbols-outlined text-sm">check_small</span> UX/UI Heuristic Evaluation</li>
                <li className="flex items-center gap-2 border-t border-outline-variant pt-3"><span className="material-symbols-outlined text-sm">check_small</span> Performance Benchmarking</li>
              </ul>
            </div>

            {/* Pillar 2: Architect */}
            <div className="bg-surface-container-lowest border border-primary p-8 hover:bg-surface-alt transition-colors duration-300 group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex justify-between items-start mb-8">
                <span className="font-label-mono text-[12px] bg-primary px-3 py-1 text-on-primary">02</span>
                <span className="material-symbols-outlined text-primary text-3xl font-light">architecture</span>
              </div>
              <h3 className="font-headline-md text-[32px] font-bold text-primary mb-4">Architect</h3>
              <p className="font-body-md text-secondary mb-8 leading-relaxed">
                Translating audit insights into a robust blueprint. We design system architectures and design languages that are scalable, maintainable, and aligned with enterprise goals.
              </p>
              <ul className="space-y-3 font-body-md text-secondary">
                <li className="flex items-center gap-2 border-t border-outline-variant pt-3"><span className="material-symbols-outlined text-sm">check_small</span> System Design & Topography</li>
                <li className="flex items-center gap-2 border-t border-outline-variant pt-3"><span className="material-symbols-outlined text-sm">check_small</span> Design System Engineering</li>
                <li className="flex items-center gap-2 border-t border-outline-variant pt-3"><span className="material-symbols-outlined text-sm">check_small</span> Data Flow Mapping</li>
              </ul>
            </div>

            {/* Pillar 3: Build */}
            <div className="bg-surface-container-lowest border border-outline-variant p-8 hover:bg-surface-alt transition-colors duration-300 group">
              <div className="flex justify-between items-start mb-8">
                <span className="font-label-mono text-[12px] bg-surface-alt px-3 py-1 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">03</span>
                <span className="material-symbols-outlined text-primary text-3xl font-light">construction</span>
              </div>
              <h3 className="font-headline-md text-[32px] font-bold text-primary mb-4">Build</h3>
              <p className="font-body-md text-secondary mb-8 leading-relaxed">
                Precision execution. We deploy modern tech stacks to bring the architecture to life, ensuring high fidelity to the design system and uncompromising technical performance.
              </p>
              <ul className="space-y-3 font-body-md text-secondary">
                <li className="flex items-center gap-2 border-t border-outline-variant pt-3"><span className="material-symbols-outlined text-sm">check_small</span> Front-End Engineering (React)</li>
                <li className="flex items-center gap-2 border-t border-outline-variant pt-3"><span className="material-symbols-outlined text-sm">check_small</span> Headless CMS Integration</li>
                <li className="flex items-center gap-2 border-t border-outline-variant pt-3"><span className="material-symbols-outlined text-sm">check_small</span> CI/CD Pipeline Setup</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tech Stack Bento Grid */}
        <section className="mb-section-gap">
          <div className="border-b border-primary pb-4 mb-8 flex justify-between items-end">
            <h2 className="font-headline-lg text-[48px] font-bold text-primary">Tech Stack Overview</h2>
            <span className="font-label-mono text-[12px] text-secondary hidden md:block">CURRENT AS OF Q4 2026</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Stack Category 1 */}
            <div className="col-span-1 md:col-span-2 bg-surface-alt p-8 border border-outline-variant">
              <h4 className="font-headline-md text-[32px] font-bold text-primary mb-6">Frontend Core</h4>
              <div className="flex flex-wrap gap-3">
                <span className="font-label-mono text-[12px] bg-background border border-outline-variant px-4 py-2 text-primary">React 19</span>
                <span className="font-label-mono text-[12px] bg-background border border-outline-variant px-4 py-2 text-primary">Next.js 14</span>
                <span className="font-label-mono text-[12px] bg-background border border-outline-variant px-4 py-2 text-primary">TypeScript</span>
                <span className="font-label-mono text-[12px] bg-background border border-outline-variant px-4 py-2 text-primary">Tailwind CSS v3</span>
                <span className="font-label-mono text-[12px] bg-background border border-outline-variant px-4 py-2 text-primary">Framer Motion</span>
              </div>
            </div>
            {/* Stack Category 2 */}
            <div className="col-span-1 md:col-span-1 bg-background border border-outline-variant p-8">
              <h4 className="font-body-lg text-lg font-bold text-primary mb-6">State & Data</h4>
              <ul className="space-y-3 font-label-mono text-[12px] text-secondary">
                <li className="border-b border-outline-variant pb-2">Zustand</li>
                <li className="border-b border-outline-variant pb-2">React Query</li>
                <li className="border-b border-outline-variant pb-2">tRPC</li>
              </ul>
            </div>
            {/* Stack Category 3 */}
            <div className="col-span-1 md:col-span-1 bg-background border border-outline-variant p-8">
              <h4 className="font-body-lg text-lg font-bold text-primary mb-6">Infrastructure</h4>
              <ul className="space-y-3 font-label-mono text-[12px] text-secondary">
                <li className="border-b border-outline-variant pb-2">Vercel</li>
                <li className="border-b border-outline-variant pb-2">AWS Core</li>
                <li className="border-b border-outline-variant pb-2">Docker</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Methodology Feature */}
        <section className="mb-section-gap grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 h-[400px] w-full bg-surface-alt border border-outline-variant relative overflow-hidden flex items-center justify-center group">
            {/* Abstract visual representation of methodology */}
            <div className="relative z-10 grid grid-cols-3 gap-2 w-1/2 h-1/2 opacity-80 mix-blend-difference group-hover:scale-105 transition-transform duration-700">
              <div className="bg-primary h-full w-full"></div>
              <div className="bg-[#aaaaaa] h-full w-full"></div>
              <div className="bg-primary h-full w-full"></div>
              <div className="bg-[#aaaaaa] h-full w-full"></div>
              <div className="bg-primary h-full w-full"></div>
              <div className="bg-[#aaaaaa] h-full w-full"></div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="font-label-mono text-[12px] bg-surface-alt px-3 py-1 text-primary inline-block mb-6 tracking-widest">THE PROCESS</span>
            <h2 className="font-headline-lg text-[48px] font-bold text-primary mb-6">Methodology built for scale.</h2>
            <p className="font-body-lg text-lg text-secondary mb-10 leading-relaxed">
              We reject the chaotic 'move fast and break things' mantra. Instead, we advocate for 'move deliberately and build solid foundations'. Our methodology integrates strict quality assurance loops at every stage of the lifecycle.
            </p>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-surface-alt border border-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">sync</span>
                </div>
                <div>
                  <h4 className="font-body-lg text-lg font-bold text-primary mb-1">Iterative Precision</h4>
                  <p className="font-body-md text-secondary">Short, focused sprints prioritizing functional deliverables over abstract concepts.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">rule</span>
                </div>
                <div>
                  <h4 className="font-body-lg text-lg font-bold text-primary mb-1">Strict QA Protocols</h4>
                  <p className="font-body-md text-secondary">Automated testing combined with manual expert heuristic reviews before every major commit.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-on-primary w-full mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-6 md:px-12 py-section-gap max-w-[1440px] mx-auto items-start">
          <div className="md:col-span-6 flex flex-col space-y-8">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-6 md:h-8 w-auto object-contain object-left mb-2 brightness-0 invert" />
            <div className="font-body-sm text-sm text-left text-[#888888]">© 2026 FLOXR built in house.</div>
          </div>
          <div className="md:col-span-6 flex justify-start md:justify-end mt-12 md:mt-0">
            <ul className="flex flex-col md:flex-row md:space-x-12 space-y-4 md:space-y-0">
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="#">About</a></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="#">Contact</a></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="#">LinkedIn</a></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="#">Privacy</a></li>
              <li><a className="font-body-sm text-sm text-[#888888] hover:text-white transition-colors cursor-pointer" href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
