'use client';

import { useEffect, useRef, useState } from 'react';
import { GO_LIVE } from '@/lib/site-content';

/**
 * The two weeks from yes to live. A rail draws in with scroll progress and
 * each step lights up as the rail reaches it.
 */
export default function GoLiveTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const id = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(id);
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starts when the list's top reaches 80% of the viewport and completes
      // when its bottom reaches 60%.
      const p = (vh * 0.8 - r.top) / (r.height + vh * 0.2);
      setProgress(Math.min(Math.max(p, 0), 1));
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

  return (
    <ol ref={ref} className="golive" style={{ '--p': progress } as React.CSSProperties}>
      <span className="golive-rail" aria-hidden="true">
        <span className="golive-fill" />
      </span>
      {GO_LIVE.map((step, i) => {
        const on = progress >= (i + 0.15) / GO_LIVE.length;
        return (
          <li key={step.title} className={`golive-step ${on ? 'is-on' : ''}`}>
            <span className="golive-node" aria-hidden="true" />
            <p className="eyebrow mb-3">{step.day}</p>
            <h3 className="text-[20px] font-normal tracking-[-0.025em] mb-2.5">{step.title}</h3>
            <p className="body !text-[14px]">{step.note}</p>
          </li>
        );
      })}
    </ol>
  );
}
