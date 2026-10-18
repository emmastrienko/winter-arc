import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { unwrapValue } = mod;

describe('Day 18: Conditional Types & infer', () => {
  it('unwraps values with unwrapValue', () => {
    expect(unwrapValue('hello')).toBe('hello');
    expect(unwrapValue(123)).toBe(123);
  });
});
