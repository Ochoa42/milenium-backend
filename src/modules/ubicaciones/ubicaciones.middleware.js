import { createUbicacionSchema, updateUbicacionSchema } from './ubicaciones.schema.js';
import * as ubicacionesService from './ubicaciones.service.js';
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

export const checkUbicacionExists = async (req, res, next) => {
    const { id } = req.params;
    const ubicacion = await ubicacionesService.findUbicacionById(id);
    if (!ubicacion) {
        return res.status(404).json({
            status: 'error',
            message: `La ubicación con ID ${id} no fue encontrada.`,
        });
    }
    req.ubicacion = ubicacion;
    next();
};

export const validateCreateUbicacion = validateRequest(createUbicacionSchema);
export const validateUpdateUbicacion = validateRequest(updateUbicacionSchema);
