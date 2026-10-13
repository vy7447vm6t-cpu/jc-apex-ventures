# Project: JC Apex Ventures Digital Platform Transformation

## Architecture
- **Framework & Runtime**: Next.js 16.2.6 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS v4 (@tailwindcss/postcss).
- **Design Philosophy**: Deep architectural dark aesthetic inspired by Tellet.ai, Framer, and iOS liquid glass (`#0A0D10` slate/graphite canvas, `#11151A` elevated panels, `rgba(194, 159, 83, 0.3)` champagne gold specular borders, `backdrop-filter: blur(24px) saturate(190%)`).
- **Typography**: Native Google Fonts loaded via `next/font/google` in `src/app/layout.tsx`: `Instrument_Sans` for headlines, pills, buttons, and metrics with `-0.02em` tracking; `Newsreader` serif for narrative editorial body text with optical sizing.
- **Brand System**: Master JC Apex umbrella emblem with gold apex dot and J-stem; authentic CMYK ink flourish emblem for eMudran; authentic gold roof-window emblem for TVASTA; bespoke vector architectural emblems for GRID APEX, SOLIS, SANYOG, and AGRIM.
- **Navigation & Shell**: Centered floating island liquid glass capsule navbar; upgraded Clippy assistant dock; architectural image lightbox modal; subtle footer copyright containing formal CIN disclosure.
- **Interactive Calculators**:
  - Solis: Rooftop solar sizing, pergola, BIPV, EV, and PM Surya Ghar subsidy engine.
  - eMudran: Interactive print and packaging rate estimator.
  - TVASTA: 3-tier space planning estimator (Standard, Premium, Luxury).
