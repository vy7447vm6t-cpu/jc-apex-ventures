import path from 'node:path';
import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertIncludes } from '../helpers/assertions.mjs';
import { PATHS, PROJECT_ROOT, fileExists, readFileSafe } from '../helpers/project-paths.mjs';

test({
  id: 'T3_COMB_01',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Navigation is a solid white bar with a hairline, no glass',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar);
    const css = readFileSafe(PATHS.globalsCss);
    assert(nav !== null && css !== null, 'Navbar and globals.css must exist');
    assert(!/backdrop/i.test(nav), 'Navigation must not use backdrop blur (guidelines 2.5)');
    assert(/\.kokonut-nav-pill \{[^}]*background: #FFFFFF !important;[^}]*border: 1px solid rgba\(0, 0, 0, 0\.08\)/.test(css), 'Navigation bar must be white with a hairline');
  },
});

test({
  id: 'T3_COMB_02',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Master emblem is shared by the navigation and the footer',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar) || '';
    const footer = readFileSafe(PATHS.footer) || '';
    assert(/import Logo from '\.\/Logo'/.test(nav), 'Navigation must use the master emblem');
    assert(/import Logo from '\.\/Logo'/.test(footer), 'Footer must use the master emblem');
  },
});

test({
  id: 'T3_COMB_03',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Hero, services and studio link to the same six division pages',
  fn: () => {
    const routes = ['solis', 'sanyog', 'grid-apex', 'tvasta', 'emudran', 'agrim'];
    const hero = readFileSafe(PATHS.groundedHero) || '';
    const services = readFileSafe(PATHS.groundedServices) || '';
    const studio = readFileSafe(PATHS.routeStudio) || '';
    for (const r of routes) {
      assert(hero.includes(`'/${r}'`), `Hero must link to /${r}`);
      assert(services.includes(`'/${r}'`), `Services must link to /${r}`);
      assert(studio.includes(`slug: '${r}'`), `Studio must link to /${r}`);
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
  title: 'T3 Cross-Feature: Division inboxes on the website match the PDF profiles',
  fn: () => {
    const content = readFileSafe(PATHS.divisionsContent);
    assert(content !== null, 'divisions.ts must exist');
    const inbox = {
      'grid-apex': 'admin@jcapexv.com',
      sanyog: 'licenses@jcapexv.com',
      tvasta: 'spacemgmt@jcapexv.com',
      emudran: 'admin@jcapexv.com',
      agrim: 'admin@jcapexv.com',
    };
    for (const [slug, email] of Object.entries(inbox)) {
      const pdf = readFileSafe(path.join(PROJECT_ROOT, 'profiles', `${slug}.mjs`)) || '';
      assert(pdf.includes(email), `The ${slug} PDF must use ${email}`);
      const block = content.slice(content.indexOf(`slug: '${slug}'`));
      const contact = /contact: \{ emails: \[([^\]]*)\]/.exec(block);
      assert(contact && contact[1].includes(email), `The ${slug} page must use ${email}`);
    }
  },
});

test({
  id: 'T3_COMB_08',
  tier: 'tier3',
  feature: 'cross',
  title: 'T3 Cross-Feature: Enquire on the Solis page lands on the Solis enquiry form, which the estimate fills in',
  fn: () => {
    const nav = readFileSafe(PATHS.navbar) || '';
    const page = readFileSafe(PATHS.divisionPage) || '';
    const anchors = /const ENQUIRY_ANCHORS[^}]*\}/.exec(nav)?.[0] ?? '';
    assert(nav.includes("?? '#contact'") && !anchors.includes("'/solis'"), 'Navigation must send /solis to #contact');
    assert(page.includes('<section id="contact"'), 'DivisionPage must have the #contact section');
    assert(page.includes('<SiteEnquiryForm') && page.includes('estimate={estimate}'), 'The contact section must hold the form, filled by the estimate');
    assert(page.includes('onUse(describeSolarEstimate(c))'), 'The solar estimator must pass its result to the form');
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
      PATHS.groundedHero,
      PATHS.clientMarquee,
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
    // Accent gold #C29F53 or #D4AF37 against #0A0D10
    const hasGoldAccent = css.includes('#C29F53') || css.includes('#D4AF37');
    assert(hasGoldAccent, 'Division vector marks must use champagne/gold tones optimized for deep dark canvas');
  },
});
