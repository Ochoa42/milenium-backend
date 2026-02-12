import express from 'express';
import * as ubicacionesController from './ubicaciones.controller.js';
import { validateCreateUbicacion, validateUpdateUbicacion, checkUbicacionExists } from './ubicaciones.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
    .get(ubicacionesController.findAll)
    .post(sanitizeInput, validateCreateUbicacion, ubicacionesController.create);

router.route('/:id')
    .get(checkUbicacionExists, ubicacionesController.findOne)
    .put(sanitizeInput, checkUbicacionExists, validateUpdateUbicacion, ubicacionesController.update)
    .delete(checkUbicacionExists, ubicacionesController.remove);

export default router;