- **Communication & Routing**: Dual-dispatch form architecture (background `/api/contact` Nodemailer + foreground `mailto:`) routing to division emails (`admin@jcapexv.com`, `printmgmt@jcapexv.com`, `licenses@jcapexv.com`, `Consumercmpl@jcapexv.com`, `spacemgmt@jcapexv.com`, `solis@jcapexv.com`) plus 1-tap WhatsApp consultation.
- **Build Target**: Clean production compilation with `npx next build --webpack` across all 15 routes with exit code 0.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Deep Architectural Dark Palette | Global canvas `#0A0D10` / `#11151A`, warm ambient glows, high-contrast pure white display and ivory body text | M1 | ORIGINAL_REQUEST § R1 |
| 2 | iOS Liquid Glass Material System | `backdrop-filter: blur(24px) saturate(190%)`, multi-layer specular highlights, gold borders `rgba(194, 159, 83, 0.3)` | M1 | ORIGINAL_REQUEST § R1 |
| 3 | Native Next.js Font Architecture | `next/font/google` in `layout.tsx` for Instrument Sans and Newsreader, 0 FOUT, 0 layout shift | M1 | ORIGINAL_REQUEST § R3 |
| 4 | Typographic Hierarchy & Tracking | Instrument Sans H1-H6, CTAs, metrics with `-0.02em` tracking; Newsreader narrative copy with optical sizing | M1 | ORIGINAL_REQUEST § R3 |
| 5 | De-emphasize Bureaucratic Disclosures | Remove CIN badge from Hero; lead Hero with consortium category badge; relegate CIN strictly to footer row | M1 | ORIGINAL_REQUEST § R4 |
| 6 | Master Brand Umbrella Emblem | Refined SVG umbrella emblem (gold apex dot, curved canopy, underside highlight, vertical J-stem anchor) | M2 | ORIGINAL_REQUEST § R2 |
| 7 | eMudran Authentic CMYK Brand Mark | Authentic CMYK ink flourish emblem from business card asset `00003033-eMudran_Business_Card_p1_img_0_X5.png` | M2 | ORIGINAL_REQUEST § R2 |
| 8 | TVASTA Authentic Luxury Brand Mark | Authentic gold luxury emblem ("T V A S T A ENGINEERED AESTHETICS") from business card asset `00003034-TVASTA...jpg` | M2 | ORIGINAL_REQUEST § R2 |
| 9 | Bespoke Architectural Emblems | Custom SVG vector emblems for GRID APEX, SOLIS, SANYOG, AGRIM matching champagne gold engineering palette | M2 | ORIGINAL_REQUEST § R2 |
| 10 | Minimalist Floating Island Navbar | Centered floating glass capsule with umbrella logo, division switcher pills, telephone CTA, specular consultation button | M3 | ORIGINAL_REQUEST § R5 |
| 11 | Cinematic Monograph Hero | Center-aligned editorial headline in Instrument Sans over subtle One International Centre facade watermark | M3 | ORIGINAL_REQUEST § R6 |
| 12 | Interactive Tabbed Monograph | 6-division left rail switcher, live status dots, right glass viewport with authentic photos, specs, and leadership dossiers | M3 | ORIGINAL_REQUEST § R6 |
| 13 | Interactive Clippy Mascot Assistant | Floating liquid glass dock with animated umbrella mascot opening dark glass guidance hub with 1-tap routing and WhatsApp | M3 | ORIGINAL_REQUEST § R8 |
| 14 | Architectural Photo Lightbox Modal | Click-to-expand modal displaying high-res authentic imagery, material specifications, and execution scope | M3 | ORIGINAL_REQUEST § R8 |
| 15 | Solis Solar & Subsidy Calculator | Comprehensive solar sizing, pergola mounting, BIPV glass, EV charging, and PM Surya Ghar subsidy engine | M4 | ORIGINAL_REQUEST § R7 |
| 16 | eMudran Interactive Print Estimator | Interactive print & packaging estimator for brochures, packaging, signage, and volume tiers | M4 | ORIGINAL_REQUEST § R7 |
| 17 | TVASTA 3-Tier Space Estimator | Interactive 3-tier space planning estimator (Standard, Premium, Luxury) based on flat/commercial square footage | M4 | ORIGINAL_REQUEST § R7 |
| 18 | Dedicated Division Dossiers | Visual dossiers for all 6 routes (`/sanyog`, `/grid-apex`, `/solis`, `/tvasta`, `/emudran`, `/agrim`) and 4 sub-routes | M5 | ORIGINAL_REQUEST § R9 |
| 19 | Intelligent Email Routing & WhatsApp | Forms route to division emails (`admin@jcapexv.com`, `printmgmt@jcapexv.com`, `licenses@jcapexv.com`, etc.) + WhatsApp buttons | M5 | ORIGINAL_REQUEST § R9 |
| 20 | Zero Em-Dash Enforcement | Strictly ZERO em-dashes (`\u2014` / ` - `) across code, copy, alt text, or metadata (use hyphens, colons, or parentheses) | M6 | ORIGINAL_REQUEST § R10 |
| 21 | Authentic Media Verification | Authentic local photography and bespoke vector illustrations only; zero AI-generated visual artifacts | M6 | ORIGINAL_REQUEST § R10 |
| 22 | Client Confidentiality Preservation | Anonymized case studies and execution descriptions; zero private client names | M6 | ORIGINAL_REQUEST § R10 |
| 23 | Production Webpack Build Verification | Clean build passing with `npx next build --webpack` across all 15 routes with exit code 0 | M6 | ORIGINAL_REQUEST § R10 |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Design System, Tokens, Fonts & Layout | `src/app/globals.css`, `src/app/layout.tsx`, `next.config.ts`, `src/components/Footer.tsx`, Hero badge in `page.tsx` | none | DONE |
| M2 | Brand Identity & Vector Logo Suite | `src/components/Logo.tsx`, `src/components/DivisionLogos.tsx`, integrating raster & SVG marks for all 6 divisions | M1 | DONE |
| M3 | Core Interactive Components | `Navbar.tsx` (floating capsule), `InteractiveTabbedMonograph.tsx`, `Clippy.tsx` (umbrella dock), `ImageLightbox.tsx` | M1, M2 | PLANNED |
| M4 | Interactive Architectural Estimators | `SolarCalculator.tsx` (refinement), `PrintEstimator.tsx` (eMudran), `SpaceEstimator.tsx` (TVASTA) | M1, M2 | PLANNED |
| M5 | Division Dossiers, Tailored Forms & Email Routing | Update `/sanyog`, `/grid-apex`, `/solis`, `/tvasta`, `/emudran`, `/agrim`, sub-routes, `EnquiryForm.tsx`, email routing | M1, M2, M3, M4 | PLANNED |
| M6 | E2E Test Pass, Adversarial Hardening & Production Build | Pass 100% of E2E test suite (Tiers 1-4), Tier 5 adversarial hardening, zero em-dash audit, production build check | M1-M5 | PLANNED |

