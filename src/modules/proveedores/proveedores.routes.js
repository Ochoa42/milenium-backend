import express from 'express';
import * as proveedoresController from './proveedores.controller.js';
import { validateCreateProveedor, validateUpdateProveedor, checkProveedorExists } from './proveedores.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
  .get(proveedoresController.findAllFull)
  .post(sanitizeInput, validateCreateProveedor, proveedoresController.create);

router.route('/:id')
  .get(proveedoresController.findOne)
  .put(sanitizeInput, checkProveedorExists, validateUpdateProveedor, proveedoresController.update)
  .delete(checkProveedorExists, proveedoresController.remove);

export default router;
