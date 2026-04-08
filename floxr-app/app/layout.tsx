import type { Metadata } from "next";
import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-instrument",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Floxr | Software That Ships.",
  description: "Floxr is entering a market full of agencies using the same blue-gradient, card-grid. We build software that ships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-[var(--bg)] text-[var(--text)]">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        {/* We expect PP Neue Machina to be handled via CSS @font-face or Fontshare in globals.css */}
      </head>
      <body className={`${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
