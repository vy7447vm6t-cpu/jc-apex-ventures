export class TestRegistry {
  constructor() {
    this.tests = [];
  }

  register(testDef) {
    if (!testDef.id || !testDef.title || typeof testDef.fn !== 'function') {
      throw new Error(`Invalid test definition: ${JSON.stringify(testDef)}`);
    }
    this.tests.push({
      id: testDef.id,
      tier: testDef.tier || 'unknown',
      feature: testDef.feature || 'general',
      title: testDef.title,
      fn: testDef.fn,
    });
  }

  getTests() {
    return this.tests;
  }

  filter(options = {}) {
    let result = [...this.tests];
    if (options.tier) {
      const targetTier = String(options.tier).toLowerCase();
      result = result.filter(t => t.tier.toLowerCase() === targetTier || t.tier.toLowerCase() === `tier${targetTier}` || t.tier.toLowerCase().includes(targetTier));
    }
    if (options.feature) {
      const targetFeature = String(options.feature).toLowerCase();
      result = result.filter(t => t.feature.toLowerCase() === targetFeature || t.feature.toLowerCase().includes(targetFeature));
    }
    if (options.keyword) {
      const kw = String(options.keyword).toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(kw) || t.id.toLowerCase().includes(kw));
    }
    return result;
  }
}

export const registry = new TestRegistry();

export function test(def) {
  registry.register(def);
}
