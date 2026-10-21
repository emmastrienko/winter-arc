import { z } from 'zod';

export function createApiClient<
  TRoutes extends Record<string, { input: z.ZodTypeAny; output: z.ZodTypeAny }>
>(routes: TRoutes, transport: (endpoint: string, data: any) => Promise<any>) {
  return {
    async call<K extends keyof TRoutes & string>(
      endpoint: K,
      input: z.infer<TRoutes[K]['input']>
    ): Promise<z.infer<TRoutes[K]['output']>> {
      const route = routes[endpoint];
      if (!route) {
        throw new Error(`Endpoint not found: ${endpoint}`);
      }
      const validatedInput = route.input.parse(input);
      const rawResult = await transport(endpoint, validatedInput);
      return route.output.parse(rawResult);
    },
  };
}
