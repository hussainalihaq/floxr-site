import Link from 'next/link';

export default function LabPage() {
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
            <Link className="text-secondary hover:text-primary transition-colors duration-300" href="/capabilities">Capabilities</Link>
            <Link className="text-primary font-bold border-b border-primary hover:text-primary transition-colors duration-300" href="/lab">Lab</Link>
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
              <span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest block mb-4">Insights & Teardowns</span>
              <h1 className="font-display-lg text-display-lg text-primary max-w-4xl leading-tight">The Lab</h1>
              <p className="font-body-lg text-body-lg text-secondary mt-stack-md max-w-2xl">Unfiltered analysis, technical teardowns, and essays on building robust digital systems.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mt-section-gap border-t border-l border-outline-variant">
            {/* Article 1 */}
            <Link className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group" href="#">
              <span className="font-label-mono text-label-mono text-secondary uppercase mb-stack-sm block">UX Teardown</span>
              <h3 className="font-body-lg text-body-lg text-primary mb-stack-lg group-hover:underline underline-offset-4">Why major SaaS platforms fail at complex navigation.</h3>
              <div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
                <span className="font-label-mono text-label-mono">Read</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
            {/* Article 2 */}
            <Link className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group" href="#">
              <span className="font-label-mono text-label-mono text-secondary uppercase mb-stack-sm block">Engineering</span>
              <h3 className="font-body-lg text-body-lg text-primary mb-stack-lg group-hover:underline underline-offset-4">Implementing AI: A pragmatic framework without the hype.</h3>
              <div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
                <span className="font-label-mono text-label-mono">Read</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
            {/* Article 3 */}
            <Link className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group" href="#">
              <span className="font-label-mono text-label-mono text-secondary uppercase mb-stack-sm block">Design Systems</span>
              <h3 className="font-body-lg text-body-lg text-primary mb-stack-lg group-hover:underline underline-offset-4">The ROI of rigid constraints in enterprise product design.</h3>
              <div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
                <span className="font-label-mono text-label-mono">Read</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </Link>
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
