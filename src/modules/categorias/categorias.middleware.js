import { createCategoriaSchema, updateCategoriaSchema } from './categorias.schema.js';
import * as categoriasService from './categorias.service.js';
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

export const checkCategoriaExists = async (req, res, next) => {
    const { id } = req.params;
    const categoria = await categoriasService.findCategoriaById(id);
    if (!categoria) {
        return res.status(404).json({
            status: 'error',
            message: `La categoría con ID ${id} no fue encontrada.`,
        });
    }
    req.categoria = categoria;
    next();
};

export const validateCreateCategoria = validateRequest(createCategoriaSchema);
export const validateUpdateCategoria = validateRequest(updateCategoriaSchema);
