import { createEmpleadoSchema, updateEmpleadoSchema } from './empleados.schema.js';
import * as empleadosService from './empleados.service.js';
import { z } from 'zod';

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

export const checkEmpleadoExists = async (req, res, next) => {
  const { id } = req.params;
  const empleado = await empleadosService.findEmpleadoById(id);
  if (!empleado) {
    return res.status(404).json({
      status: 'error',
      message: `El empleado con ID ${id} no fue encontrado.`,
    });
  }
  req.empleado = empleado;
  next();
};

export const validateCreateEmpleado = validateRequest(createEmpleadoSchema);
export const validateUpdateEmpleado = validateRequest(updateEmpleadoSchema);
