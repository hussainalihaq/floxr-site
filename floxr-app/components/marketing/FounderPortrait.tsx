'use client';

import { useState, useEffect } from 'react';

// Shows /founder.jpg when it exists in /public; renders a monogram until then.
// Probes on mount (rather than <img onError>) so a missing file never flashes broken.
export default function FounderPortrait() {
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasPhoto(true);
    img.src = '/founder.jpg';
  }, []);

  if (hasPhoto) {
    return (
      <img
        src="/founder.jpg"
        alt="Hussain Ali Haq, founder of Floxr"
        className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover flex-shrink-0"
      />
    );
  }

  return (
    <div
      className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center flex-shrink-0 border"
      style={{ backgroundColor: 'var(--color-ink-2)', borderColor: 'var(--color-line-dark)' }}
      aria-label="Hussain Ali Haq"
    >
      <span className="text-[var(--color-paper)] font-bold text-[40px] md:text-[48px] tracking-tight">
        H
      </span>
    </div>
  );
}
