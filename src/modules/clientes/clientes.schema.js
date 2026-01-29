import { z } from 'zod';

const clienteSchema = z.object({
  zona_id: z.string().uuid('ID de zona inválido.'),
  nombre: z.string().min(3, { message: 'minimo como 3 caracteres' }),
  apellido_paterno: z.string()
    .max(50, { message: 'no puede tener más de 50 caracteres' }),
  apellido_materno: z.string()
    .max(50, { message: 'no puede tener más de 50 caracteres' })
    .optional(),
  telefono: z.string()
    .max(20, { message: 'no puede tener más de 20 caracteres' })
    .optional(),
  direccion: z.preprocess(
    (val) => (val === '' || val === 'undefined' || val === undefined ? null : val),
    z.string().max(1000, { message: 'no puede tener más de 1000 caracteres' }).nullable()
  ),
  puntos: z.number({
    invalid_type_error: 'Requiere dato de tipo entero',
  }).optional(),

  correo_electronico: z
    .string()
    .email('El correo electrónico no es válido')
    .max(100, 'El correo no puede superar los 100 caracteres')
    .nullable()
    .optional(),

  tipo_cliente: z
    .enum(['MAY', 'MIN'], {
      required_error: 'El tipo de cliente es obligatorio',
      invalid_type_error: 'El tipo de cliente debe ser MAY o MIN',
    })
    .default('MIN'),

  fecha_nacimiento: z.preprocess(
    (val) => (typeof val === 'string' || val instanceof Date ? new Date(val) : val),
    z.date({
      required_error: 'La fecha de nacimiento es obligatoria',
      invalid_type_error: 'La fecha de nacimiento debe ser una fecha válida',
    })
  ),

  genero: z.preprocess(
    (val) => (val === 'null' || val === '' || val === 'undefined' || val === undefined ? null : val),
    z.enum(['M', 'F', 'O']).nullable().optional()
  ),
});

export const createClienteSchema = clienteSchema;
export const updateClienteSchema = clienteSchema.partial();