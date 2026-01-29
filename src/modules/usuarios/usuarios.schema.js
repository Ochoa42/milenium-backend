import { z } from 'zod';

const usuarioSchema = z.object({
  rol_id: z.string().uuid('ID de rol inválido.'),
  name_user: z.string().min(2, 'El nombre de usuario debe tener al menos 2 caracteres.'),
  email: z.string().email('El formato del email es inválido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  esta_activo: z.boolean().optional(),
});

// Para la actualización, la contraseña es opcional
const updateUsuarioSchema = usuarioSchema.partial();

export { usuarioSchema as createUsuarioSchema, updateUsuarioSchema };