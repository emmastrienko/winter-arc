import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { myBind, myObjectCreate } = mod;

describe('Day 09: this & Prototypes', () => {
  it('binds this context and curries arguments', () => {
    function calculate(this: { base: number }, multiplier: number, addition: number) {
      return this.base * multiplier + addition;
    }
    const ctx = { base: 10 };
    const bound = myBind(calculate, ctx, 2);
    expect(bound(5)).toBe(25);
  });

  it('delegates property lookups via myObjectCreate', () => {
    const parent = { role: 'admin', canEdit: true };
    const child = myObjectCreate(parent) as typeof parent;
    expect(child.role).toBe('admin');
    expect(Object.getPrototypeOf(child)).toBe(parent);
    expect(child.hasOwnProperty('role')).toBe(false);
  });
});
