import { createClienteSchema, updateClienteSchema  } from './clientes.schema.js';
import * as clientesService from './clientes.service.js';
import { z } from 'zod';

export const validateRequest = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      return res.status(400).json({
        status: 'error',
        message: 'Error de validación',
        errors: formattedErrors,
      });
    }
    next(error);
  }
};

export const checkClienteExists = async (req, res, next) => {
  const { id } = req.params;
  const cliente = await clientesService.findClienteById(id);
  if (!cliente) {
    return res.status(404).json({
      status: 'error',
      message: `El cliente con ID ${id} no fue encontrado.`,
    });
  }
  req.cliente = cliente; 
  next();
};

export const existCiClient = async (req, res, next)=> {
  const {ci} = req.body;
  const cliente = await clientesService.findOneClientCi(ci)
  if(cliente){
    return res.status(409).json({
      status: 'error',
      message: 'El cliente ya existe',
    });
  }
  next();
}

export const validateCreateCliente = validateRequest(createClienteSchema);
export const validateUpdateCliente = validateRequest(updateClienteSchema);
