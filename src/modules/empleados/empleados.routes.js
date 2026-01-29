import express from 'express';
import * as empleadosController from './empleados.controller.js';
import { validateCreateEmpleado, validateUpdateEmpleado, checkEmpleadoExists } from './empleados.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
  .get(empleadosController.findAll)
  .post(sanitizeInput, validateCreateEmpleado, empleadosController.create);

router.route('/:id')
  .get(empleadosController.findOne)
  .put(sanitizeInput, checkEmpleadoExists, validateUpdateEmpleado, empleadosController.update)
  .delete(checkEmpleadoExists, empleadosController.remove);

export default router;
