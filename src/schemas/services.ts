import { z } from 'zod';
export const createCategorySchema = z.object({ body: z.object({ name: z.string().min(2) }) });
export const updateCategorySchema = z.object({ body: z.object({ name: z.string().min(2) }) });
export const createServiceSchema = z.object({ body: z.object({ categoryId: z.number(), name: z.string().min(2), price: z.number().nonnegative() }) });
export const updateServiceSchema = z.object({ body: z.object({ name: z.string().min(2).optional(), price: z.number().nonnegative().optional() }) });