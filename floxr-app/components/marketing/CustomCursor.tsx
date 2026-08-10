'use client';

import { useEffect, useRef } from 'react';

/**
 * Two-part cursor: a dot pinned to the pointer, and a ring that trails it with
 * easing and expands over interactive elements. Uses difference blending so it
 * stays legible over both the void and raised planes.
 *
 * Never rendered on touch/coarse pointers (CSS) and disabled when the user
 * prefers reduced motion (the ring easing is the whole point of it).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || calm.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;
    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      show();

      const target = event.target as Element | null;
      const interactive = target?.closest('a, button, input, textarea, select, [role="button"]');
      ring.classList.toggle('is-active', Boolean(interactive));
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Ring trails the pointer with a fixed-rate ease for a weighted feel.
    const tick = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}
