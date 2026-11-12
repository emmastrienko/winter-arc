import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { validateSessionToken } = mod;

describe('Day 43: Next.js Auth Session Validation', () => {
  it('validates authentic session token signature', () => {
    const payload = Buffer.from(
      JSON.stringify({ sub: 'user_123', role: 'admin', exp: Date.now() + 10000 })
    ).toString('base64');
    const header = 'eyJhbGciOiJIUzI1NiJ9';
    const secret = 'super-secret';
    const sig = `${header}_${payload}_${secret}`;
    const token = `${header}.${payload}.${sig}`;

    const session = validateSessionToken(token, secret);
    expect(session).toEqual({ user: 'user_123', role: 'admin' });
  });

  it('rejects tampered or malformed tokens', () => {
    expect(validateSessionToken('invalid.token', 'secret')).toBeNull();
    expect(validateSessionToken('a.b.c', 'wrong-secret')).toBeNull();
  });
});
