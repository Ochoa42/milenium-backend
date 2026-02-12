import { z } from 'zod';

const ubicacionSchema = z.object({
    nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
    descripcion: z.string().optional(),
    tipo_area: z.enum(['Venta', 'Deposito', 'Merma'], {
        errorMap: () => ({ message: 'El tipo de área debe ser Venta, Deposito o Merma.' })
    }),
    esta_activo: z.boolean().optional(),
});

export const createUbicacionSchema = ubicacionSchema;
export const updateUbicacionSchema = ubicacionSchema.partial();
