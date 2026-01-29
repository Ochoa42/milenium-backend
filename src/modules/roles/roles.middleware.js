import { createRoleSchema, updateRoleSchema } from './roles.schema.js';
import db from '../../database/index.js'
import { z } from 'zod';

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

// Middleware para verificar si un rol existe
export const checkRoleExists = async (req, res, next) => {
  const { id } = req.params;
  const role = await db.Role.findByPk(id);
  if (!role) {
    return res.status(404).json({
      status: 'error',
      message: `El rol con ID ${id} no fue encontrado.`,
    });
  }
  req.role = role; // Adjuntamos el rol encontrado al request para usarlo en el controlador
  next();
};

export const validateCreateRole = validateRequest(createRoleSchema);
export const validateUpdateRole = validateRequest(updateRoleSchema);