import asyncHandler from '../../utils/asyncHandler.js';
import * as usuariosService from './usuarios.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
  const usuarios = await usuariosService.findAllUsuarios();
  res.status(200).json({ status: 'success', data: usuarios });
});

export const findOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const usuario = await usuariosService.findUsuarioById(id);
  if (!usuario) {
    return res.status(404).json({
      status: 'error',
      message: `El usuario con ID ${id} no fue encontrado.`,
    });
  }
  res.status(200).json({ status: 'success', data: usuario });
});

export const create = asyncHandler(async (req, res, next) => {
  const newUsuario = await usuariosService.createUsuario(req.body);
  // console.log("mi user",newUsuario)
  res.status(201).json({ status: 'success', data: newUsuario });
});

export const update = asyncHandler(async (req, res, next) => {
  const updatedUsuario = await usuariosService.updateUsuario(req.usuario, req.body);
  res.status(200).json({ status: 'success', data: updatedUsuario });
});

export const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await usuariosService.deleteUsuario(id);
  res.status(204).send(); // 204 No Content
});
