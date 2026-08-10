import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { COMPANY_META } from "@/lib/site-content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.floxr.co'),
  title: {
    default: "FLOXR — Software & Digital Infrastructure",
    template: "%s | FLOXR"
  },
  description: COMPANY_META,
  keywords: ["web design", "website development", "web platforms", "dashboards", "AI tools", "Floxr", "solutions company", "Lahore"],
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
    title: "FLOXR — Software & Digital Infrastructure",
    description: COMPANY_META,
    url: "https://www.floxr.co",
    siteName: "FLOXR",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FLOXR — Software & Digital Infrastructure",
    description: COMPANY_META,
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
  "description": COMPANY_META,
  "sameAs": [
    "https://linkedin.com/company/floxr",
    "https://instagram.com/floxr.co"
  ],
  "areaServed": "Worldwide",
  "knowsAbout": [
    "Web Design",
    "Website Development",
    "Web Platforms",
    "Dashboards",
    "AI Tools"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Dark is rendered as the default so the common case matches exactly; the
    // inline script below only rewrites this when a light preference is stored,
    // which is why the attribute is exempted from hydration checks.
    <html lang="en" className="scroll-smooth" data-theme="dark" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@200;300;400;500;600&family=Newsreader:ital,opsz,wght@1,6..72,200..400&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Set the theme before first paint so there is no flash of the wrong ground. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('floxr-theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){document.documentElement.setAttribute('data-theme','dark')}})()`,
          }}
        />
      </head>
      <body className="text-on-background font-body-md antialiased overflow-x-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
