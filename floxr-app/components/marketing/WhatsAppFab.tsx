'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { CHAT_MESSAGE, whatsappLink } from '@/lib/site-content';

/** Floating WhatsApp button. Slides in once the visitor scrolls past the hero. */
export default function WhatsAppFab() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(CHAT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className={`wa-fab ${shown ? 'is-shown' : ''}`}
      aria-label="Chat with Floxr on WhatsApp"
      tabIndex={shown ? 0 : -1}
    >
      <span className="wa-ping" aria-hidden="true" />
      <MessageCircle size={22} strokeWidth={1.8} aria-hidden="true" />
      <span className="wa-label">Chat on WhatsApp</span>
    </a>
  );
}
