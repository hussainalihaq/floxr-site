'use client';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[var(--border)] pt-20 pb-10 px-6 md:px-12 mt-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Col 1 Brand */}
          <div className="flex flex-col gap-4 items-start">
            <img src="/floxr-logo-dark.svg" alt="Floxr" className="h-[52px] w-auto mb-2" />
            <p className="font-[var(--font-body)] text-[16px] text-[var(--muted)]">Software that moves.</p>
            <a href="mailto:hello@floxr.co" className="font-[var(--font-mono)] text-[12px] text-[var(--muted)] hover:text-[var(--lime)] transition-colors mt-2">hello@floxr.co</a>
          </div>

          {/* Col 2 Services */}
          <div className="flex flex-col gap-4">
            <span className="font-[var(--font-mono)] text-[11px] text-[var(--subtle)] uppercase tracking-widest mb-2">Services</span>
            {['Mobile Apps', 'Web Applications', 'Business Websites', 'AI & Automation', 'Custom Software', 'Integrations & APIs'].map(item => (
              <a key={item} href="#services" className="font-[var(--font-mono)] text-[12px] text-[var(--subtle)] hover:text-[var(--text)] transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>

          {/* Col 3 Company */}
          <div className="flex flex-col gap-4">
            <span className="font-[var(--font-mono)] text-[11px] text-[var(--subtle)] uppercase tracking-widest mb-2">Company</span>
            {['About', 'Work', 'Process', 'Contact', 'Careers'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="font-[var(--font-mono)] text-[12px] text-[var(--subtle)] hover:text-[var(--text)] transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>

          {/* Col 4 Connect */}
          <div className="flex flex-col gap-4">
            <span className="font-[var(--font-mono)] text-[11px] text-[var(--subtle)] uppercase tracking-widest mb-2">Connect</span>
            <div className="flex gap-4">
              {/* Note: In a real app we'd use SVG icons here. Using text placeholders for the spec */}
              <a href="#" className="w-[18px] h-[18px] text-[var(--subtle)] hover:text-[var(--lime)] transition-colors flex items-center justify-center">Li</a>
              <a href="#" className="w-[18px] h-[18px] text-[var(--subtle)] hover:text-[var(--lime)] transition-colors flex items-center justify-center">Ig</a>
              <a href="#" className="w-[18px] h-[18px] text-[var(--subtle)] hover:text-[var(--lime)] transition-colors flex items-center justify-center">Gh</a>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-[var(--font-mono)] text-[11px] text-[var(--subtle)]">
            © {new Date().getFullYear()} Floxr. All rights reserved.
          </p>
          <p className="font-[var(--font-mono)] text-[11px] text-[var(--subtle)]">
            Designed & built in-house.
          </p>
        </div>
      </div>
    </footer>
  );
}
