import express from 'express';
import * as clientesController from './clientes.controller.js';
import { validateCreateCliente, validateUpdateCliente, checkClienteExists, existCiClient} from './clientes.middleware.js';

const router = express.Router();

router.route('/')
  // .get(clientesController.findAll)
  .get(clientesController.clientListFull)
  .post(existCiClient,validateCreateCliente, clientesController.create);

router.route('/:id')
  .get(clientesController.findOne)
  .put(checkClienteExists, validateUpdateCliente, clientesController.update)
  .delete(checkClienteExists, clientesController.remove);

export default router;