import { createProveedorSchema, updateProveedorSchema } from './proveedores.schema.js';
import * as proveedoresService from './proveedores.service.js';
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
export const checkProveedorExists = async (req, res, next) => {
  const { id } = req.params;
  const proveedor = await proveedoresService.findProveedorById(id);
  if (!proveedor) {
    return res.status(404).json({
      status: 'error',
      message: `El proveedor con ID ${id} no fue encontrado.`,
    });
  }
  req.proveedor = proveedor; // Adjuntamos el rol encontrado al request para usarlo en el controlador
  next();
};

export const validateCreateProveedor = validateRequest(createProveedorSchema);
export const validateUpdateProveedor = validateRequest(updateProveedorSchema);
