import { createUnidadMedidaSchema, updateUnidadMedidaSchema } from './unidad_medidas.schema.js';
import * as unidadMedidasService from './unidad_medidas.service.js';
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

export const checkUnidadMedidaExists = async (req, res, next) => {
    const { id } = req.params;
    const unidadMedida = await unidadMedidasService.findUnidadMedidaById(id);
    if (!unidadMedida) {
        return res.status(404).json({
            status: 'error',
            message: `La unidad de medida con ID ${id} no fue encontrada.`,
        });
    }
    req.unidadMedida = unidadMedida;
    next();
};

export const validateCreateUnidadMedida = validateRequest(createUnidadMedidaSchema);
export const validateUpdateUnidadMedida = validateRequest(updateUnidadMedidaSchema);
