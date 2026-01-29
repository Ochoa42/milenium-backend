import { z } from 'zod';

const zonaSchema = z.object({
  nombre: z.string().min(3, 'El nombre de la zona es requerido.'),
  provincia: z.string().optional(),
});

export const createZonaSchema = zonaSchema;
export const updateZonaSchema = zonaSchema.partial();