import express from 'express';
import * as productosController from './productos.controller.js';
import { validateCreateProducto, validateUpdateProducto, checkProductoExists } from './productos.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
    .get(productosController.findAll)
    .post(sanitizeInput, validateCreateProducto, productosController.create);

router.route('/:id')
    .get(checkProductoExists, productosController.findOne)
    .put(sanitizeInput, checkProductoExists, validateUpdateProducto, productosController.update)
    .delete(checkProductoExists, productosController.remove);

export default router;
