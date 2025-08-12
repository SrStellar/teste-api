import { z } from 'zod';
export const createAppointmentSchema = z.object({ body: z.object({ barberId: z.number(), serviceIds: z.array(z.number()).min(1), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), time: z.string().regex(/^\d{2}:\d{2}$/), notes: z.string().optional() }) });
export const availabilityQuerySchema = z.object({ query: z.object({ barberId: z.string().regex(/^\d+$/), date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }) });
