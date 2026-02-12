import { z } from 'zod';

const productoSchema = z.object({
    codigo_barras: z.string().optional().nullable(),
    nombre_comercial: z.string().min(2, 'El nombre comercial debe tener al menos 2 caracteres.'),
    id_categoria: z.string().uuid('ID de categoría inválido.'),
    id_marca: z.string().uuid('ID de marca inválido.'),
    id_unidad_base: z.string().uuid('ID de unidad base inválido.'),
    stock_minimo: z.number().int().nonnegative().default(0),
    maneja_vencimiento: z.boolean().default(false),
    maneja_serie: z.boolean().default(false),
    imagen_url: z.string().url('URL de imagen inválida').optional().nullable(),
    estado: z.boolean().default(true),
});

export const createProductoSchema = productoSchema;
export const updateProductoSchema = productoSchema.partial();
