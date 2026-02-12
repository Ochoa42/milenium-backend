import { createProductoSerieSchema, updateProductoSerieSchema } from './productos_series.schema.js';
import * as productosSeriesService from './productos_series.service.js';
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

export const checkProductoSerieExists = async (req, res, next) => {
    const { id } = req.params;
    const productoSerie = await productosSeriesService.findProductoSerieById(id);
    if (!productoSerie) {
        return res.status(404).json({
            status: 'error',
            message: `El registro de serie con ID ${id} no fue encontrado.`,
        });
    }
    req.productoSerie = productoSerie;
    next();
};

export const validateCreateProductoSerie = validateRequest(createProductoSerieSchema);
export const validateUpdateProductoSerie = validateRequest(updateProductoSerieSchema);
