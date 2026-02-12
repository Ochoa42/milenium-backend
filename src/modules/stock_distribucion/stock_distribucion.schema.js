import { z } from 'zod';

const stockDistribucionSchema = z.object({
    id_lote: z.string().uuid('ID de lote inválido.'),
    id_ubicacion: z.string().uuid('ID de ubicación inválido.'),
    cantidad_actual: z.number().nonnegative('La cantidad debe ser no negativa.'),
});

export const createStockDistribucionSchema = stockDistribucionSchema;
export const updateStockDistribucionSchema = stockDistribucionSchema.partial();
