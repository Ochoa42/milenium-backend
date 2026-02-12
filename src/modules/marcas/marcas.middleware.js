import { createMarcaSchema, updateMarcaSchema } from './marcas.schema.js';
import * as marcasService from './marcas.service.js';
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

export const checkMarcaExists = async (req, res, next) => {
    const { id } = req.params;
    const marca = await marcasService.findMarcaById(id);
    if (!marca) {
        return res.status(404).json({
            status: 'error',
            message: `La marca con ID ${id} no fue encontrada.`,
        });
    }
    req.marca = marca;
    next();
};

export const validateCreateMarca = validateRequest(createMarcaSchema);
export const validateUpdateMarca = validateRequest(updateMarcaSchema);
