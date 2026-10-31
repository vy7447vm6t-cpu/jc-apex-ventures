import { test } from '../helpers/test-context.mjs';
import { assert, assertEqual, assertNotMatch, assertMatch, assertCloseTo } from '../helpers/assertions.mjs';
import { SRC_DIR, readFileSafe } from '../helpers/project-paths.mjs';
import path from 'node:path';
import {
  PROJECTS,
  CLIENT_ROSTER,
  ATTRIBUTION_LINES,
  trackRecord,
  clients,
  marqueeClients,
  clientGroups,
  solarCapacityKw,
  keyFacts,
  formatCapacity,
  formatProjectDate,
} from '../../src/content/track-record.ts';

const SOURCE = readFileSafe(path.join(SRC_DIR, 'content', 'track-record.ts'));

test({
  id: 'T1_R11_01',
  tier: 'tier1',
  feature: 'r11',
  title: 'R11 Track record: project and client ids are unique',
  fn: () => {
    const ids = [...PROJECTS.map((p) => p.id), ...CLIENT_ROSTER.map((c) => c.id)];
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    assertEqual(dupes.length, 0, `Duplicate ids: ${dupes.join(', ')}`);
  },
});

test({
  id: 'T1_R11_02',
  tier: 'tier1',
  feature: 'r11',
  title: 'R11 Track record: no associate names, PO numbers or exact contract values ship to the browser',
  fn: () => {
    assertNotMatch(SOURCE, /sanjay|golani|marketing co/i, 'Associates and contracting firms must not be named');
    assertNotMatch(SOURCE, /\b\d{1,2},\d{2},\d{2},\d{3}\b|\b\d{2},\d{2},\d{3}\b/, 'Exact rupee amounts must not appear; use rounded brackets');
    assertNotMatch(SOURCE, /OT\/\d|GB\/|PO ref|P\.O\./i, 'Purchase order references must not appear');
  },
});

test({
  id: 'T1_R11_03',
  tier: 'tier1',
  feature: 'r11',
  title: 'R11 Track record: every verified completed project has capacity, month, scope and evidence',
  fn: () => {
    const verified = PROJECTS.filter((p) => p.kind === 'completed' && p.proof.status === 'verified');
    assert(verified.length >= 4, 'Expected at least four verified projects');
    for (const p of verified) {
      assert(p.capacity && p.capacity.value > 0, `${p.id}: capacity missing`);
      assert(p.date && p.date.year && p.date.month, `${p.id}: completion month missing`);
      assert(p.scope.length > 10, `${p.id}: scope missing`);
      assert(p.proof.note.length > 10, `${p.id}: evidence note missing`);
    }
  },
});

test({
  id: 'T1_R11_04',
  tier: 'tier1',
  feature: 'r11',
  title: 'R11 Track record: value brackets are rounded lakh or crore figures',
  fn: () => {
    for (const p of PROJECTS.filter((x) => x.valueBracket)) {
      assertMatch(
        p.valueBracket,
        /^₹\d+(\.\d)?( to \d+)? (lakh|crore)\+?( \([^)]+\))?$/,
        `${p.id}: "${p.valueBracket}" is not a rounded bracket`,
      );
    }
  },
});

test({
  id: 'T1_R11_05',
  tier: 'tier1',
  feature: 'r11',
  title: 'R11 Track record: unconfirmed items never reach the page',
  fn: () => {
    const shown = [...trackRecord(), ...clients(), ...keyFacts()];
    for (const item of shown) {
      const status = typeof item.proof === 'string' ? item.proof : item.proof.status;
      assert(status === 'verified' || status === 'company-record', `${item.id} is shown with status ${status}`);
    }
    const shownIds = shown.map((x) => x.id);
    for (const hidden of ['tvasta-chennai-metro-2026', 'tvasta-oic-office-fitout', 'emudran-vicco', 'liaison-engagements']) {
      assert(!shownIds.includes(hidden), `${hidden} must stay hidden until confirmed`);
    }
  },
});

test({
  id: 'T1_R11_06',
  tier: 'tier1',
  feature: 'r11',
  title: 'R11 Track record: proposals and studies are never presented as completed work',
  fn: () => {
    for (const p of trackRecord()) {
      assertEqual(p.kind, 'completed', `${p.id} is a ${p.kind}, not completed work`);
    }
    for (const p of PROJECTS.filter((x) => x.kind !== 'completed')) {
      assert(p.statusNote || p.proof.status === 'confirm', `${p.id}: non-completed work needs a status note`);
    }
  },
});

test({
  id: 'T1_R11_07',
  tier: 'tier1',
  feature: 'r11',
  title: "R11 Track record: the creative director's portfolio stays out of the group marquee",
  fn: () => {
    assert(!marqueeClients().some((c) => c.attribution === 'creative-director'), 'Portfolio brands must not scroll as group clients');
    const creative = clientGroups().find((g) => g.id === 'creative');
    assert(creative, 'The expanded list needs a creative group');
    assertEqual(creative.attributionLine, ATTRIBUTION_LINES['creative-director'], 'Creative group must carry its attribution line');
    assert(creative.clients.some((c) => c.name === 'Club Mahindra'), 'Club Mahindra expected in the creative group');
    assert(!SOURCE.includes('Mahindra & Mahindra'), 'The profile says Club Mahindra, not Mahindra & Mahindra');
  },
});

test({
  id: 'T1_R11_08',
  tier: 'tier1',
  feature: 'r11',
  title: 'R11 Track record: headline figures are computed from the data',
  fn: () => {
    assertCloseTo(solarCapacityKw(), 1055.2, 0.01, 'Solar total should be 1,055.2');
    const facts = Object.fromEntries(keyFacts().map((f) => [f.id, f]));
    assertEqual(facts['solar-capacity'].value, '1 MW+', 'Solar total is published as 1 MW+');
    assertEqual(facts['solar-capacity'].label, 'Solar capacity across four plants, 2016 to 2025', 'Solar label');
    assertEqual(facts['hospitality-sites'].value, '14', 'Fourteen hospitality properties');
    for (const group of clientGroups()) {
      assert(group.attributionLine.length > 0, `${group.id}: attribution line missing`);
    }
  },
});

test({
  id: 'T1_R11_09',
  tier: 'tier1',
  feature: 'r11',
  title: 'R11 Track record: formatters print capacity and dates the way the guidelines write them',
  fn: () => {
    assertEqual(formatCapacity({ value: 691.2, unit: 'kWp' }), '691.20 kWp', 'Decimal capacity');
    assertEqual(formatCapacity({ value: 3900, unit: 'chargers' }), '3,900 chargers', 'Indian digit grouping');
    assertEqual(formatProjectDate({ year: 2025, month: 3 }), 'March 2025', 'Month and year');
    assertEqual(formatProjectDate({ year: 2016 }), '2016', 'Year only');
    assertEqual(formatProjectDate(undefined), '', 'No date');
  },
});
