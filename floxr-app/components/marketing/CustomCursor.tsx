'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
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
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) ${isHoveringLink ? 'scale(0)' : 'scale(1)'}`;
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine what we're hovering over
      const isLink = target.closest('a') !== null || target.closest('button') !== null;
      const isText = target.closest('p, h1, h2, h3, h4, h5, h6, span') !== null && !isLink;
      
      setIsHoveringLink(isLink);
      setIsHoveringText(isText && !isLink);
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
  }, [isHoveringLink]); // Important to re-run effect if link state changes to update the inline style correctly, or we can just apply classes.

  if (isTouchDevice) return null;

  return (
    <>
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--lime)] pointer-events-none z-[9999] transition-transform duration-150 will-change-transform
        ${isHoveringLink ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none z-[9998] will-change-transform
          transition-all duration-300 ease-out
          ${isHoveringLink ? 'w-[56px] h-[56px] border-[0.5px] border-[var(--lime)] bg-transparent' : 
            isHoveringText ? 'w-[20px] h-[20px] border-[0.5px] border-[rgba(184,255,87,0.3)]' : 
            'w-[32px] h-[32px] border-[0.5px] border-[rgba(184,255,87,0.3)]'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <span 
          className={`font-[var(--font-mono)] text-[9px] text-[var(--lime)] transition-opacity duration-200 
            ${isHoveringLink ? 'opacity-100' : 'opacity-0'}`}
        >
          VIEW
        </span>
      </div>
    </>
  );
}
