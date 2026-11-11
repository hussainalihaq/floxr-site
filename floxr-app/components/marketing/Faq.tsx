'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ } from '@/lib/site-content';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col">
      {FAQ.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`faq-item border-t hairline ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="text-[17px] md:text-[19px] font-normal tracking-[-0.02em]">{item.q}</span>
              <Plus size={18} strokeWidth={1.5} className="faq-icon flex-shrink-0" aria-hidden="true" />
            </button>
            <div id={`faq-${i}`} className="faq-body" role="region">
              <div className="overflow-hidden">
                <p className="body max-w-2xl pb-7">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
