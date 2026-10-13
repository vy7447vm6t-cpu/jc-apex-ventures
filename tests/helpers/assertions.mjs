export const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
};

export class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

export function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new AssertionError(message, condition, true);
  }
}

export function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    const msg = message || `Expected ${JSON.stringify(actual)} to equal ${JSON.stringify(expected)}`;
    throw new AssertionError(msg, actual, expected);
  }
}

export function assertNotEqual(actual, expected, message) {
  if (actual === expected) {
    const msg = message || `Expected ${JSON.stringify(actual)} to not equal ${JSON.stringify(expected)}`;
    throw new AssertionError(msg, actual, expected);
  }
}

export function assertMatch(str, regex, message) {
  if (typeof str !== 'string' || !regex.test(str)) {
    const msg = message || `Expected string to match ${regex.toString()}`;
    throw new AssertionError(msg, str, regex.toString());
  }
}

export function assertNotMatch(str, regex, message) {
  if (typeof str === 'string' && regex.test(str)) {
    const msg = message || `Expected string NOT to match ${regex.toString()}`;
    throw new AssertionError(msg, str, `Not ${regex.toString()}`);
  }
}

export function assertIncludes(haystack, needle, message) {
  if (!haystack || !haystack.includes(needle)) {
    const msg = message || `Expected haystack to include ${JSON.stringify(needle)}`;
    throw new AssertionError(msg, haystack ? haystack.slice(0, 100) : haystack, needle);
  }
}

export function assertNotIncludes(haystack, needle, message) {
  if (haystack && haystack.includes(needle)) {
    const msg = message || `Expected haystack NOT to include ${JSON.stringify(needle)}`;
    throw new AssertionError(msg, 'Found forbidden needle', needle);
  }
}

export function assertInRange(val, min, max, message) {
  if (typeof val !== 'number' || val < min || val > max) {
    const msg = message || `Expected ${val} to be between ${min} and ${max}`;
    throw new AssertionError(msg, val, `[${min}, ${max}]`);
  }
}

export function assertCloseTo(actual, expected, delta = 0.01, message) {
  if (Math.abs(actual - expected) > delta) {
    const msg = message || `Expected ${actual} to be close to ${expected} (±${delta})`;
    throw new AssertionError(msg, actual, expected);
  }
}
