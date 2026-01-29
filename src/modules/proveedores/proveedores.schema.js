import { z } from 'zod';

const proveedorSchema = z.object({
  nombre: z.string().min(3, 'El nombre del proveedor es requerido.'),
  apellido_paterno: z.string().min(3, 'El apellido paterno del proveedor es requerido.'),
  apellido_materno: z.string().optional(),
  empresa: z.string().optional(),
  zona_id: z.string().uuid('ID de zona inválido.'),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});

export const createProveedorSchema = proveedorSchema;
export const updateProveedorSchema = proveedorSchema.partial();