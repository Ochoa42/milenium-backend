import { createProductoSchema, updateProductoSchema } from './productos.schema.js';
import * as productosService from './productos.service.js';
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

export const checkProductoExists = async (req, res, next) => {
    const { id } = req.params;
    const producto = await productosService.findProductoById(id);
    if (!producto) {
        return res.status(404).json({
            status: 'error',
            message: `El producto con ID ${id} no fue encontrado.`,
        });
    }
    req.producto = producto;
    next();
};

export const validateCreateProducto = validateRequest(createProductoSchema);
export const validateUpdateProducto = validateRequest(updateProductoSchema);
