import { z } from 'zod';

const productoSerieSchema = z.object({
    id_lote: z.string().uuid('ID de lote inválido.'),
    id_ubicacion: z.string().uuid('ID de ubicación inválido.').optional().nullable(),
    numero_serie: z.string().min(1, 'El número de serie es requerido.'),
    estado: z.enum(['Disponible', 'Vendido', 'Garantia']).default('Disponible'),
});

export const createProductoSerieSchema = productoSerieSchema;
export const updateProductoSerieSchema = productoSerieSchema.partial();
