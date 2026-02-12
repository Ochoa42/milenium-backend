import { z } from 'zod';

const loteSchema = z.object({
    id_producto: z.string().uuid('ID de producto inválido.'),
    id_proveedor: z.string().uuid('ID de proveedor inválido.'),
    codigo_lote: z.string().min(1, 'El código de lote es requerido.'),
    costo_compra_unitario: z.number().nonnegative('El costo debe ser positivo.'),
    precio_venta_sugerido: z.number().nonnegative().optional().nullable(),
    fecha_vencimiento: z.coerce.date().optional().nullable(),
    fecha_ingreso: z.coerce.date().default(() => new Date()),
});

export const createLoteSchema = loteSchema;
export const updateLoteSchema = loteSchema.partial();
