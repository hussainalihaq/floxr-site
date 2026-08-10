import type { Metadata } from 'next';

// The Lab index is a client component (filtering), so its metadata lives here.
// Individual entries override this through their own generateMetadata.
// The template has to be restated here: a layout that sets `title` as a plain
// string replaces the inherited template for its whole subtree, which would
// strip the brand suffix from every article title.
export const metadata: Metadata = {
  title: {
    default: 'The Lab',
    template: '%s | FLOXR',
  },
  description:
    'Writing on software architecture, design systems, and engineering practice from Floxr.',
  alternates: { canonical: '/lab' },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
