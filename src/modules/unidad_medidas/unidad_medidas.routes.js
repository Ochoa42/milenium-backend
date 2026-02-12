import express from 'express';
import * as unidadMedidasController from './unidad_medidas.controller.js';
import { validateCreateUnidadMedida, validateUpdateUnidadMedida, checkUnidadMedidaExists } from './unidad_medidas.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
    .get(unidadMedidasController.findAll)
    .post(sanitizeInput, validateCreateUnidadMedida, unidadMedidasController.create);

router.route('/:id')
    .get(checkUnidadMedidaExists, unidadMedidasController.findOne)
    .put(sanitizeInput, checkUnidadMedidaExists, validateUpdateUnidadMedida, unidadMedidasController.update)
    .delete(checkUnidadMedidaExists, unidadMedidasController.remove);

export default router;
