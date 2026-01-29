import asyncHandler from '../../utils/asyncHandler.js';
import * as roleService from './roles.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
  const roles = await roleService.findAllRoles();
  res.status(200).json({ status: 'success', data: roles });
});

export const findOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const role = await roleService.findRoleById(id);
  if (!role) {
     return res.status(404).json({
      status: 'error',
      message: `El rol con ID ${id} no fue encontrado.`,
    });
  }
  res.status(200).json({ status: 'success', data: role });
});

export const create = asyncHandler(async (req, res, next) => {
  const newRole = await roleService.createRole(req.body);
  res.status(201).json({ status: 'success', data: newRole });
});

export const update = asyncHandler(async (req, res, next) => {
  const updatedRole = await roleService.updateRole(req.role, req.body);
  res.status(200).json({ status: 'success', data: updatedRole });
});

export const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await roleService.deleteRole(id);
  res.status(204).send(); // 204 No Content
});