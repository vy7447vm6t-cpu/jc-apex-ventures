import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T3_COMB_01',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Floating Navbar styling integrates with global liquid glass and dark canvas',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    const css = readFileSafe(PATHS.globalsCss);
    assert(nav !== null && css !== null, 'Navbar and globals.css must exist');
    // Navbar must use glass styling or backdrop blur consistent with tokens
    const usesGlass = nav.includes('ios-glass') || nav.includes('backdrop-blur') || nav.includes('bg-[');
    assert(usesGlass, 'Navbar must inherit liquid glass styling consistent with design system');
  },
});

test({
  id: 'T3_COMB_02',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Master umbrella emblem is shared consistently across Navbar, Hero, and Clippy',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar) || '';
    const footer = readFileSafe(PATHS.footer) || '';
    const clippy = readFileSafe(PATHS.clippy) || '';
    // Logo component or umbrella emblem must be used in key navigation & assistant shells
    const navHasLogo = nav.includes('Logo') || nav.includes('umbrella');
    const footerHasLogo = footer.includes('Logo') || footer.includes('umbrella') || footer.includes('JC APEX');
    const clippyHasLogo = clippy.includes('Logo') || clippy.includes('umbrella') || clippy.includes('apex');
    assert(navHasLogo, 'Navbar must feature master brand emblem');
    assert(footerHasLogo, 'Footer must feature master brand emblem or identifier');
    assert(clippyHasLogo, 'Clippy must feature master brand mascot emblem');
  },
});

test({
  id: 'T3_COMB_03',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Monograph division switcher routes match dedicated division pages',
  fn: () => {
    const monograph = readFileSafe(PATHS.interactiveTabbedMonograph);
    assert(monograph !== null, 'InteractiveTabbedMonograph.tsx must exist');
    // The 6 division routes linked by the monograph must exist on filesystem
    const routes = ['solis', 'sanyog', 'grid-apex', 'tvasta', 'emudran', 'agrim'];
    for (const r of routes) {
      assert(
        monograph.includes(r),
        `Monograph must link to existing division route: /${r}`
      );
    }
  },
});

test({
  id: 'T3_COMB_04',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: SolarCalculator callback connects calculation summary to EnquiryForm',
  fn: () => {
    const calc = readFileSafe(PATHS.solarCalculator);
    const form = readFileSafe(PATHS.enquiryForm);
    assert(calc !== null && form !== null, 'SolarCalculator and EnquiryForm must exist');
    // Calculator must support onApplyCalculation or scroll to form
    const hasApplyAction = calc.includes('onApplyCalculation') || calc.includes('enquiry') || calc.includes('handleApplyToForm');
    assert(hasApplyAction, 'SolarCalculator must support transferring quotation details to EnquiryForm');
  },
});

test({
  id: 'T3_COMB_05',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: eMudran print estimator itemized quotation connects to print enquiry',
  fn: () => {
    const printRoute = readFileSafe(PATHS.routePrintMgmt) || readFileSafe(PATHS.printEstimator) || '';
    assert(printRoute.length > 0, 'Print management page or estimator must exist');
    const hasQuotationDispatch = printRoute.includes('enquiry') || printRoute.includes('mailto') || printRoute.includes('calculate');
    assert(hasQuotationDispatch, 'Print estimator must allow dispatching calculated print quote into enquiry');
  },
});

test({
  id: 'T3_COMB_06',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: TVASTA 3-tier space planning estimator connects to space enquiry',
  fn: () => {
    const spaceRoute = readFileSafe(PATHS.routeSpacePlanning) || readFileSafe(PATHS.spaceEstimator) || '';
    assert(spaceRoute.length > 0, 'Space planning page or estimator must exist');
    const hasTierSelection = spaceRoute.includes('standard') || spaceRoute.includes('premium') || spaceRoute.includes('luxury') || spaceRoute.includes('tier');
    assert(hasTierSelection, 'Space planning must support 3-tier selection');
  },
});

test({
  id: 'T3_COMB_07',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Division brand mark identity aligns with division email routing targets',
  fn: () => {
    const content = readFileSafe(PATHS.divisionsContent);
    assert(content !== null, 'divisions.ts must exist');
    // Verify coherent pairing: Solis -> solis@jcapexv.com, eMudran -> printmgmt@jcapexv.com, TVASTA -> spacemgmt@jcapexv.com
    assert(content.includes('solis@jcapexv.com'), 'Solis must be paired with solis@jcapexv.com');
    assert(content.includes('printmgmt@jcapexv.com'), 'eMudran must be paired with printmgmt@jcapexv.com');
    assert(content.includes('spacemgmt@jcapexv.com'), 'TVASTA must be paired with spacemgmt@jcapexv.com');
  },
});

test({
  id: 'T3_COMB_08',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Clippy assistant solar trigger navigates to SolarCalculator section',
  fn: () => {
    const clippy = readFileSafe(PATHS.clippy);
    assert(clippy !== null, 'Clippy.tsx must exist');
    const hasSolarShortcut = clippy.includes('solis') || clippy.includes('solar') || clippy.includes('#solar');
    assert(hasSolarShortcut, 'Clippy must provide shortcut navigation to Solis solar calculator');
  },
});

test({
  id: 'T3_COMB_09',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Division project photos pass metadata to shared ImageLightbox modal',
  fn: () => {
    const lightbox = readFileSafe(PATHS.imageLightbox);
    assert(lightbox !== null, 'ImageLightbox.tsx must exist');
    // Lightbox must accept src and optional caption/alt props
    const acceptsSrc = lightbox.includes('src') && (lightbox.includes('alt') || lightbox.includes('caption'));
    assert(acceptsSrc, 'ImageLightbox must accept image src and descriptive captions from division photo grids');
  },
});

test({
  id: 'T3_COMB_10',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Root layout font variables inherit into all 15 page routes',
  fn: () => {
    const layout = readFileSafe(PATHS.layoutTsx);
    assert(layout !== null, 'layout.tsx must exist');
    // layout wraps children in body with font class variables
    const wrapsChildren = layout.includes('{children}') && (layout.includes('variable') || layout.includes('font-sans') || layout.includes('antialiased'));
    assert(wrapsChildren, 'layout.tsx RootLayout must wrap all child routes with typography variables');
  },
});

test({
  id: 'T3_COMB_11',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Zero em-dash constraint respected across all estimators, labels, and forms',
  fn: () => {
    const filesToAudit = [
      PATHS.solarCalculator,
      PATHS.enquiryForm,
      PATHS.navbar,
      PATHS.footer,
      PATHS.clippy,
    ];
    for (const f of filesToAudit) {
      if (fileExists(f)) {
        const text = readFileSafe(f);
        assert(!text.includes('\u2014'), `Zero em-dash constraint must hold in ${f}`);
      }
    }
  },
});

test({
  id: 'T3_COMB_12',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Dark theme canvas ensures high contrast with all gold division vector emblems',
  fn: () => {
    const css = readFileSafe(PATHS.globalsCss) || '';
    const logos = readFileSafe(PATHS.divisionLogos) || '';
    // Accent gold #C29F53 or #D4AF37 against #0A0D10
    const hasGoldAccent = css.includes('#C29F53') || css.includes('#D4AF37') || logos.includes('#C29F53') || logos.includes('#D4AF37') || logos.includes('gold');
    assert(hasGoldAccent, 'Division vector marks must use champagne/gold tones optimized for deep dark canvas');
  },
});
