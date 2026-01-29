import { createUsuarioSchema, updateUsuarioSchema } from './usuarios.schema.js';
import * as usuariosService from './usuarios.service.js';
import * as roleService from '../roles/roles.service.js';
import * as empleadosService from '../empleados/empleados.service.js';
import { z } from 'zod';
import asyncHandler from '../../utils/asyncHandler.js';

// Middleware reutilizable para validar con Zod
export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: 'error',
        message: 'Error de validación',
        errors: error.errors,
      });
    }
    next(error);
  }
};

export const existNameUserAndRol = asyncHandler(async (req, res, next) => {
  const { name_user, rol_id } = req.body;
  const role = await roleService.findRoleById(rol_id);
  const name_userExists = await usuariosService.findUsuarioByName(name_user);
  if (name_userExists) {
    return res.status(409).json({
      status: 'error',
      message: `El nombre de usuario '${name_user}' ya está en uso.`,
    });
  }

  if (!role) {
    return res.status(404).json({
      status: 'error',
      message: `El rol con ID ${rol_id} no existe.`
    });
  }
  next();
});

export const checkEmailIsAvailable = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    const existingUser = await usuariosService.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: `El email '${email}' ya está en uso.`,
      });
    }
  }
  next();
});



// Middleware para verificar si un rol existe
export const checkUsuarioExists = async (req, res, next) => {
  const { id } = req.params;
  const usuario = await usuariosService.findUsuarioById(id);
  if (!usuario) {
    return res.status(404).json({
      status: 'error',
      message: `El usuario con ID ${id} no fue encontrado.`,
    });
  }
  req.usuario = usuario; // Adjuntamos el rol encontrado al request para usarlo en el controlador
  next();
};

export const validateCreateUsuario = validateRequest(createUsuarioSchema);
export const validateUpdateUsuario = validateRequest(updateUsuarioSchema);

