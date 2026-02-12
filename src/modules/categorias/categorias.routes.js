import express from 'express';
import * as categoriasController from './categorias.controller.js';
import { validateCreateCategoria, validateUpdateCategoria, checkCategoriaExists } from './categorias.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
    .get(categoriasController.findAll)
    .post(sanitizeInput, validateCreateCategoria, categoriasController.create);

router.route('/:id')
    .get(checkCategoriaExists, categoriasController.findOne)
    .put(sanitizeInput, checkCategoriaExists, validateUpdateCategoria, categoriasController.update)
    .delete(checkCategoriaExists, categoriasController.remove);

export default router;
