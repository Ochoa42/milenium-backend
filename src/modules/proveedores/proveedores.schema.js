import { z } from 'zod';

const proveedorSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  apellido_paterno: z.string().min(2, 'El apellido paterno debe tener al menos 2 caracteres.'), // Assuming we keep this based on existing model
  apellido_materno: z.string().optional().nullable(),
  nit_ci: z.string().optional(),
  razon_social: z.string().optional(),
  contacto: z.string().optional(),
  // empresa: z.string().optional(), // Keeping existing field if needed, but user didn't explicitly ask to remove it, just added others.
  zona_id: z.string().uuid('ID de zona inválido.'),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  esta_activo: z.boolean().optional(),
});

export const createProveedorSchema = proveedorSchema;
export const updateProveedorSchema = proveedorSchema.partial();