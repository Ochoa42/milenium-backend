import express from 'express';
import * as lotesController from './lotes.controller.js';
import { validateCreateLote, validateUpdateLote, checkLoteExists } from './lotes.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
    .get(lotesController.findAll)
    .post(sanitizeInput, validateCreateLote, lotesController.create);

router.route('/:id')
    .get(checkLoteExists, lotesController.findOne)
    .put(sanitizeInput, checkLoteExists, validateUpdateLote, lotesController.update)
    .delete(checkLoteExists, lotesController.remove);

export default router;
