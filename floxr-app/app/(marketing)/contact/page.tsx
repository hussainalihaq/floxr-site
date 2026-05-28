'use client';

import { useState } from 'react';
import Navigation from '@/components/marketing/Navigation';
import Footer from '@/components/marketing/Footer';
import CustomCursor from '@/components/marketing/CustomCursor';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [filledFields, setFilledFields] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
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

  const BUDGETS = [
    { value: "1k-5k", label: "$1K – $5K" },
    { value: "5k-10k", label: "$5K – $10K" },
    { value: "10k-25k", label: "$10K – $25K" },
    { value: "25k-50k", label: "$25K – $50K" },
    { value: "50k-100k", label: "$50K – $100K" },
    { value: "100k+", label: "$100K+" },
  ];

  return (
    <main className="min-h-screen bg-[#030303] flex flex-col relative selection:bg-[var(--lime)] selection:text-black">
      <CustomCursor />
      <Navigation />

      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-[160px] md:pt-[180px] pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 z-10">
        
        {/* Left Column: Copy & Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#b8ff57] animate-pulse" />
            <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-widest text-[#fff] bg-[#111] border border-[#333] px-3 py-1 rounded-sm">
              Accepting New Projects
            </span>
          </div>

          <h1 className="font-[var(--font-display)] text-[clamp(34px,8vw,100px)] font-extrabold text-white leading-[0.9] tracking-tight mb-8">
            Let&apos;s build<br />the future.
          </h1>

          <p className="font-[var(--font-body)] text-[18px] md:text-[22px] text-[#888] mb-16 max-w-md leading-relaxed">
            Whether you need a massive enterprise SaaS, a cutting-edge AI integration, or a breathtaking digital experience, we have the firepower to execute.
          </p>

          <div className="flex flex-col gap-8 mt-auto">
            <div>
              <span className="block font-[var(--font-mono)] text-[10px] text-[#555] uppercase tracking-wider mb-2">Email</span>
              <a href="mailto:hello@floxr.co" className="font-[var(--font-mono)] text-[16px] text-white hover:text-[#b8ff57] transition-colors relative group w-fit">
                hello@floxr.co
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="block font-[var(--font-mono)] text-[10px] text-[#555] uppercase tracking-wider mb-2">Location</span>
                <span className="font-[var(--font-mono)] text-[14px] text-white">Global Remote</span>
              </div>
              <div>
                <span className="block font-[var(--font-mono)] text-[10px] text-[#555] uppercase tracking-wider mb-2">Response Time</span>
                <span className="font-[var(--font-mono)] text-[14px] text-white">&lt; 24 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="w-full flex items-start justify-center">
          <div className="w-full relative">
            
            {/* Animated rotating border glow */}
            <div className="absolute -inset-[1px] rounded-[29px] bg-[conic-gradient(from_var(--angle),#111_0%,#333_25%,#111_50%,#555_75%,#111_100%)] animate-[spin_8s_linear_infinite] opacity-60 blur-[1px] pointer-events-none z-0"
              style={{ '--angle': '0deg' } as any} 
            />
            
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-white blur-[200px] opacity-[0.025] pointer-events-none rounded-full z-0" />
            
            <div className="w-full bg-[#080808] p-8 md:p-10 rounded-[28px] relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-[#222]">
              
              {/* Form step progress */}
              {!isSuccess && (
                <div className="flex items-center gap-2 mb-8">
                  {['Details', 'Budget', 'Scope'].map((step, si) => (
                    <div key={step} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full text-[9px] font-[var(--font-mono)] font-bold flex items-center justify-center transition-all duration-300 ${
                        si === 0 && (filledFields.has('name') || filledFields.has('email')) ? 'bg-white text-black' :
                        si === 1 && selectedBudget ? 'bg-white text-black' :
                        si === 2 && filledFields.has('scope') ? 'bg-white text-black' :
                        'bg-[#111] text-[#555] border border-[#333]'
                      }`}>
                        {si + 1}
                      </div>
                      <span className="font-[var(--font-mono)] text-[9px] text-[#555] uppercase tracking-wider hidden md:block">{step}</span>
                      {si < 2 && <div className="w-8 h-[1px] bg-[#222]" />}
                    </div>
                  ))}
                </div>
              )}
              
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-20 animate-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6">
                    <CheckCircle size={28} className="text-black" />
                  </div>
                  <h3 className="font-[var(--font-display)] text-[36px] font-bold text-white mb-3">Sent.</h3>
                  <p className="font-[var(--font-mono)] text-[13px] text-[#888] leading-relaxed max-w-xs">
                    We&apos;ve received your brief and will reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                  
                  {/* Name */}
                  <div className={`relative py-5 border-b transition-colors duration-300 ${focusedField === 'name' ? 'border-white' : 'border-[#222]'}`}>
                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-[var(--font-mono)] uppercase tracking-wider ${isActive('name') ? 'top-1 text-[9px] text-white' : 'top-5 text-[12px] text-[#555]'}`}>
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-transparent pt-4 font-[var(--font-body)] text-[16px] text-white outline-none placeholder-transparent"
                      onFocus={() => setFocusedField('name')}
                      onBlur={(e) => handleBlur('name', e.target.value)}
                    />
                  </div>

                  {/* Email */}
                  <div className={`relative py-5 border-b transition-colors duration-300 ${focusedField === 'email' ? 'border-white' : 'border-[#222]'}`}>
                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-[var(--font-mono)] uppercase tracking-wider ${isActive('email') ? 'top-1 text-[9px] text-white' : 'top-5 text-[12px] text-[#555]'}`}>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-transparent pt-4 font-[var(--font-body)] text-[16px] text-white outline-none"
                      onFocus={() => setFocusedField('email')}
                      onBlur={(e) => handleBlur('email', e.target.value)}
                    />
                  </div>

                  {/* Budget — Interactive Chips */}
                  <div className="py-6 border-b border-[#222]">
                    <label className="block font-[var(--font-mono)] text-[9px] text-[#888] uppercase tracking-wider mb-4">
                      Project Budget
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          key={b.value}
                          type="button"
                          onClick={() => setSelectedBudget(b.value)}
                          className={`font-[var(--font-mono)] text-[11px] px-4 py-2.5 rounded-full border transition-all duration-200 
                            ${selectedBudget === b.value 
                              ? 'bg-white text-black border-white font-bold scale-[1.05]' 
                              : 'bg-transparent text-[#888] border-[#333] hover:border-[#666] hover:text-white'}`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scope */}
                  <div className={`relative py-5 border-b transition-colors duration-300 ${focusedField === 'scope' ? 'border-white' : 'border-[#222]'}`}>
                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-[var(--font-mono)] uppercase tracking-wider ${isActive('scope') ? 'top-1 text-[9px] text-white' : 'top-5 text-[12px] text-[#555]'}`}>
                      Tell us about your project
                    </label>
                    <textarea 
                      required
                      rows={3}
                      className="w-full bg-transparent pt-4 font-[var(--font-body)] text-[16px] text-white outline-none resize-none"
                      onFocus={() => setFocusedField('scope')}
                      onBlur={(e) => handleBlur('scope', e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group w-full h-[56px] flex items-center justify-center gap-3 bg-white disabled:bg-[#333] disabled:text-[#666] text-black font-bold font-[var(--font-mono)] tracking-wider text-[12px] uppercase rounded-full mt-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]"
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

                  {/* Privacy note */}
                  <p className="font-[var(--font-mono)] text-[9px] text-[#444] text-center mt-4">
                    Your information is encrypted and never shared with third parties.
                  </p>

                </form>
              )}
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
