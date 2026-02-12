import asyncHandler from '../../utils/asyncHandler.js';
import * as marcasService from './marcas.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
    const result = await marcasService.findAllMarcas(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const findOne = asyncHandler(async (req, res, next) => {
    const { marca } = req;
    res.status(200).json({ status: 'success', data: marca });
});

export const create = asyncHandler(async (req, res, next) => {
    const newMarca = await marcasService.createMarca(req.body);
    res.status(201).json({ status: 'success', data: newMarca });
});

export const update = asyncHandler(async (req, res, next) => {
    const updatedMarca = await marcasService.updateMarca(req.marca, req.body);
    res.status(200).json({ status: 'success', data: updatedMarca });
});

export const remove = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await marcasService.deleteMarca(id);
    res.status(204).send();
});
