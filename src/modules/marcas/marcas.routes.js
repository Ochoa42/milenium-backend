import express from 'express';
import * as marcasController from './marcas.controller.js';
import { validateCreateMarca, validateUpdateMarca, checkMarcaExists } from './marcas.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
    .get(marcasController.findAll)
    .post(sanitizeInput, validateCreateMarca, marcasController.create);

router.route('/:id')
    .get(checkMarcaExists, marcasController.findOne)
    .put(sanitizeInput, checkMarcaExists, validateUpdateMarca, marcasController.update)
    .delete(checkMarcaExists, marcasController.remove);

export default router;
