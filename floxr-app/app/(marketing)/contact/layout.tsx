import type { Metadata } from 'next';

// The contact page itself is a client component (stateful form), so its
// metadata is declared here.
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what you need built. We reply within 24 hours with scope, timeline, and a fixed price.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
