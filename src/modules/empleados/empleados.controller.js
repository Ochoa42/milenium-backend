import asyncHandler from '../../utils/asyncHandler.js';
import * as empleadosService from './empleados.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
  const empleados = await empleadosService.findAllEmpleadoFull(req.query);
  res.status(200).json({ status: 'success', data: empleados });
});

export const findOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const empleado = await empleadosService.findEmpleadoById(id);
  if (!empleado) {
    return res.status(404).json({
      status: 'error',
      message: `El empleado con ID ${id} no fue encontrado.`,
    });
  }
  res.status(200).json({ status: 'success', data: empleado });
});

export const create = asyncHandler(async (req, res, next) => {
  const newEmpleado = await empleadosService.createEmpleado(req.body);
  res.status(201).json({ status: 'success', data: newEmpleado });
});

export const update = asyncHandler(async (req, res, next) => {
  const updatedEmpleado = await empleadosService.updateEmpleado(req.empleado, req.body);
  res.status(200).json({ status: 'success', data: updatedEmpleado });
});

export const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await empleadosService.deleteEmpleado(id);
  res.status(204).send();
});
