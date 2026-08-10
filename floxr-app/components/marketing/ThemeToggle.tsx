'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

/**
 * Theme switch for the marketing site. Dark is the design default; a saved
 * preference always wins. The initial attribute is written by an inline script
 * in the document head (see layout.tsx) so there is no flash before hydration —
 * this component only reads that state and toggles it.
 */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme) || 'dark';
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('floxr-theme', next);
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for the session.
    }
  };

  // Reserve the space before mount so the nav does not shift.
  if (!mounted) return <span className={`inline-block w-9 h-9 ${className}`} aria-hidden="true" />;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors duration-300 ${className}`}
      style={{ borderColor: 'var(--line-1)', color: 'var(--text-2)' }}
    >
      {theme === 'dark' ? <Sun size={15} strokeWidth={1.6} /> : <Moon size={15} strokeWidth={1.6} />}
    </button>
  );
}
