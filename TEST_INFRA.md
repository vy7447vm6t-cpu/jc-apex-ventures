# Test Infrastructure Specification: JC Apex Ventures

## 1. Architecture Overview
This document specifies the end-to-end (E2E) opaque-box test infrastructure designed for the JC Apex Ventures digital platform transformation. The test suite verifies compliance with requirements **R1 through R10** and all acceptance criteria defined in `ORIGINAL_REQUEST.md` and `PROJECT.md`.

The suite is architected according to the **4-Tier Test Architecture**:
- **Tier 1: Feature Coverage** (60 tests, >=5 per requirement covering R1–R10).
- **Tier 2: Boundary & Corner Cases** (60 tests, >=5 per requirement covering limits, empty states, clamping, precision).
- **Tier 3: Cross-Feature Combinations** (12 tests, pairwise integrations, shared tokens, callbacks, routing coherence).
- **Tier 4: Real-World Application Scenarios** (6 tests, multi-step customer workflows for solar EPC, luxury packaging, interior fit-outs, grievance filing, and engineering).
- **Total Test Count**: **138 tests** (exceeding the >=115 requirement).

---

## 2. Directory Layout & Module Structure

```
tests/
├── run_e2e_tests.sh                  # Executable Bash master test runner
├── runner.mjs                        # Node.js ESM test runner with ANSI formatting & JSON support
├── helpers/
│   ├── assertions.mjs                # Assertion primitives (assert, assertEqual, assertMatch, contrast math)
│   ├── project-paths.mjs             # Robust file resolution, path constants & binary inspection
│   └── test-context.mjs              # TestRegistry and context lifecycle manager
├── tier1-features/
│   ├── r1-dark-theme.test.mjs        # R1: Canvas tokens, liquid glass blur, gold borders, text contrast
│   ├── r2-brand-logos.test.mjs       # R2: Master umbrella emblem, eMudran CMYK, TVASTA, SVG marks
│   ├── r3-typography.test.mjs        # R3: next/font/google, layout font variables, tracking -0.02em, Newsreader
│   ├── r4-cin-badge.test.mjs         # R4: Bureaucratic CIN removal from hero, footer copyright relegation
│   ├── r5-floating-nav.test.mjs      # R5: Minimalist floating island navbar, capsule dock, tel CTA
│   ├── r6-monograph-hero.test.mjs    # R6: Cinematic hero headline, facade watermark, tabbed monograph
│   ├── r7-estimators.test.mjs        # R7: Solis subsidy & EPC math, eMudran print rates, TVASTA 3-tier
│   ├── r8-clippy-lightbox.test.mjs   # R8: Umbrella mascot dock, guidance hub, lightbox modal dialog
│   ├── r9-division-routes.test.mjs   # R9: 6 primary routes, 4 sub-routes, email routing matrix, API
│   └── r10-constraints.test.mjs      # R10: Zero em-dash audit, authentic photos, webpack configuration
├── tier2-boundaries/
│   ├── r1-theme-bounds.test.mjs      # R1 Bounds: WCAG AAA contrast ratio calculation, blur/saturation clamp
│   ├── r2-logo-bounds.test.mjs       # R2 Bounds: Default dimensions, unknown slug fallback, PNG alpha channel
│   ├── r3-font-bounds.test.mjs       # R3 Bounds: Letter-spacing clamp, fallback fonts, display:swap
│   ├── r4-cin-bounds.test.mjs        # R4 Bounds: Case-insensitive hero absence, MCA pattern match, OPC entity
│   ├── r5-nav-bounds.test.mjs        # R5 Bounds: Elevated z-index (>=40), phone URI sanitization, breakpoints
│   ├── r6-monograph-bounds.test.mjs  # R6 Bounds: Tab index clamp [0,5], unique keys, empty associate safety
│   ├── r7-estimator-bounds.test.mjs  # R7 Bounds: Solar bill min/max clamp, 0 area safety, TVASTA area bounds
│   ├── r8-clippy-bounds.test.mjs     # R8 Bounds: State toggle safety, Escape dismiss, backdrop click stop
│   ├── r9-routing-bounds.test.mjs    # R9 Bounds: Email syntax check, 400 validation, unconfigured SMTP fallback
│   └── r10-constraint-bounds.test.mjs# R10 Bounds: Disguised unicode escapes, image sizes <5MB, disclaimer
├── tier3-combinations/
│   └── cross-feature.test.mjs        # Pairwise integrations across theme, navigation, forms & calculators
└── tier4-scenarios/
    └── customer-workflows.test.mjs   # Realistic end-to-end customer workflows across all divisions
```

---

## 3. Execution Commands

### 3.1 Full Test Suite Run
Execute all 138 tests with human-readable diagnostic output and summary table:
```bash
./tests/run_e2e_tests.sh
```
or via Node.js directly:
```bash
node tests/runner.mjs
```

