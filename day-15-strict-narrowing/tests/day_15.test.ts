import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { isString, isRecord, assertNever } = mod;

describe('Day 15: Type Narrowing', () => {
  it('correctly narrows strings', () => {
    expect(isString('test')).toBe(true);
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
  });

  it('correctly narrows plain objects', () => {
    expect(isRecord({ key: 'val' })).toBe(true);
    expect(isRecord([1, 2, 3])).toBe(false);
    expect(isRecord(null)).toBe(false);
  });

  it('assertNever throws runtime error for unexpected values', () => {
    expect(() => assertNever('bad' as never)).toThrow();
  });
});
