import express from 'express';
import * as stockDistribucionController from './stock_distribucion.controller.js';
import { validateCreateStockDistribucion, validateUpdateStockDistribucion, checkStockDistribucionExists } from './stock_distribucion.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.get('/total/:id_producto', stockDistribucionController.getTotalStock);

router.route('/')
    .get(stockDistribucionController.findAll)
    .post(sanitizeInput, validateCreateStockDistribucion, stockDistribucionController.create);

router.route('/:id')
    .get(checkStockDistribucionExists, stockDistribucionController.findOne)
    .put(sanitizeInput, checkStockDistribucionExists, validateUpdateStockDistribucion, stockDistribucionController.update)
    .delete(checkStockDistribucionExists, stockDistribucionController.remove);

export default router;
