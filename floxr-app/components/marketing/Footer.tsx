'use client';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#222] pt-20 pb-10 px-6 md:px-12 mt-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Col 1 Brand */}
          <div className="flex flex-col gap-4 items-start">
            <img src="/floxr-logo-dark.svg" alt="Floxr" className="h-[52px] w-auto mb-2" />
            <p className="font-[var(--font-body)] text-[16px] text-[#888]">Software that moves.</p>
            <a href="mailto:hello@floxr.co" className="font-[var(--font-mono)] text-[12px] text-[#888] hover:text-white transition-colors mt-2">hello@floxr.co</a>
          </div>

          {/* Col 2 Services */}
          <div className="flex flex-col gap-4">
            <span className="font-[var(--font-mono)] text-[11px] text-[#555] uppercase tracking-widest mb-2">Services</span>
            {['Mobile Apps', 'Web Applications', 'Business Websites', 'AI & Automation', 'Custom Software', 'Integrations & APIs'].map(item => (
              <a key={item} href="/#services" className="font-[var(--font-mono)] text-[12px] text-[#555] hover:text-white transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>

          {/* Col 3 Company */}
          <div className="flex flex-col gap-4">
            <span className="font-[var(--font-mono)] text-[11px] text-[#555] uppercase tracking-widest mb-2">Company</span>
            {[
              { name: 'About', href: '/about' },
              { name: 'Work', href: '/work' },
              { name: 'Careers', href: '/careers' },
              { name: 'Contact', href: '/contact' },
            ].map(item => (
              <a key={item.name} href={item.href} className="font-[var(--font-mono)] text-[12px] text-[#555] hover:text-white transition-colors duration-200">
                {item.name}
              </a>
            ))}
          </div>

          {/* Col 4 Connect */}
          <div className="flex flex-col gap-4">
            <span className="font-[var(--font-mono)] text-[11px] text-[#555] uppercase tracking-widest mb-2">Connect</span>
            <div className="flex gap-4">
              <a href="#" className="font-[var(--font-mono)] text-[12px] text-[#555] hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="font-[var(--font-mono)] text-[12px] text-[#555] hover:text-white transition-colors">Instagram</a>
              <a href="#" className="font-[var(--font-mono)] text-[12px] text-[#555] hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-[#222] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-[var(--font-mono)] text-[11px] text-[#555]">
            © {new Date().getFullYear()} Floxr. All rights reserved.
          </p>
          <p className="font-[var(--font-mono)] text-[11px] text-[#555]">
            Designed & built in-house.
          </p>
        </div>
      </div>
    </footer>
  );
}
