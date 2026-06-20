import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function LabPage() {
  return (
    <div className="min-h-screen bg-background text-primary font-body-md antialiased">
      <Navbar />

      <main className="flex-grow pt-[140px] pb-section-gap max-w-[1440px] mx-auto px-6 md:px-12">
        <section className="mb-16">
          <h1 className="font-display-lg text-[64px] md:text-[88px] font-bold tracking-tight text-primary leading-none mb-6">Lab</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl leading-relaxed mb-12">
            An archive of technical essays, deep-dive UX teardowns, and structural insights from the forefront of digital architecture.
          </p>
          
          <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant pb-8">
            <span className="font-label-mono text-[10px] text-secondary uppercase tracking-widest mr-4">Filter By:</span>
            <button className="bg-primary text-on-primary font-label-mono text-[10px] uppercase tracking-widest px-4 py-2">All</button>
            <button className="bg-surface-alt text-secondary hover:text-primary hover:bg-outline-variant transition-colors font-label-mono text-[10px] uppercase tracking-widest px-4 py-2">Engineering</button>
            <button className="bg-surface-alt text-secondary hover:text-primary hover:bg-outline-variant transition-colors font-label-mono text-[10px] uppercase tracking-widest px-4 py-2">UX Research</button>
            <button className="bg-surface-alt text-secondary hover:text-primary hover:bg-outline-variant transition-colors font-label-mono text-[10px] uppercase tracking-widest px-4 py-2">Design Systems</button>
          </div>
        </section>

        <section className="flex flex-col">
          {/* Article 1 */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-outline-variant group">
            <div className="md:col-span-2 font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2">
              Oct 24, 2026
            </div>
            <div className="md:col-span-8">
              <Link href="#" className="block">
                <h2 className="font-headline-lg text-[28px] md:text-[36px] font-bold text-primary mb-4 group-hover:opacity-80 transition-opacity">The Topology of Component States</h2>
                <p className="font-body-md text-secondary leading-relaxed max-w-3xl">
                  A rigorous examination of state machine principles applied to front-end component libraries. We tear down the common pitfalls of boolean prop pollution and advocate for strict, exhaustive state definitions in enterprise design systems.
                </p>
              </Link>
            </div>
            <div className="md:col-span-2 md:text-right font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2">
              Design Systems
            </div>
          </article>

          {/* Article 2 */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-outline-variant group">
            <div className="md:col-span-2 font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2">
              Sep 12, 2026
            </div>
            <div className="md:col-span-8">
              <Link href="#" className="block">
                <h2 className="font-headline-lg text-[28px] md:text-[36px] font-bold text-primary mb-4 group-hover:opacity-80 transition-opacity">WebGPU: Beyond the Canvas</h2>
                <div className="font-body-md text-secondary leading-relaxed max-w-3xl">
                  <span className="font-label-mono text-[11px] text-[#ff3333] font-bold uppercase tracking-wider mr-2">[STRUCTURAL REVIEW]</span>
                  Moving computation to the edge of the browser. This technical essay explores how leveraging WebGPU for heavy data visualization tasks can unlock unprecedented performance metrics in dashboard architectures.
                </div>
              </Link>
            </div>
            <div className="md:col-span-2 md:text-right font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2">
              Engineering
            </div>
          </article>

          {/* Article 3 */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-outline-variant group">
            <div className="md:col-span-2 font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2">
              Aug 05, 2026
            </div>
            <div className="md:col-span-8">
              <Link href="#" className="block">
                <h2 className="font-headline-lg text-[28px] md:text-[36px] font-bold text-primary mb-4 group-hover:opacity-80 transition-opacity">Friction as a Feature</h2>
                <div className="font-body-md text-secondary leading-relaxed max-w-3xl">
                  <span className="font-label-mono text-[11px] text-[#ff3333] font-bold uppercase tracking-wider mr-2">[EXPERT ANALYSIS]</span>
                  A UX teardown of high-stakes transactional interfaces. Counterintuitively, introducing calculated friction points can elevate user trust and prevent critical errors. An analysis of institutional fintech flows.
                </div>
              </Link>
            </div>
            <div className="md:col-span-2 md:text-right font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2">
              UX Research
            </div>
          </article>

          {/* Article 4 */}
          <article className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 group">
            <div className="md:col-span-2 font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2">
              Jul 18, 2026
            </div>
            <div className="md:col-span-8">
              <Link href="#" className="block">
                <h2 className="font-headline-lg text-[28px] md:text-[36px] font-bold text-primary mb-4 group-hover:opacity-80 transition-opacity">Typographic Scales in Fluid Contexts</h2>
                <p className="font-body-md text-secondary leading-relaxed max-w-3xl">
                  Mathematical approaches to responsive typography. Moving away from arbitrary breakpoints toward clamp-based fluid scales that maintain harmonic proportions across all viewport dimensions.
                </p>
              </Link>
            </div>
            <div className="md:col-span-2 md:text-right font-label-mono text-[10px] text-secondary uppercase tracking-widest pt-2">
              Design Systems
            </div>
          </article>

          <div className="flex justify-center mt-12 mb-16">
            <button className="border border-outline hover:border-primary text-secondary hover:text-primary font-label-mono text-[10px] uppercase tracking-widest px-6 py-3 transition-colors flex items-center gap-2">
              Load More Archive
              <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
            </button>
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
