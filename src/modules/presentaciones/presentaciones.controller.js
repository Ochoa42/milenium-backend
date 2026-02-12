import asyncHandler from '../../utils/asyncHandler.js';
import * as presentacionesService from './presentaciones.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
    const result = await presentacionesService.findAllPresentaciones(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const findOne = asyncHandler(async (req, res, next) => {
    const { presentacion } = req;
    res.status(200).json({ status: 'success', data: presentacion });
});

export const create = asyncHandler(async (req, res, next) => {
    const newPresentacion = await presentacionesService.createPresentacion(req.body);
    res.status(201).json({ status: 'success', data: newPresentacion });
});

export const update = asyncHandler(async (req, res, next) => {
    const updatedPresentacion = await presentacionesService.updatePresentacion(req.presentacion, req.body);
    res.status(200).json({ status: 'success', data: updatedPresentacion });
});

export const remove = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await presentacionesService.deletePresentacion(id);
    res.status(204).send();
});
