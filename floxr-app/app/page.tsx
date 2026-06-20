
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      
{/* TopNavBar */}
<nav className="bg-background dark:bg-on-background fixed top-0 w-full z-50 border-b border-primary dark:border-on-primary-container transition-all duration-200 ease-in-out">
<div className="flex justify-between items-center w-full px-grid-margin-mobile md:px-grid-margin py-stack-md max-w-[1440px] mx-auto">
<Link className="font-headline-md text-headline-md font-bold tracking-tighter text-primary dark:text-on-primary" href="/">FLOXR</Link>
<div className="hidden md:flex gap-gutter items-center font-body-md text-body-md uppercase tracking-widest">
<Link className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary transition-colors duration-300" href="/">Work</Link>
<Link className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary transition-colors duration-300" href="/">Audit</Link>
<Link className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary transition-colors duration-300" href="/">Capabilities</Link>
<Link className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary transition-colors duration-300" href="/">Lab</Link>
<Link className="text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary transition-colors duration-300" href="/contact">Contact</Link>
</div>
<button className="bg-primary text-on-primary font-label-mono text-label-mono uppercase px-6 py-3 hover:bg-surface-tint transition-colors duration-300 hidden md:block">
                Get Started
            </button>
<button className="md:hidden text-primary">
<span className="material-symbols-outlined">menu</span>
</button>
</div>
</nav>
<main className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin">
{/* Hero Section */}
<section className="py-section-gap min-h-[819px] flex flex-col justify-center">
<h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary max-w-4xl mb-stack-lg leading-tight">
                We diagnose what is broken, design what should exist, and build what moves businesses forward.
            </h1>
<p className="font-body-lg text-body-lg text-secondary max-w-2xl mb-stack-lg border-l border-primary pl-4">
                Digital Architecture &amp; Product Systems for ambitious companies.
            </p>
<div className="flex gap-4">
<button className="bg-primary text-on-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:bg-surface-tint transition-colors duration-300">
                    Explore Our Work
                </button>
</div>
</section>
{/* The Core Framework (Services) */}
<section className="py-section-gap border-t border-secondary-container">
<div className="mb-stack-lg flex justify-between items-end">
<h2 className="font-headline-lg text-headline-lg text-primary">The Core Framework</h2>
<span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest hidden md:block">Capabilities</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
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
{/* Lead Magnet (The Audit) */}
<section className="py-section-gap">
<div className="bg-primary text-on-primary p-grid-margin-mobile md:p-grid-margin flex flex-col md:flex-row gap-stack-lg items-center">
<div className="flex-1">
<div className="inline-block px-3 py-1 bg-surface-tint text-on-primary font-label-mono text-label-mono mb-stack-md uppercase">Proprietary Tool</div>
<h2 className="font-headline-lg text-headline-lg mb-stack-sm">The Floxr Digital Audit™</h2>
<p className="font-body-lg text-body-lg text-secondary-container mb-stack-lg max-w-xl">
                        A rigorous, unvarnished review of your current tech stack, brand coherence, and operational efficiency. Stop guessing where you're losing money.
                    </p>
<button className="bg-on-primary text-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:bg-surface-dim transition-colors duration-300">
                        Request an Audit
                    </button>
