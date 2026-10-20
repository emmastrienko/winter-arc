import { z } from 'zod';

export const ProductSchema = z.object({
  title: z.string().min(3),
  price: z.number().positive(),
  inStock: z.boolean().default(true),
});

export type Product = z.infer<typeof ProductSchema>;

export function validateProduct(data: unknown): Product {
  return ProductSchema.parse(data);
}
