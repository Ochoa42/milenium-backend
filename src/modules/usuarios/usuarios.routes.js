import express from 'express';
import * as usuariosController from './usuarios.controller.js';
import { validateCreateUsuario, validateUpdateUsuario, checkUsuarioExists, existNameUserAndRol, checkEmailIsAvailable } from './usuarios.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
  .get(usuariosController.findAll)
  .post(sanitizeInput, validateCreateUsuario, existNameUserAndRol, checkEmailIsAvailable, usuariosController.create);

router.route('/:id')
  .get(usuariosController.findOne)
  .put(sanitizeInput, checkUsuarioExists, validateUpdateUsuario, usuariosController.update)
  .delete(checkUsuarioExists, usuariosController.remove);

export default router;
