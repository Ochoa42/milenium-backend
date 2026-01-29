import express from 'express';
import * as zonasController from './zonas.controller.js';
import { validateCreateZona, validateUpdateZona, checkZonaExists } from './zonas.middleware.js';
import { jwtAuth } from '../auth/auth.middleware.js';

const router = express.Router();

router.use(jwtAuth)
router.route('/')
  .get(zonasController.zonaListFull)
  .post(validateCreateZona, zonasController.create);

router.route('/:id')
  .get(zonasController.findOne)
  .put(checkZonaExists, validateUpdateZona, zonasController.update)
  .delete(checkZonaExists, zonasController.remove);

export default router;