## Interface Contracts
### Design Tokens & Layout ↔ Components
- `src/app/globals.css` exports CSS variables:
  - `--color-bg: #0A0D10;`, `--color-bg-alt: #11151A;`, `--color-surface: rgba(17, 21, 26, 0.75);`
  - `--color-accent: #C29F53;`, `--color-border-accent: rgba(194, 159, 83, 0.3);`
  - Class `.ios-glass`: `backdrop-filter: blur(24px) saturate(190%); background: rgba(17, 21, 26, 0.7); border: 1px solid rgba(194, 159, 83, 0.25);`
  - Class `.font-sans`: binds to Instrument Sans with `letter-spacing: -0.02em;`
  - Class `.font-serif`: binds to Newsreader serif with optical sizing and line height 1.68.

### Brand Marks ↔ Components & Pages
- `src/components/Logo.tsx`:
  - `Logo({ width, height, className })`: master umbrella emblem.
- `src/components/DivisionLogos.tsx`:
  - `DivisionLogo({ division: 'solis' | 'sanyog' | 'gridApex' | 'tvasta' | 'emudran' | 'agrim', size?: number, className?: string })`: renders authentic mark (raster Next.js Image for eMudran and TVASTA, bespoke SVG for others).

### Estimators ↔ Enquiry Forms
- `SolarCalculator`, `PrintEstimator`, `SpaceEstimator`:
  - Callback prop: `onApplyCalculation?: (resultSummary: string) => void`
  - When user clicks "Apply to Consultation Form", scrolls to `#enquiry-form` and prepopulates the scope/details field with calculation breakdown.

### Image Lightbox Modal ↔ Photo Grid
- `src/components/ImageLightbox.tsx`:
  - Global modal or wrapper: `openLightbox({ src, alt, caption, specs })`
  - Closes on Escape, click outside, or close button.

## Code Layout
- `src/app/globals.css`: Global design tokens, dark canvas, liquid glass materials, animations.
- `src/app/layout.tsx`: Root layout, `next/font/google` native loader, metadata.
- `next.config.ts`: Next.js configuration (`outputFileTracingRoot`).
- `src/components/Logo.tsx`: Master umbrella emblem vector.
- `src/components/DivisionLogos.tsx`: Dedicated brand marks for all 6 divisions.
- `src/components/Navbar.tsx`: Minimalist floating island glass capsule.
- `src/components/InteractiveTabbedMonograph.tsx`: 6-division interactive monograph.
- `src/components/Clippy.tsx`: Animated umbrella mascot liquid glass dock and guidance hub.
- `src/components/ImageLightbox.tsx`: Architectural photo modal dialog.
- `src/components/SolarCalculator.tsx`: Solis solar & PM Surya Ghar subsidy calculator.
- `src/components/PrintEstimator.tsx`: eMudran print & packaging calculator.
- `src/components/SpaceEstimator.tsx`: TVASTA 3-tier space planning calculator.
- `src/components/EnquiryForm.tsx`: Intelligent division enquiry form with email routing & WhatsApp.
- `src/components/Footer.tsx`: Footer with legal CIN disclosure in copyright row.
- `src/content/divisions.ts`: Structured dossiers and content for all divisions.
- `tests/`: Opaque-box E2E test harness and test cases (Tiers 1-5).
