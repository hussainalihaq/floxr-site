import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-primary antialiased flex flex-col">
      <Navbar />

      <main className="flex-grow pt-[57px]">
        {/* Header */}
        <section className="max-w-[1120px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <p className="font-label-mono text-label-mono uppercase tracking-widest text-[11px] text-secondary mb-6">
            Legal
          </p>
          <h1 className="text-[clamp(48px,8vw,96px)] font-semibold tracking-tighter leading-[0.95] text-primary mb-12">
            Privacy Policy
          </h1>
          
          <div className="max-w-3xl space-y-8 text-[17px] leading-relaxed text-secondary">
            <p>
              At FLOXR, we take your privacy seriously. This document outlines how we collect, use, and protect your information when you use our website and services.
            </p>
            
            <h2 className="text-[24px] font-semibold text-primary pt-6">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you fill out a contact form or request an audit. This may include your name, email address, company name, and project details.
            </p>
            
            <h2 className="text-[24px] font-semibold text-primary pt-6">How We Use Information</h2>
            <p>
              The information we collect is used solely to provide and improve our services, communicate with you regarding your inquiries, and fulfill our contractual obligations. We do not sell your personal data to third parties.
            </p>

            <h2 className="text-[24px] font-semibold text-primary pt-6">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@floxr.co" className="text-primary hover:opacity-70 transition-opacity">hello@floxr.co</a>.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1d1d1f] w-full">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            <div>
              <img src="/floxr-logo.svg" alt="FLOXR" className="h-7 brightness-0 invert mb-4" />
              <div className="text-[14px] text-[#86868b] mb-1">hello@floxr.co</div>
              <div className="text-[14px] text-[#86868b]">© 2026 FLOXR · Built in house</div>
            </div>
            <div className="flex md:justify-end">
              <ul className="flex flex-col md:flex-row gap-4 md:gap-10">
                <li><Link href="/about" className="text-[14px] text-[#86868b] hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-[14px] text-[#86868b] hover:text-white transition-colors">Contact</Link></li>
                <li><a href="https://linkedin.com/company/floxr" className="text-[14px] text-[#86868b] hover:text-white transition-colors">LinkedIn</a></li>
                <li><Link href="/privacy" className="text-[14px] text-[#86868b] hover:text-white transition-colors">Privacy</Link></li>
                <li><a href="https://instagram.com/floxr.co" className="text-[14px] text-[#86868b] hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
