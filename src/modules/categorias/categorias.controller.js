import asyncHandler from '../../utils/asyncHandler.js';
import * as categoriasService from './categorias.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
    const result = await categoriasService.findAllCategorias(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const findOne = asyncHandler(async (req, res, next) => {
    const { categoria } = req;
    res.status(200).json({ status: 'success', data: categoria });
});

export const create = asyncHandler(async (req, res, next) => {
    const newCategoria = await categoriasService.createCategoria(req.body);
    res.status(201).json({ status: 'success', data: newCategoria });
});

export const update = asyncHandler(async (req, res, next) => {
    const updatedCategoria = await categoriasService.updateCategoria(req.categoria, req.body);
    res.status(200).json({ status: 'success', data: updatedCategoria });
});

export const remove = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await categoriasService.deleteCategoria(id);
    res.status(204).send();
});