</div>
<div className="flex-1 w-full h-64 md:h-96 relative border border-surface-tint bg-on-background overflow-hidden flex items-center justify-center group">
{/* Abstract representation of an audit */}
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
<span className="material-symbols-outlined text-surface-tint text-[8rem] group-hover:scale-110 transition-transform duration-700 ease-out">search_insights</span>
</div>
</div>
</section>
{/* Portfolio (Selected Transformations) */}
<section className="py-section-gap border-t border-secondary-container">
<div className="mb-stack-lg flex justify-between items-end">
<h2 className="font-headline-lg text-headline-lg text-primary">Selected Transformations</h2>
<span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest hidden md:block">Case Studies</span>
</div>
{/* Case Study 1 */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap items-center">
<div className="md:col-span-7 h-[614px] border border-outline-variant relative overflow-hidden bg-surface-alt">
<img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" data-alt="A sleek, high-end dashboard interface displayed on a modern monitor in a brightly lit, minimalist workspace. The UI is predominantly white and gray with stark black typography, reflecting a highly professional corporate modernism aesthetic. The room features vast white walls and subtle architectural details, emphasizing structural integrity and clear, functional design. Soft, diffused daylight casts minimal shadows, enhancing the clean, authoritative tone of the environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfF0hfXOADQ_ByyF6oBGFCxo-3M2PLucpodoBqmLRGltRhsrBf3gZmvWlfvoHRJIIlJNuNmdGWrdr2emFMrWNZ3m8yAPXkusoPQAGSo2eo_yhu24ZeO75gkenPyxmK5KzYQT4kgeTI-F2p_Mw645Xm_dKwbeDAnqqI2_TG8BpRXDlQ4mzdWnFMCqUImqbKOxpObBHXx5f2GyeJsVcOgN_ykFfv1oG6e_biDzUf3IQ1Kw04ymSkTnzxWOo_iklOTLTIbDHbQZTkusR_"/>
</div>
<div className="md:col-span-5 md:pl-stack-lg">
<h3 className="font-headline-md text-headline-md text-primary mb-stack-sm">Fintech Logistics Rebuild</h3>
<div className="flex gap-2 mb-stack-lg">
<span className="px-2 py-1 bg-surface-alt text-primary font-label-mono text-label-mono">Systems</span>
<span className="px-2 py-1 bg-surface-alt text-primary font-label-mono text-label-mono">Web App</span>
</div>
<div className="space-y-stack-md">
<div className="border-l-2 border-outline-variant pl-4">
<span className="font-label-mono text-label-mono text-secondary uppercase block mb-1">Problem</span>
<p className="font-body-md text-body-md text-primary">Fragmented data streams causing a 40% drop-off in enterprise client onboarding.</p>
</div>
<div className="border-l-2 border-outline-variant pl-4">
<span className="font-label-mono text-label-mono text-secondary uppercase block mb-1">Solution</span>
<p className="font-body-md text-body-md text-primary">Architected a unified data layer and redesigned the dashboard using a rigid, user-centric bento grid.</p>
</div>
<div className="border-l-2 border-primary pl-4 bg-surface-alt p-2">
<span className="font-label-mono text-label-mono text-primary uppercase block mb-1">Result</span>
<p className="font-body-md text-body-md text-primary font-bold">Onboarding time reduced by 65%. Zero data loss incidents.</p>
</div>
</div>
</div>
</div>
</section>
{/* The Lab */}
<section className="py-section-gap border-t border-secondary-container">
<div className="mb-stack-lg flex justify-between items-end">
<h2 className="font-headline-lg text-headline-lg text-primary">The Lab</h2>
<span className="font-label-mono text-label-mono text-secondary uppercase tracking-widest hidden md:block">Insights &amp; Teardowns</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter border-t border-l border-outline-variant">
{/* Article 1 */}
<Link className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group" href="/">
<span className="font-label-mono text-label-mono text-secondary uppercase mb-stack-sm block">UX Teardown</span>
<h3 className="font-body-lg text-body-lg text-primary mb-stack-lg group-hover:underline underline-offset-4">Why major SaaS platforms fail at complex navigation.</h3>
<div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
<span className="font-label-mono text-label-mono">Read</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</Link>
{/* Article 2 */}
<Link className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group" href="/">
<span className="font-label-mono text-label-mono text-secondary uppercase mb-stack-sm block">Engineering</span>
<h3 className="font-body-lg text-body-lg text-primary mb-stack-lg group-hover:underline underline-offset-4">Implementing AI: A pragmatic framework without the hype.</h3>
<div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
<span className="font-label-mono text-label-mono">Read</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</Link>
{/* Article 3 */}
<Link className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group" href="/">
<span className="font-label-mono text-label-mono text-secondary uppercase mb-stack-sm block">Design Systems</span>
<h3 className="font-body-lg text-body-lg text-primary mb-stack-lg group-hover:underline underline-offset-4">The ROI of rigid constraints in enterprise product design.</h3>
<div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
<span className="font-label-mono text-label-mono">Read</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</Link>
{/* Article 4 */}
<Link className="border-b border-r border-outline-variant p-stack-md block hover:bg-surface-alt transition-colors group bg-surface-container-low" href="/">
<span className="font-label-mono text-label-mono text-secondary uppercase mb-stack-sm block">View All</span>
<h3 className="font-body-lg text-body-lg text-primary mb-stack-lg group-hover:underline underline-offset-4">Explore the complete archive of technical essays.</h3>
<div className="flex justify-between items-center text-secondary group-hover:text-primary transition-colors">
<span className="font-label-mono text-label-mono">Archive</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</div>
</Link>
</div>
</section>
</main>
{/* Footer */}
<footer className="bg-primary dark:bg-surface-container-lowest w-full cursor-pointer">
<div className="grid grid-cols-12 gap-gutter px-grid-margin-mobile md:px-grid-margin py-section-gap max-w-[1440px] mx-auto text-on-primary dark:text-on-surface">
<div className="col-span-12 md:col-span-6 mb-stack-lg md:mb-0">
<div className="font-headline-lg text-headline-lg font-bold text-on-primary dark:text-on-surface mb-stack-sm">FLOXR</div>
<p className="font-body-lg text-body-lg text-left text-on-primary/70 dark:text-on-surface-variant max-w-sm">
                    © 2024 FLOXR. Digital Architecture Firm.
                </p>
</div>
<div className="col-span-12 md:col-span-6 flex flex-col md:flex-row gap-stack-lg md:justify-end">
<div className="flex flex-col gap-4 font-body-lg text-body-lg text-left">
<span className="font-label-mono text-label-mono text-on-primary/50 uppercase">Social</span>
<Link className="text-on-primary/70 dark:text-on-surface-variant hover:opacity-80 transition-opacity" href="/">LinkedIn</Link>
<Link className="text-on-primary/70 dark:text-on-surface-variant hover:opacity-80 transition-opacity" href="/">Instagram</Link>
</div>
<div className="flex flex-col gap-4 font-body-lg text-body-lg text-left">
<span className="font-label-mono text-label-mono text-on-primary/50 uppercase">Legal</span>
<Link className="text-on-primary/70 dark:text-on-surface-variant hover:opacity-80 transition-opacity" href="/contact">Contact</Link>
<Link className="text-on-primary/70 dark:text-on-surface-variant hover:opacity-80 transition-opacity" href="/">Privacy</Link>
</div>
</div>
</div>
</footer>

    </>
  );
}
