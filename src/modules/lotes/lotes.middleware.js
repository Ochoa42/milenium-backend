import { createLoteSchema, updateLoteSchema } from './lotes.schema.js';
import * as lotesService from './lotes.service.js';
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

export const checkLoteExists = async (req, res, next) => {
    const { id } = req.params;
    const lote = await lotesService.findLoteById(id);
    if (!lote) {
        return res.status(404).json({
            status: 'error',
            message: `El lote con ID ${id} no fue encontrado.`,
        });
    }
    req.lote = lote;
    next();
};

export const validateCreateLote = validateRequest(createLoteSchema);
export const validateUpdateLote = validateRequest(updateLoteSchema);
