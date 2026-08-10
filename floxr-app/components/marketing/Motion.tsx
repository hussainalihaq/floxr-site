'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Word-level text reveal ──────────────────────────────────────
   Splits on spaces and lifts each word from behind a clip. Falls back
   to plain visible text when IntersectionObserver is unavailable.      */
export function TextReveal({
  text,
  className = '',
  delay = 0,
  as: Tag = 'span',
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'span' | 'h1' | 'h2' | 'p';
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return setInView(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setInView(true), io.disconnect()),
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const words = text.split(' ');

  return (
    <Tag ref={ref as never} className={`${inView ? 'tr-in' : ''} ${className}`}>
      {words.map((word, i) => (
        <span className="tr-word" key={`${word}-${i}`}>
          <span style={{ transitionDelay: `${delay + i * 42}ms` }}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ── Infinite marquee ────────────────────────────────────────────
   Renders the track twice so the loop is seamless; pauses on hover.    */
export function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const track = (
    <div className="marquee-track" aria-hidden="true">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-3.5 whitespace-nowrap">
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--signal)' }} />
          <span className="text-[15px] font-light" style={{ color: 'var(--text-2)' }}>{item}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee marquee-mask ${className}`}>
      {track}
      {track}
      <span className="sr-only">{items.join(', ')}</span>
    </div>
  );
}

/* ── Scroll progress rail ────────────────────────────────────── */
export function ScrollRail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const el = ref.current;
      if (el) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;
      }
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={ref} className="scroll-rail" style={{ transform: 'scaleX(0)' }} aria-hidden="true" />;
}

/* ── Spotlight surface ───────────────────────────────────────────
   Writes pointer position into CSS vars; the glow itself is pure CSS.  */
export function Spotlight({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={`spot ${className}`}>
      {children}
    </div>
  );
}
