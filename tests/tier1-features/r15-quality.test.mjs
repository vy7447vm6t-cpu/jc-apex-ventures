import fs from 'node:fs';
import path from 'node:path';
import { test } from '../helpers/test-context.mjs';
import { assert, assertIncludes } from '../helpers/assertions.mjs';
import { APP_DIR, PATHS, readFileSafe } from '../helpers/project-paths.mjs';

const app = (file) => readFileSafe(path.join(APP_DIR, file)) ?? '';

test({
  id: 'T1_R15_01',
  tier: 'tier1',
  feature: 'r15',
  title: 'R15 Feature: A skip link jumps to #main-content on every page',
  fn: () => {
    assertIncludes(readFileSafe(PATHS.layoutTsx) ?? '', 'href="#main-content"', 'The layout carries the skip link');
    for (const file of [PATHS.homePage, PATHS.divisionPage, PATHS.routeStudio, path.join(APP_DIR, 'not-found.tsx')]) {
      assertIncludes(readFileSafe(file) ?? '', 'id="main-content"', `${path.basename(file)} has the skip target`);
    }
  },
});

test({
  id: 'T1_R15_02',
  tier: 'tier1',
  feature: 'r15',
  title: 'R15 Feature: Every route has a canonical URL, a short description and share cards',
  fn: () => {
    const seo = readFileSafe(path.join(PATHS.servicePages, '..', 'seo.ts')) ?? '';
    assertIncludes(seo, 'alternates: { canonical: path }', 'pageMetadata sets the canonical URL');
    assertIncludes(seo, "card: 'summary_large_image'", 'and a Twitter card');
    assertIncludes(seo, 'shortDescription(description)', 'and trims descriptions to about 160 characters');
    for (const route of fs.readdirSync(APP_DIR).filter((d) => fs.existsSync(path.join(APP_DIR, d, 'page.tsx')))) {
      assertIncludes(app(`${route}/page.tsx`), `path: '/${route}'`, `/${route} passes its own path`);
    }
    assertIncludes(app('page.tsx'), "alternates: { canonical: '/' }", 'The home page has its canonical URL');
    assertIncludes(readFileSafe(PATHS.layoutTsx) ?? '', 'metadataBase: new URL(SITE_URL)', 'The layout sets metadataBase');
    assert(fs.existsSync(path.join(APP_DIR, 'opengraph-image.tsx')), 'A share image is generated');
  },
});

test({
  id: 'T1_R15_03',
  tier: 'tier1',
  feature: 'r15',
  title: 'R15 Feature: Sitemap, robots and a branded 404 page exist',
  fn: () => {
    assertIncludes(app('sitemap.ts'), "'/electricity-grievances'", 'The sitemap lists the service pages');
    assertIncludes(app('robots.ts'), 'sitemap.xml', 'robots points at the sitemap');
    const nf = app('not-found.tsx');
    assertIncludes(nf, 'divisions.map', 'The 404 page links every division');
    assertIncludes(nf, 'index: false', 'and is not indexed');
  },
});

test({
  id: 'T1_R15_04',
  tier: 'tier1',
  feature: 'r15',
  title: 'R15 Feature: Pages transition, and the estimators load only near the screen',
  fn: () => {
    assertIncludes(readFileSafe(PATHS.nextConfig) ?? '', 'viewTransition: true', 'View transitions are enabled');
    assertIncludes(app('template.tsx'), 'enter="page-enter"', 'The template animates each page in');
    assertIncludes(readFileSafe(PATHS.globalsCss) ?? '', '::view-transition-new(.page-enter)', 'with CSS that reduced motion turns off');
    assertIncludes(readFileSafe(PATHS.homePage) ?? '', '<LazyMount', 'Home estimators mount near the screen');
    assertIncludes(readFileSafe(PATHS.divisionPage) ?? '', "dynamic(() => import('@/components/InteriorCalculator')", 'Division estimators are split out');
  },
});
