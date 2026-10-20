import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { validateProduct } = mod;

describe('Day 20: Zod Runtime Validation', () => {
  it('parses valid product and applies defaults', () => {
    const product = validateProduct({ title: 'Mechanical Keyboard', price: 120 });
    expect(product.title).toBe('Mechanical Keyboard');
    expect(product.price).toBe(120);
    expect(product.inStock).toBe(true);
  });

  it('rejects invalid payloads with ZodError', () => {
    expect(() => validateProduct({ title: 'ab', price: -5 })).toThrow();
  });
});
