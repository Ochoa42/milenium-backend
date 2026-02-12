import asyncHandler from '../../utils/asyncHandler.js';
import * as ubicacionesService from './ubicaciones.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
    const result = await ubicacionesService.findAllUbicaciones(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const findOne = asyncHandler(async (req, res, next) => {
    const { ubicacion } = req;
    res.status(200).json({ status: 'success', data: ubicacion });
});

export const create = asyncHandler(async (req, res, next) => {
    const newUbicacion = await ubicacionesService.createUbicacion(req.body);
    res.status(201).json({ status: 'success', data: newUbicacion });
});

export const update = asyncHandler(async (req, res, next) => {
    const updatedUbicacion = await ubicacionesService.updateUbicacion(req.ubicacion, req.body);
    res.status(200).json({ status: 'success', data: updatedUbicacion });
});

export const remove = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await ubicacionesService.deleteUbicacion(id);
    res.status(204).send();
});
