import { z } from 'zod';

const marcaSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
    descripcion: z.string().optional(),
    esta_activo: z.boolean().optional(),
});

export const createMarcaSchema = marcaSchema;
export const updateMarcaSchema = marcaSchema.partial();
