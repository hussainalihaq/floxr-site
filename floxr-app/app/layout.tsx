import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { COMPANY_META, SERVICES } from "@/lib/site-content";
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
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  // Safari and iOS ignore SVG for the touch icon, so a PNG has to be supplied.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "FLOXR — Software & Digital Infrastructure",
    description: COMPANY_META,
    url: "https://www.floxr.co",
    siteName: "Floxr",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Floxr — we engineer the systems your business runs on",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLOXR — Software & Digital Infrastructure",
    description: COMPANY_META,
    creator: "@floxr_co",
    images: ["/og.png"],
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0B0C" },
  ],
  colorScheme: "light dark",
};

const SITE = "https://www.floxr.co";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#organization`,
      name: "Floxr",
      alternateName: "FLOXR",
      url: SITE,
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE}/og.png`,
      description: COMPANY_META,
      email: "hello@floxr.co",
      foundingDate: "2024",
      sameAs: ["https://linkedin.com/company/floxr", "https://instagram.com/floxr.co"],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "hello@floxr.co",
          availableLanguage: ["English"],
          areaServed: "Worldwide",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Floxr",
      description: COMPANY_META,
      publisher: { "@id": `${SITE}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: "Floxr",
      url: SITE,
      image: `${SITE}/og.png`,
      description: COMPANY_META,
      provider: { "@id": `${SITE}/#organization` },
      areaServed: "Worldwide",
      serviceType: SERVICES.map((service) => service.name),
      knowsAbout: [
        "Software Development",
        "Product Engineering",
        "Internal Systems",
        "Dashboards",
        "AI Integration",
        "Cloud Infrastructure",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Capabilities",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.summary,
          },
        })),
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Light is the default. The inline script below only rewrites this when a
    // dark preference is stored, which is why the attribute is exempted from
    // hydration checks.
    <html lang="en" className="scroll-smooth" data-theme="light" suppressHydrationWarning>
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
            __html: `(function(){try{var t=localStorage.getItem('floxr-theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light')}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`,
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
