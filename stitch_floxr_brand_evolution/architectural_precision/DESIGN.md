---
name: Architectural Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#d8dae2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fc'
  surface-container: '#ecedf6'
  surface-container-high: '#e6e8f0'
  surface-container-highest: '#e1e2ea'
  on-surface: '#191c22'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2d3037'
  inverse-on-surface: '#eff0f9'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9ff'
  on-background: '#191c22'
  surface-variant: '#e1e2ea'
  accent-red: '#FF3000'
  surface-alt: '#F2F2F2'
  text-muted: '#666666'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
spacing:
  grid-margin: 4rem
  grid-margin-mobile: 1.5rem
  gutter: 1.5rem
  section-gap: 8rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system is rooted in the philosophy of "Digital Architecture." It prioritizes structural integrity and clarity over decorative elements, positioning the product as a high-end, authoritative consulting partner. The aesthetic is inspired by the rigorous minimalism of top-tier product studios, emphasizing intent and precision.

The style is **Minimalism** with a heavy focus on **Corporate Modernism**. It leverages expansive white space, a monochromatic foundation, and a strict typographic hierarchy to evoke a sense of professional mastery and high-end craftsmanship. The emotional response is one of reliability, intellectual rigor, and sophisticated simplicity.

## Colors

The color strategy is almost entirely achromatic to focus the user's attention on content and structural hierarchy. 

- **Primary:** Pure Black (#000000) is used for all primary typography, structural borders, and high-impact UI elements.
- **Secondary/Background:** Off-white (#F9F9F9) serves as the primary canvas, providing a softer, more premium feel than pure white.
- **Neutral:** A deep slate-gray (#1D2026) is reserved for subtle UI components and secondary backgrounds.
- **Accents:** A high-vibrancy Red (#FF3000) is used sparingly—only for critical calls to action or precise status indicators—ensuring it retains its visual impact without cluttering the minimalist aesthetic.

## Typography

The typographic system is the primary "ornament" of the design system. It uses a combination of architectural grotesque and technical monospaced fonts.

- **Headlines:** Hanken Grotesk provides a sharp, geometric presence. Large display sizes should use tight line-height and negative letter-spacing to create a "locked" architectural feel.
- **Body:** Inter is chosen for its neutral, systematic utility, ensuring high legibility for long-form consulting audits and reports.
- **Data & Labels:** JetBrains Mono is utilized for metadata, tags, and small labels to reinforce the "Digital Systems" narrative and technical precision.

## Layout & Spacing

This design system employs a **Fixed Grid** model on desktop (12 columns, 1440px max-width) and a **Fluid Grid** on mobile (4 columns).

- **Margins:** Generous 4rem margins on desktop create a frame that elevates the content.
- **Rhythm:** An 8px base unit drives all spacing. Massive vertical gaps (Section Gaps) are used between major content blocks to enforce clarity and pace.
- **Alignment:** All elements must align strictly to the grid. No "floating" elements or centered text blocks unless for specific display headers. Left-alignment is the default for all content-heavy areas.

## Elevation & Depth

To maintain the minimalist, high-end aesthetic, this design system rejects standard drop shadows. Depth is conveyed through **Tonal Layers** and **Low-contrast Outlines**.

- **Surfaces:** Depth is achieved by placing #FFFFFF (pure white) cards or containers over the #F9F9F9 (off-white) background.
- **Borders:** Instead of shadows, use 1px solid borders in #000000 for high-emphasis elements or #E5E5E5 for subtle container definitions.
- **Interactions:** Subtle background color shifts (e.g., from #F9F9F9 to #F2F2F2) indicate hover states, maintaining a flat but tactile interface.

## Shapes

The shape language is **Sharp**. To reflect the "Architecture" theme, the design system utilizes 0px border radii for all primary components including buttons, input fields, and cards. 

This rejection of rounded corners creates a distinctive, "engineered" look that separates the brand from friendlier, consumer-grade SaaS products. Circular shapes are permitted only for functional icons or specific status pips to provide a point of contrast against the rigid rectangular grid.

## Components

- **Buttons:** Primary buttons are solid #000000 with white typography. Secondary buttons use a 1px #000000 border with no fill. Both have 0px border-radius and use `label-mono` for text.
- **Inputs:** Simple bottom-border only (1px solid #000000) or full rectangular strokes. Focus states use a thicker 2px stroke or a subtle background tint.
- **Cards:** No shadows. Cards are defined by 1px light gray borders or a shift to pure white against the off-white background.
- **Chips/Tags:** Monospaced text inside a light gray #F2F2F2 rectangular box. These should look like technical labels.
- **Lists:** Clean, horizontal rules (1px) separating items. Use ample vertical padding (`stack-lg`) to ensure list items breathe.
- **Data Tables:** High-density, utilizing JetBrains Mono for all numerical data. Borders should be minimal and horizontal-only.