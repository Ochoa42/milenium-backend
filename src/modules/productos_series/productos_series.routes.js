import express from 'express';
import * as productosSeriesController from './productos_series.controller.js';
import { validateCreateProductoSerie, validateUpdateProductoSerie, checkProductoSerieExists } from './productos_series.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
    .get(productosSeriesController.findAll)
    .post(sanitizeInput, validateCreateProductoSerie, productosSeriesController.create);

router.route('/:id')
    .get(checkProductoSerieExists, productosSeriesController.findOne)
    .put(sanitizeInput, checkProductoSerieExists, validateUpdateProductoSerie, productosSeriesController.update)
    .delete(checkProductoSerieExists, productosSeriesController.remove);

export default router;
