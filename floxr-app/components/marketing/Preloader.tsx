'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Set initial states
    gsap.set(".preloader-text", { scale: 4 });
    gsap.set(".marketing-page-content", { opacity: 0 }); // We'll add this class to main content wrapper

    tl.to(".preloader-text", { 
      scale: 1, 
      duration: 0.8, 
      ease: "power3.out" 
    })
    .to(".preloader-text", { 
      opacity: 0, 
      duration: 0.2 
    }, "+=0.2")
    .to(".preloader-top", { 
      y: "-100%", 
      duration: 0.4, 
      ease: "power2.inOut" 
    }, "-=0.2")
    .to(".preloader-bottom", { 
      y: "100%", 
      duration: 0.4, 
      ease: "power2.inOut" 
    }, "<")
    .to(".marketing-page-content", { 
      opacity: 1, 
      duration: 0.4, 
      ease: "power1.inOut" 
    }, "<0.2")
    .set(".preloader-wrapper", { 
      display: "none" 
    });

  }, []);

  return (
    <div className="preloader-wrapper fixed inset-0 z-[10000] pointer-events-none flex flex-col">
      <div className="preloader-top w-full h-[50vh] bg-[var(--bg)] absolute top-0 left-0 will-change-transform" />
      <div className="preloader-bottom w-full h-[50vh] bg-[var(--bg)] absolute bottom-0 left-0 will-change-transform" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="preloader-text will-change-transform">
          <img src="/floxr-logo-dark.svg" alt="Floxr" className="w-[220px] md:w-[280px] drop-shadow-2xl" />
        </div>
      </div>
    </div>
  );
}
