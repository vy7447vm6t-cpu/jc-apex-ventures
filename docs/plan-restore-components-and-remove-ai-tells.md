# Plan: bring the components back and remove the AI tells

1 November 2026. This plan follows research into what designers on Reddit, GitHub and design blogs say gives away an AI-built site.

## What the research says

| Source | Finding |
|---|---|
| [vibecoded-design-tells](https://github.com/JCarterJohnson/vibecoded-design-tells): 3.2M Reddit posts across 47 subreddits | The top complaints are "they all look the same" and "screams AI", at about 13% of on-topic posts each. The leading tells are default shadcn/Tailwind styling and purple gradients. It names the cream background with a serif and sage palette as the new "tasteful default" that also reads as AI. Bento grids and glassmorphism rank near the bottom. |
| [Developers Digest: 16 patterns](https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it) | Stock font pairings, naming Instrument Serif. A serif italic accent word. All-caps section labels. A badge above the H1. Coloured left-border cards. Identical cards with an icon on top. Numbered 1, 2, 3 steps. Stat banner rows. Glows and gradients everywhere. |
| Copy guides ([Grammarly](https://www.grammarly.com/blog/ai-writing/common-ai-words/), [ContentBeta](https://www.contentbeta.com/blog/list-of-words-overused-by-ai/), [DEV: 300 phrases](https://dev.to/q404365631/300-ai-words-and-phrases-to-avoid-in-2026-complete-list-20f0)) | Word lists matter less than structure: groups of three, short punchy sentences, and copy that could sit unchanged on a competitor's site. The test is to rewrite any sentence a competitor could also use. |
| [Codrops case studies](https://tympanus.net/codrops/2026/07/) (Trionn, Ridgeline, Dash Creative) | Award-level sites keep heavy motion (WebGL, GSAP, Lenis) but tie it to the brand idea and budget it for performance: lazy-loaded, paused offscreen, reduced-motion fallbacks. |

**Conclusion:** the animated components weren't the problem. The tells came from what I put in their place:
- Instrument Serif with Inter on a cream background
- an italic accent word in the hero headline
- uppercase eyebrow labels
- gold left-border "margin notes"
- numbered step rows
- the hero stat row
- identical flat cards

Some of the copy is also generic.

## Done in this session
- All 44 removed component files are restored from `9aef2e0` (react-bits, bklit, Clippy, NetworkGraph, StudioCADViewer, LogoLoop, HoloCard and the rest), along with the original `react-bits/index.ts`. The project type-checks cleanly.
- They aren't placed on any page yet: that's phase 2.
- The other session ([JC Apex website redesign plan (fork)](#local_5dcf047c-238c-433a-9f37-8e1b94ef2aa3)) has been asked to pause.
- Note: `origin/main` is already at `a652c8a` (the redesign), so jcapexv.com is probably deploying it now.

## Phase 1: copy (sentence by sentence, every page)
1. Run a scan for the tells in all copy:
   - groups of three ("survey, design, build")
   - stock phrases ("one desk", "under the technical leadership of", "what clients ask us", "talk to us about your site")
   - parallel sentence pairs
   - italic accent words
   - competitor-swappable sentences
2. Rewrite in your voice, as a Mumbai engineer would say it to a society secretary or a factory owner: specific, with names, places, kWp and years. Cut every sentence that could appear unchanged on another firm's site.
3. Lead with the clients and named projects, which no competitor can copy.
4. You sign off the final copy per page. I'll send it as a side-by-side document first.

## Phase 2: looks, restoring the components with true content
| Component | Where it goes | What it shows |
|---|---|---|
| HoloCard / DepthCarousel / ScrollStack | Home, Clients and projects | The 4 plants, the hotels and the Charkop proposal, one card each, with real figures |
| LogoLoop | Home, below the hero | The four utilities as text marks, with no implied endorsement |
| MagicBento | Home, divisions | The six divisions, each tile with its own photo and one-liner |
| GradientASCII / MicroSlats / PatternWaves / FluxLines | Division heroes | One background per division, in its own colours |
| ParticleText / TechText | Hero headline | The headline itself |
| TargetCursor / GlowCursor / IPadCursor | Desktop only | — |
| StudioCADViewer / NetworkGraph | Studio, Grid Apex | The real single-line diagram, and how the divisions connect |
| AnimatedCounter | Facts | Only confirmed figures (1 MW+, 14 hotels, 36+ years) |
| ElectricBorder / SpotlightCard / OptionWheel / ScrollExpand / InfiniteSpiral / GridScan / CrtWarp / FaultyTerminal / LineSidebar / FlexCarousel / SvgPathAnimator / ShapeWaves | Placed only where they carry content | I'll propose a spot for each, as a gallery of screenshots |
| Clippy / InteractiveTabbedMonograph / AuthorityLogos / GroundedRecognition / TvastaTierGallery / EvNetwork chart | Rewired | Real content only: Clippy as an enquiry helper, the monograph as the division profiles |

Also remove the tells I added:
- the gold left-border margin notes
- uppercase eyebrows (back to sentence case)
- the faint section numbers
- the hero stat row
- the 1-2-3 step rows (shown as diagrams or prose instead)
- the italic accent word
- the cream background with Instrument Serif and Inter as defaults

Fonts and colour will follow your brand guidelines rather than these defaults. I'll show two type options for you to pick from.

## Phase 3: performance and safety (keeping the motion)
- Lazy-load each WebGL or canvas component with `next/dynamic` and pause it offscreen. Free WebGL contexts on unmount, and use `@gsap/react` `useGSAP` for cleanup.
- Simplify on phones, and show a still frame when reduced motion is on.
- Measure Lighthouse before and after; target mobile performance ≥ 70.

## Phase 4: tests and release
- Replace the "retired components" tests with tests that require each restored component to render true content.
- Show you the preview build and get your sign-off before anything goes to `main`.

## Decisions I need from you
1. Copy: should I draft the rewrites for you to approve per page, or rewrite and publish directly?
2. `main` already has the redesign live. Should I roll the live site back to the old version (`9aef2e0`) until this is done, or keep the redesign live and improve it?
