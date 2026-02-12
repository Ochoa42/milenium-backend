import asyncHandler from '../../utils/asyncHandler.js';
import * as unidadMedidasService from './unidad_medidas.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
    const result = await unidadMedidasService.findAllUnidadMedidas(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const findOne = asyncHandler(async (req, res, next) => {
    const { unidadMedida } = req;
    res.status(200).json({ status: 'success', data: unidadMedida });
});

export const create = asyncHandler(async (req, res, next) => {
    const newUnidadMedida = await unidadMedidasService.createUnidadMedida(req.body);
    res.status(201).json({ status: 'success', data: newUnidadMedida });
});

export const update = asyncHandler(async (req, res, next) => {
    const updatedUnidadMedida = await unidadMedidasService.updateUnidadMedida(req.unidadMedida, req.body);
    res.status(200).json({ status: 'success', data: updatedUnidadMedida });
});

export const remove = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await unidadMedidasService.deleteUnidadMedida(id);
    res.status(204).send();
});
