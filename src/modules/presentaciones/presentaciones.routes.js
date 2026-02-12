import express from 'express';
import * as presentacionesController from './presentaciones.controller.js';
import { validateCreatePresentacion, validateUpdatePresentacion, checkPresentacionExists } from './presentaciones.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
    .get(presentacionesController.findAll)
    .post(sanitizeInput, validateCreatePresentacion, presentacionesController.create);

router.route('/:id')
    .get(checkPresentacionExists, presentacionesController.findOne)
    .put(sanitizeInput, checkPresentacionExists, validateUpdatePresentacion, presentacionesController.update)
    .delete(checkPresentacionExists, presentacionesController.remove);

export default router;
