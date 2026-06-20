import Link from 'next/link';

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-background text-primary font-body-md antialiased">
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-outline-variant transition-all duration-200 ease-in-out">
        <div className="flex justify-between items-center w-full px-grid-margin-mobile md:px-grid-margin py-stack-md max-w-[1440px] mx-auto">
          <Link className="flex items-center" href="/">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-10 md:h-12 w-auto" />
          </Link>
          <div className="hidden md:flex gap-gutter items-center font-body-md text-body-md uppercase tracking-widest">
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/work">Work</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/audit">Audit</Link>
            <Link className="text-primary font-bold border-b border-primary hover:text-primary transition-colors duration-300" href="/capabilities">Capabilities</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/lab">Lab</Link>
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/contact">Contact</Link>
          </div>
          <Link href="/contact">
            <button className="bg-primary text-on-primary font-label-mono text-label-mono uppercase px-6 py-3 hover:bg-surface-tint transition-colors duration-300 hidden md:block">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      <main className="flex-grow pt-32 pb-section-gap max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin">
        <section className="py-section-gap">
          <div className="mb-stack-lg flex justify-between items-end">
            <div>
              <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest block mb-4">Capabilities</span>
              <h1 className="font-display-lg text-display-lg text-primary max-w-4xl leading-tight">The Core Framework</h1>
              <p className="font-body-lg text-body-lg text-secondary mt-stack-md max-w-2xl">We do not offer a menu of discrete services. We deploy a unified framework of architecture, design, and engineering to solve complex business problems.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mt-section-gap">
            {/* Audit */}
            <div className="border border-outline-variant p-stack-lg bg-surface-container-lowest hover:bg-surface-alt transition-colors duration-300 group">
              <div className="text-primary mb-stack-sm flex justify-between items-start">
                <h3 className="font-headline-md text-headline-md">01. Audit</h3>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">troubleshoot</span>
              </div>
              <p className="font-body-md text-body-md text-secondary mb-stack-md min-h-[4rem]">Deep forensic analysis of your existing digital footprint to identify critical failure points.</p>
              <ul className="space-y-4 border-t border-outline-variant pt-stack-md font-label-mono text-label-mono text-primary">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Website Performance</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> UX/UI Teardowns</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Product Systems</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Operational Automation</li>
              </ul>
            </div>
            {/* Architect */}
            <div className="border border-outline-variant p-stack-lg bg-surface-container-lowest hover:bg-surface-alt transition-colors duration-300 group">
              <div className="text-primary mb-stack-sm flex justify-between items-start">
                <h3 className="font-headline-md text-headline-md">02. Architect</h3>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">architecture</span>
              </div>
              <p className="font-body-md text-body-md text-secondary mb-stack-md min-h-[4rem]">Designing scalable systems, rigid structures, and precise blueprints for growth.</p>
              <ul className="space-y-4 border-t border-outline-variant pt-stack-md font-label-mono text-label-mono text-primary">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Design Systems</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Information Architecture</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Data Structuring</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Brand Frameworks</li>
              </ul>
            </div>
            {/* Build */}
            <div className="border border-outline-variant p-stack-lg bg-surface-container-lowest hover:bg-surface-alt transition-colors duration-300 group">
              <div className="text-primary mb-stack-sm flex justify-between items-start">
                <h3 className="font-headline-md text-headline-md">03. Build</h3>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">construction</span>
              </div>
              <p className="font-body-md text-body-md text-secondary mb-stack-md min-h-[4rem]">Executing the blueprint with high-performance engineering and uncompromised quality.</p>
              <ul className="space-y-4 border-t border-outline-variant pt-stack-md font-label-mono text-label-mono text-primary">
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Web Development</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Custom Applications</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> CMS Integration</li>
                <li className="flex items-center gap-2"><span className="w-1 h-1 bg-primary"></span> Performance Tuning</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-on-primary w-full mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter px-grid-margin-mobile md:px-grid-margin py-section-gap max-w-[1440px] mx-auto items-start">
          <div className="md:col-span-6 flex flex-col space-y-stack-md">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-10 md:h-12 w-auto object-contain object-left mb-stack-sm brightness-0 invert" />
            <div className="font-body-lg text-body-lg text-left text-on-primary/70">© 2024 FLOXR. Digital Architecture Firm.</div>
          </div>
          <div className="md:col-span-6 flex justify-start md:justify-end mt-stack-lg md:mt-0">
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
              <li><a className="font-body-lg text-body-lg text-on-primary/70 hover:opacity-80 transition-opacity cursor-pointer" href="#">LinkedIn</a></li>
              <li><a className="font-body-lg text-body-lg text-on-primary/70 hover:opacity-80 transition-opacity cursor-pointer" href="#">Instagram</a></li>
              <li><Link className="font-body-lg text-body-lg text-on-primary/70 hover:opacity-80 transition-opacity cursor-pointer" href="/contact">Contact</Link></li>
              <li><a className="font-body-lg text-body-lg text-on-primary/70 hover:opacity-80 transition-opacity cursor-pointer" href="#">Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
