import asyncHandler from '../../utils/asyncHandler.js';
import * as proveedoresService from './proveedores.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
  const proveedores = await proveedoresService.findAllProveedores();
  res.status(200).json({ status: 'success', data: proveedores });
});

export const findOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const proveedor = await proveedoresService.findProveedorById(id);
  if (!proveedor) {
     return res.status(404).json({
      status: 'error',
      message: `El proveedor con ID ${id} no fue encontrado.`,
    });
  }
  res.status(200).json({ status: 'success', data: proveedor });
});

export const create = asyncHandler(async (req, res, next) => {
  const newProveedor = await proveedoresService.createProveedor(req.body);
  res.status(201).json({ status: 'success', data: newProveedor });
});

export const update = asyncHandler(async (req, res, next) => {
  const updatedProveedor = await proveedoresService.updateProveedor(req.proveedor, req.body);
  res.status(200).json({ status: 'success', data: updatedProveedor });
});

export const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await proveedoresService.deleteProveedor(id);
  res.status(204).send(); 
});

export const findAllFull = asyncHandler(async (req, res, next) => {
  const data = await proveedoresService.findAllProveedorFull(req.query);
  res.status(200).json({
    status: 'success',
    data: data,
  });

});