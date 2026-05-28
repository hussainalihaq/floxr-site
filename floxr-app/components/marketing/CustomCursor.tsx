'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default true to avoid flash on mobile
  
  useEffect(() => {
    // Check if device supports hover
    const matchMedia = window.matchMedia('(pointer: fine)');
    setIsTouchDevice(!matchMedia.matches);
    
    if (!matchMedia.matches) return;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Immediate update for dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine what we're hovering over
      const isLink = target.closest('a') !== null || target.closest('button') !== null;
      const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span') !== null && !isLink;
      
      if (dotRef.current && ringRef.current) {
        const ringLabel = ringRef.current.querySelector('span');

        if (isLink) {
          dotRef.current.style.opacity = '0';
          dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(0)`;
          
          ringRef.current.style.width = '56px';
          ringRef.current.style.height = '56px';
          ringRef.current.style.backgroundColor = 'transparent';
          ringRef.current.style.borderColor = 'var(--lime)';
          
          if (ringLabel) ringLabel.style.opacity = '1';
        } else {
          dotRef.current.style.opacity = '1';
          dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(1)`;
          
          if (ringLabel) ringLabel.style.opacity = '0';
          
          if (isText) {
            ringRef.current.style.width = '20px';
            ringRef.current.style.height = '20px';
            ringRef.current.style.backgroundColor = 'transparent';
            ringRef.current.style.borderColor = 'rgba(184,255,87,0.3)';
          } else {
            ringRef.current.style.width = '32px';
            ringRef.current.style.height = '32px';
            ringRef.current.style.backgroundColor = 'transparent';
            ringRef.current.style.borderColor = 'rgba(184,255,87,0.3)';
          }
        }
      }
    };
    
    let animationFrameId: number;
    const render = () => {
      // Lerp for ring
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--lime)] pointer-events-none z-[9999] transition-opacity duration-150 will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-[32px] h-[32px] border-[0.5px] border-[rgba(184,255,87,0.3)] bg-transparent rounded-full flex items-center justify-center pointer-events-none z-[9998] transition-all duration-300 ease-out will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <span 
          className="font-[var(--font-mono)] text-[9px] text-[var(--lime)] transition-opacity duration-200 opacity-0"
        >
          VIEW
        </span>
      </div>
    </>
  );
}
