import { z } from 'zod';
export const galleryItemSchema = z.object({ body: z.object({ title: z.string().min(2), description: z.string().optional(), imageUrl: z.string().url() }) });
