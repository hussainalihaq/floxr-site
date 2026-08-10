import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/marketing/CustomCursor';
import SiteFooter from '@/components/marketing/SiteFooter';

export default function PrivacyPage() {
  return (
    <div className="mkt min-h-screen flex flex-col">
      <CustomCursor />
      <Navbar />

      <main className="flex-grow pt-[76px] md:pt-[88px]">
        <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-24 w-full">
          <p className="eyebrow text-[var(--signal)] mb-6">Legal</p>
          <h1 className="display-xl mb-14">
            Privacy <span className="font-serif-it font-normal">policy</span>.
          </h1>

          <div className="max-w-3xl space-y-8 text-[16px] md:text-[17px] leading-relaxed" style={{ color: 'var(--text-2)' }}>
            <p>
              At FLOXR, we take your privacy seriously. This document outlines how we collect, use,
              and protect your information when you use our website and services.
            </p>

            <h2 className="text-[24px] font-light tracking-[-0.03em] pt-6 text-[var(--text-1)]">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, such as when you fill out a
              contact form or request an audit. This may include your name, email address, company
              name, and project details.
            </p>

            <h2 className="text-[24px] font-light tracking-[-0.03em] pt-6 text-[var(--text-1)]">How We Use Information</h2>
            <p>
              The information we collect is used solely to provide and improve our services,
              communicate with you regarding your inquiries, and fulfill our contractual
              obligations. We do not sell your personal data to third parties.
            </p>

            <h2 className="text-[24px] font-light tracking-[-0.03em] pt-6 text-[var(--text-1)]">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a
                href="mailto:hello@floxr.co"
                className="text-[var(--text-1)] border-b border-[var(--line-2)] hover:text-[var(--signal)] hover:border-[var(--signal)] transition-colors"
              >
                hello@floxr.co
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
