import { z } from 'zod';

const unidadMedidaSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
    abreviatura: z.string().min(1, 'La abreviatura es requerida.'),
    esta_activo: z.boolean().optional(),
});

export const createUnidadMedidaSchema = unidadMedidaSchema;
export const updateUnidadMedidaSchema = unidadMedidaSchema.partial();
