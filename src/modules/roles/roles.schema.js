import { z } from 'zod';

const roleSchema = z.object({
  nombre_rol: z.string({
    required_error: 'El nombre del rol es requerido.',
  }).min(3, 'El nombre del rol debe tener al menos 3 caracteres.'),
  
  descripcion: z.string().optional(),
});

export const createRoleSchema = roleSchema;
export const updateRoleSchema = roleSchema.partial();