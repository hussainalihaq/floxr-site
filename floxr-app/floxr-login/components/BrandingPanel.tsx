import React from 'react';

const BrandingPanel: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col relative w-full md:w-5/12 lg:w-1/2 bg-charcoal-dark p-12 justify-between overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2832&auto=format&fit=crop')" }}
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/90 via-charcoal-dark/50 to-charcoal-dark/90"></div>
      </div>

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white">
          <span className="material-symbols-outlined text-2xl">layers</span>
        </div>
        <span className="text-2xl font-bold tracking-tight text-white">Floxr</span>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col gap-8 mb-12">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight">
            Empower your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">HR operations.</span>
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-md leading-relaxed">
            Automate employee onboarding, attendance, and payroll workflows with intelligent precision.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="glass-panel p-5 rounded-xl max-w-md mt-6 transform transition hover:scale-[1.02] duration-300">
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-full bg-gray-700 bg-center bg-cover border-2 border-primary/30 shrink-0"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCQFy23eSAiX4tk47VKMT8gZQjSXJ6BEvJG_0I6DU960qysirUFbpDhprMSezxPCK8hsgh-m3YQUAJ_0MNPbPyQC2N_VTDspf03shoW26C13Cas7aGzx8VBZGlne4gSOptOd_TrNhwcJ4DDyckUM5Hl4o2-YFA4buJ1ObllgNXZjA8wsXN82yYWUcRAVx96RG_dTTkGv5KMZ2GTLkqy73l9Zv271PDVviPZ-bsijWvxOcwGa6F1jwPSAQjQpEj-ij0Vw4W4gMlXnWQ')" }}
              role="img"
              aria-label="Portrait of Hussain Haq"
            >
            </div>
            <div>
              <div className="flex text-primary mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-[16px] leading-none">star</span>
                ))}
              </div>
              <p className="text-sm text-gray-300 italic mb-2">"Floxr completely transformed how we handle payroll. It's simply seamless."</p>
              <p className="text-sm font-semibold text-white">Hussain Haq</p>
              <p className="text-xs text-gray-500">VP of People, TechFlow</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex justify-between text-xs text-gray-600">
        <p>© 2023 Floxr Inc.</p>
        <div className="flex gap-4">
          <a className="hover:text-gray-400" href="#">Privacy</a>
          <a className="hover:text-gray-400" href="#">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default BrandingPanel;