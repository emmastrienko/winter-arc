import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { MetadataRegistry, detectRuntime } = mod;

describe('Day 13: Memory & Runtimes', () => {
  it('stores metadata weakly on objects', () => {
    const registry = new MetadataRegistry<object, string>();
    const node = { id: 1 };
    registry.set(node, 'metadata-payload');
    expect(registry.has(node)).toBe(true);
    expect(registry.get(node)).toBe('metadata-payload');
  });

  it('accurately detects Node.js runtime environment', () => {
    expect(detectRuntime()).toBe('node');
  });
});
