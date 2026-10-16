import { describe, it, expect } from 'vitest';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { processPayment } = mod;

describe('Day 16: Discriminated Unions', () => {
  it('correctly processes card payments', () => {
    const res = processPayment({ type: 'card', cardNumber: '1234567812349999', cvv: '999' });
    expect(res).toBe('Charged card ending in 9999');
  });

  it('correctly processes crypto payments', () => {
    const res = processPayment({ type: 'crypto', walletAddress: '0xABC', token: 'ETH' });
    expect(res).toBe('Sent ETH to wallet 0xABC');
  });

  it('correctly processes bank payments', () => {
    const res = processPayment({ type: 'bank', accountNumber: 'ACCT100', routingNumber: 'ROUT200' });
    expect(res).toBe('Debited bank account ACCT100');
  });
});
