import { z } from 'zod';

const empleadoSchema = z.object({
  usuario_id: z.string().uuid('ID de usuario inválido.').optional().nullable(),
  ci: z.string().min(7, 'La cédula debe tener al menos 7 caracteres.'),
  fecha_nacimiento: z.coerce.date(),
  fecha_contratacion: z.coerce.date(),
  salario_base: z.number().positive('El salario base debe ser un número positivo.'),
  direccion: z.string().optional(),
  nombre: z.string().min(2, 'El nombre es requerido.'),
  apellido_paterno: z.string().min(2, 'El apellido es requerido.'),
  apellido_materno: z.string().optional(),
  cargo: z.string().optional(),
  telefono: z.string().optional(),

  usuario: z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
    name_user: z.string().min(3, 'Nombre de usuario requerido'),
    rol_id: z.string().uuid('Rol ID inválido')
  }).optional()
});

export const createEmpleadoSchema = empleadoSchema;
export const updateEmpleadoSchema = empleadoSchema.partial();