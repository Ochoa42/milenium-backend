import { z } from 'zod';

const presentacionSchema = z.object({
    id_producto: z.string().uuid('ID de producto inválido.'),
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
    factor_conversion: z.number().positive('El factor de conversión debe ser positivo.'),
    precio_especial: z.number().nonnegative('El precio especial debe ser positivo.'),
    esta_activo: z.boolean().default(true),
});

export const createPresentacionSchema = presentacionSchema;
export const updatePresentacionSchema = presentacionSchema.partial();
