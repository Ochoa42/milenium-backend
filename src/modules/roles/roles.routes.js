import express from 'express';
import * as roleController from './roles.controller.js';
import { validateCreateRole, validateUpdateRole, checkRoleExists } from './roles.middleware.js';
import { sanitizeInput } from '../../middlewares/sanitizer.middleware.js';

const router = express.Router();

router.route('/')
  .get(roleController.findAll)
  .post(sanitizeInput, validateCreateRole, roleController.create);

router.route('/:id')
  .get(roleController.findOne)
  .put(sanitizeInput, checkRoleExists, validateUpdateRole, roleController.update)
  .delete(checkRoleExists, roleController.remove);

export default router;