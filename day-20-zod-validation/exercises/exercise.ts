import { z } from 'zod';

export const ProductSchema = z.object({
  // TODO: title (min 3 chars), price (positive), inStock (boolean, default true)
  title: z.string().min(3),
  price: z.number().positive(),
  inStock: z.boolean().default(true)
});

export type Product = z.infer<typeof ProductSchema>;

export function validateProduct(data: unknown): Product {
  // TODO: Implement parse and return data
  return ProductSchema.parse(data);
}
