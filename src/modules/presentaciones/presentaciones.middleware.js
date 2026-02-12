import { createPresentacionSchema, updatePresentacionSchema } from './presentaciones.schema.js';
import * as presentacionesService from './presentaciones.service.js';
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

export const checkPresentacionExists = async (req, res, next) => {
    const { id } = req.params;
    const presentacion = await presentacionesService.findPresentacionById(id);
    if (!presentacion) {
        return res.status(404).json({
            status: 'error',
            message: `La presentación con ID ${id} no fue encontrada.`,
        });
    }
    req.presentacion = presentacion;
    next();
};

export const validateCreatePresentacion = validateRequest(createPresentacionSchema);
export const validateUpdatePresentacion = validateRequest(updatePresentacionSchema);
