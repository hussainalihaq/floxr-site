'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      scope: formData.get('scope')
    };

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend-production-19db.up.railway.app';
      const response = await fetch(`${backendUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }
      
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBlur = (name: string, value: string) => {
    if (value) {
      setFilledFields(prev => new Set(prev).add(name));
    } else {
      const next = new Set(filledFields);
      next.delete(name);
      setFilledFields(next);
    }
    setFocusedField(null);
  };

  const isActive = (name: string) => focusedField === name || filledFields.has(name);



  return (
    <>
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-grid-margin-mobile md:px-grid-margin py-section-gap flex flex-col lg:flex-row gap-gutter pt-[180px]">
        
        {/* Left Column: Copy & Info */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-stack-lg">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-mono text-label-mono uppercase tracking-widest text-primary bg-surface-alt border border-outline-variant px-3 py-1 rounded-sm">
              Accepting New Projects
            </span>
          </div>

          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg font-bold text-primary leading-tight tracking-tight mb-stack-lg">
            Let's build<br />the future.
          </h1>

          <p className="font-body-lg text-body-lg text-secondary mb-section-gap max-w-md leading-relaxed border-l border-primary pl-4">
            Whether you need a massive enterprise SaaS, a cutting-edge AI integration, or a breathtaking digital experience, we have the firepower to execute.
          </p>

          <div className="flex flex-col gap-8 mt-auto border-t border-outline-variant pt-stack-lg">
            <div>
              <span className="block font-label-mono text-label-mono text-secondary uppercase tracking-wider mb-2">Email</span>
              <a href="mailto:hello@floxr.co" className="font-label-mono text-[16px] text-primary hover:text-secondary transition-colors relative group w-fit">
                hello@floxr.co
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block font-label-mono text-label-mono text-secondary uppercase tracking-wider mb-2">Location</span>
                <span className="font-label-mono text-[14px] text-primary">Global Remote</span>
              </div>
              <div>
                <span className="block font-label-mono text-label-mono text-secondary uppercase tracking-wider mb-2">Response Time</span>
                <span className="font-label-mono text-[14px] text-primary">&lt; 24 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="flex-1 w-full flex items-start justify-center lg:justify-end">
          <div className="w-full max-w-lg bg-surface-container-lowest p-stack-lg rounded-none border border-outline-variant hover:border-primary transition-colors duration-300 shadow-sm relative group">
            
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mb-6">
                  <CheckCircle size={28} className="text-primary" />
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-primary mb-3">Sent.</h3>
                <p className="font-body-md text-body-md text-secondary leading-relaxed max-w-xs">
                  We've received your brief and will reach out within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                
                {error && (
                  <div className="bg-error-container text-on-error-container p-4 mb-4 text-sm font-label-mono">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div className={`relative px-4 py-3 mb-4 rounded-sm border transition-all duration-300 ${focusedField === 'name' ? 'border-primary bg-surface-alt shadow-sm' : 'border-outline-variant bg-transparent hover:border-primary'}`}>
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none font-label-mono uppercase tracking-wider ${isActive('name') ? 'top-2 text-[10px] text-secondary' : 'top-4 text-[12px] text-secondary'}`}>
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-transparent pt-5 pb-1 font-body-md text-primary outline-none placeholder-transparent"
                    onFocus={() => setFocusedField('name')}
                    onBlur={(e) => handleBlur('name', e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className={`relative px-4 py-3 mb-4 rounded-sm border transition-all duration-300 ${focusedField === 'email' ? 'border-primary bg-surface-alt shadow-sm' : 'border-outline-variant bg-transparent hover:border-primary'}`}>
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none font-label-mono uppercase tracking-wider ${isActive('email') ? 'top-2 text-[10px] text-secondary' : 'top-4 text-[12px] text-secondary'}`}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-transparent pt-5 pb-1 font-body-md text-primary outline-none placeholder-transparent"
                    onFocus={() => setFocusedField('email')}
                    onBlur={(e) => handleBlur('email', e.target.value)}
                  />
                </div>



                {/* Scope */}
                <div className={`relative px-4 py-3 mb-4 rounded-sm border transition-all duration-300 ${focusedField === 'scope' ? 'border-primary bg-surface-alt shadow-sm' : 'border-outline-variant bg-transparent hover:border-primary'}`}>
                  <label className={`absolute left-4 transition-all duration-300 pointer-events-none font-label-mono uppercase tracking-wider ${isActive('scope') ? 'top-2 text-[10px] text-secondary' : 'top-4 text-[12px] text-secondary'}`}>
                    Tell us about your project
                  </label>
                  <textarea 
                    name="scope"
                    required
                    rows={3}
                    className="w-full bg-transparent pt-5 pb-1 font-body-md text-primary outline-none resize-none placeholder-transparent"
                    onFocus={() => setFocusedField('scope')}
                    onBlur={(e) => handleBlur('scope', e.target.value)}
                  />
                </div>

                {/* Submit */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-3 bg-primary text-on-primary font-label-mono text-label-mono uppercase px-8 py-4 hover:bg-surface-tint transition-colors duration-300 mt-8 disabled:bg-outline disabled:text-outline-variant"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>

                <p className="font-label-mono text-[10px] text-secondary text-center mt-4 uppercase">
                  Your information is encrypted.
                </p>

              </form>
            )}
          </div>
        </div>

      </main>

      <footer className="bg-primary dark:bg-surface-container-lowest w-full cursor-pointer mt-section-gap">
        <div className="grid grid-cols-12 gap-gutter px-grid-margin-mobile md:px-grid-margin py-section-gap max-w-[1440px] mx-auto text-on-primary dark:text-on-surface">
          <div className="col-span-12 md:col-span-6 mb-stack-lg md:mb-0">
            <img src="/floxr-logo.svg" alt="FLOXR" className="h-10 md:h-12 w-auto object-contain object-left mb-stack-sm brightness-0 invert" />
            <p className="font-body-lg text-body-lg text-left text-on-primary/70 dark:text-on-surface-variant max-w-sm">
                © 2024 FLOXR. Digital Architecture Firm.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col md:flex-row gap-stack-lg md:justify-end">
            <div className="flex flex-col gap-4 font-body-lg text-body-lg text-left">
              <span className="font-label-mono text-label-mono text-on-primary/50 uppercase">Social</span>
              <a className="text-on-primary/70 dark:text-on-surface-variant hover:opacity-80 transition-opacity" href="#">LinkedIn</a>
              <a className="text-on-primary/70 dark:text-on-surface-variant hover:opacity-80 transition-opacity" href="#">Instagram</a>
            </div>
            <div className="flex flex-col gap-4 font-body-lg text-body-lg text-left">
              <span className="font-label-mono text-label-mono text-on-primary/50 uppercase">Legal</span>
              <Link className="text-on-primary/70 dark:text-on-surface-variant hover:opacity-80 transition-opacity" href="/contact">Contact</Link>
              <a className="text-on-primary/70 dark:text-on-surface-variant hover:opacity-80 transition-opacity" href="#">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