### 3.2 Tier Filtering
Run only tests belonging to a specific tier:
```bash
# Run Tier 1 only (60 feature tests)
./tests/run_e2e_tests.sh --tier 1

# Run Tier 2 only (60 boundary tests)
./tests/run_e2e_tests.sh --tier 2

# Run Tier 3 only (12 cross-feature tests)
./tests/run_e2e_tests.sh --tier 3

# Run Tier 4 only (6 customer workflow tests)
./tests/run_e2e_tests.sh --tier 4
```

### 3.3 Feature Filtering
Run tests for a single requirement (both Tier 1 feature and Tier 2 boundary tests):
```bash
# Run all tests for R10 (Zero em-dash, media, build constraints)
./tests/run_e2e_tests.sh --feature r10

# Run all tests for R7 (Solar, eMudran, and TVASTA estimators)
./tests/run_e2e_tests.sh --feature r7

# Run all tests for R1 (Dark theme & liquid glass)
./tests/run_e2e_tests.sh --feature r1
```

### 3.4 Machine-Readable JSON Output
Export test results as structured JSON (for automated CI/CD and reporting):
```bash
./tests/run_e2e_tests.sh --json
```

### 3.5 Verbose Diagnostics
Display error stack traces for failed assertions:
```bash
./tests/run_e2e_tests.sh --verbose
```

---

## 4. Exit Codes & Diagnostics
The test runner conforms to standard UNIX conventions:
- **`0`**: All executed tests passed cleanly.
- **`1`**: One or more assertions failed (clear failure message, expected vs actual values, and file location displayed).
- **`2`**: Fatal test runner initialization or syntax error.

---

## 5. Entry Points & Verification Methodology

| Entry Point | Verified Components | Authoritative Expected Source |
|---|---|---|
| **CSS Tokens & Design System** | `src/app/globals.css` | `--color-bg: #0A0D10`, `--color-bg-alt: #11151A`, `--color-surface: rgba(17, 21, 26, 0.75)`, `.ios-glass: blur(24px) saturate(190%)`, `--color-border-accent: rgba(194, 159, 83, 0.3)` |
| **Native Typography** | `src/app/layout.tsx`, `globals.css` | `next/font/google` loading `Instrument_Sans` and `Newsreader`, elimination of external `@import`, letter-spacing `-0.02em` |
| **Brand Identity** | `src/components/Logo.tsx`, `DivisionLogos.tsx`, `public/images/logos/` | Master umbrella emblem (gold apex dot, canopy, J-stem), eMudran CMYK card mark, TVASTA luxury card mark, bespoke SVG marks |
| **Bureaucratic Disclosures** | `src/app/page.tsx`, `src/components/Footer.tsx` | Complete absence of `CIN: U70200MH2023OPC411326` from Hero; presence in footer copyright row with MCA & OPC notice |
| **Floating Navigation** | `src/components/Navbar.tsx` | Centered floating capsule, liquid glass material, umbrella mark, division links, telephone `+91 70211 12664` |
| **Monograph & Hero** | `src/app/page.tsx`, `InteractiveTabbedMonograph.tsx` | Center-aligned editorial hero, One International Centre facade watermark, 6-division tab switcher, leadership dossiers |
| **Estimators** | `SolarCalculator.tsx`, `print-management/`, `space-planning/` | PM Surya Ghar subsidy formulas, EPC tiered rates + ₹12/W pergola + 13.8% GST; eMudran brochure/signage/logistics rates; TVASTA 3-tier fit-out rates |
| **Clippy & Lightbox** | `src/components/Clippy.tsx`, `ImageLightbox.tsx` | Umbrella mascot floating dock, guidance hub (1-tap routing, solar link, WhatsApp `wa.me`), lightbox modal with Escape dismiss |
| **Email Routing** | `src/content/divisions.ts`, `EnquiryForm.tsx`, `/api/contact/route.ts` | Division email targets (`admin@jcapexv.com`, `printmgmt@jcapexv.com`, `spacemgmt@jcapexv.com`, `solis@jcapexv.com`, `licenses@jcapexv.com`) |
| **Strict Constraints** | Whole repository scan (`src/`, `public/`, config files) | Exactly 0 unicode `\u2014` (` - `) and 0 `&mdash;` entities; local authentic assets only; production webpack configuration |

---

## 6. Progressive Milestone Compatibility
The test suite implements **Progressive Testability**:
- Baseline features that are currently implemented (e.g. existing routes, authentic assets, zero em-dash compliance, solar subsidy mathematics, print rate formulas, legal footer text) pass immediately.
- Features scheduled for subsequent milestones (M1 theme/fonts, M2 division marks, M3 monograph/lightbox/clippy, M4 TVASTA estimator, M5 email routing) are asserted strictly against their specifications and will transition to passing as implementing agents complete their milestones.
