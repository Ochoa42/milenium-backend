import { createZonaSchema, updateZonaSchema } from './zonas.schema.js';
import * as zonasService from './zonas.service.js';
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
export const checkZonaExists = async (req, res, next) => {
  const { id } = req.params;
  const zona = await zonasService.findZonaById(id);
  if (!zona) {
    return res.status(404).json({
      status: 'error',
      message: `La zona con ID ${id} no fue encontrada.`,
    });
  }
  req.zona = zona; // Adjuntamos el rol encontrado al request para usarlo en el controlador
  next();
};

export const validateCreateZona = validateRequest(createZonaSchema);
export const validateUpdateZona = validateRequest(updateZonaSchema);
