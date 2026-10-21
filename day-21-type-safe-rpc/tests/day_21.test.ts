import { describe, it, expect } from 'vitest';
import { z } from 'zod';

const isSolution = process.env.WINTER_ARC_TEST_SOLUTION === '1';
const mod = isSolution
  ? await import('../solution/solution.ts')
  : await import('../exercises/exercise.ts');

const { createApiClient } = mod;

describe('Day 21: Type-Safe RPC Client', () => {
  it('validates input, invokes transport, and validates output', async () => {
    const routes = {
      getUser: {
        input: z.object({ id: z.string() }),
        output: z.object({ id: z.string(), name: z.string() }),
      },
    };

    const mockTransport = async (endpoint: string, data: any) => {
      return { id: data.id, name: 'Alice' };
    };

    const client = createApiClient(routes, mockTransport);
    const user = await client.call('getUser', { id: 'u1' });
    expect(user).toEqual({ id: 'u1', name: 'Alice' });
  });
});
