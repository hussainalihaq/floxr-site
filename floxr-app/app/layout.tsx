import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLOXR - Digital Architecture & Product Systems",
  description: "We diagnose what is broken, design what should exist, and build what moves businesses forward.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "FLOXR - Digital Architecture & Product Systems",
    description: "We diagnose what is broken, design what should exist, and build what moves businesses forward.",
    type: "website",
    siteName: "FLOXR",
  }
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
      </head>
      <body className="bg-background text-on-background font-body-md antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
