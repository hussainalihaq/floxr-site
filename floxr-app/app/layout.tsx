import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.floxr.co'),
  title: {
    default: "FLOXR - Digital Architecture & Product Systems",
    template: "%s | FLOXR"
  },
  description: "Floxr is a premium digital architecture firm. We diagnose technical debt, design modern digital ecosystems, and build scalable product systems that drive business growth.",
  keywords: ["digital architecture", "product design", "software engineering", "UX research", "digital transformation", "Floxr", "tech agency"],
  authors: [{ name: "Floxr" }],
  creator: "Floxr",
  publisher: "Floxr",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "FLOXR - Digital Architecture & Product Systems",
    description: "Floxr is a premium digital architecture firm. We diagnose technical debt, design modern digital ecosystems, and build scalable product systems that drive business growth.",
    url: "https://www.floxr.co",
    siteName: "FLOXR",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLOXR - Digital Architecture & Product Systems",
    description: "Floxr is a premium digital architecture firm. We diagnose technical debt, design modern digital ecosystems, and build scalable product systems that drive business growth.",
    creator: "@floxr_co",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "FLOXR",
  "url": "https://www.floxr.co",
  "logo": "https://www.floxr.co/floxr-logo.svg",
  "description": "Floxr is a premium digital architecture firm. We diagnose technical debt, design modern digital ecosystems, and build scalable product systems that drive business growth.",
  "sameAs": [
    "https://linkedin.com/company/floxr",
    "https://instagram.com/floxr.co"
  ],
  "areaServed": "Worldwide",
  "knowsAbout": [
    "Digital Architecture",
    "Product Design",
    "Software Engineering",
    "UX Research",
    "Digital Transformation"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@600;700&family=Inter:wght@400&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-on-background font-body-md antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
