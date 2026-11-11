'use client';

import { useEffect, useRef, useState } from 'react';

const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Tweens from the last rendered value to `value` whenever it changes.
 * With `startOnView`, the first tween waits until the number scrolls in.
 */
export default function AnimatedNumber({
  value,
  duration = 900,
  format = (n: number) => Math.round(n).toLocaleString('en-US'),
  startOnView = false,
  className = '',
}: {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  startOnView?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(startOnView ? 0 : value);
  const [display, setDisplay] = useState(shown.current);
  const [armed, setArmed] = useState(!startOnView);

  useEffect(() => {
    if (armed) return;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setArmed(true), io.disconnect()),
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [armed]);

  useEffect(() => {
    if (!armed) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const from = shown.current;
    if (calm || from === value) {
      shown.current = value;
      setDisplay(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const v = from + (value - from) * ease(t);
      shown.current = v;
      setDisplay(v);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, armed, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(display)}
    </span>
  );
}
