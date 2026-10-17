import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { InMemoryRepository, pluck } = mod;

describe('Day 17: Generics Mastery', () => {
  it('manages generic entities in repository', async () => {
    interface Product { id: string; title: string; price: number }
    const repo = new InMemoryRepository<Product>();
    await repo.save({ id: 'p1', title: 'Laptop', price: 999 });

    const p = await repo.findById('p1');
    expect(p?.title).toBe('Laptop');
    const all = await repo.findAll();
    expect(all).toHaveLength(1);
  });

  it('safely extracts key properties with pluck', () => {
    const users = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    const names = pluck(users, 'name');
    expect(names).toEqual(['Alice', 'Bob']);
  });
});
