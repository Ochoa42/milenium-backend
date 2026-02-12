import asyncHandler from '../../utils/asyncHandler.js';
import * as lotesService from './lotes.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
    const result = await lotesService.findAllLotes(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const findOne = asyncHandler(async (req, res, next) => {
    const { lote } = req;
    res.status(200).json({ status: 'success', data: lote });
});

export const create = asyncHandler(async (req, res, next) => {
    const newLote = await lotesService.createLote(req.body);
    res.status(201).json({ status: 'success', data: newLote });
});

export const update = asyncHandler(async (req, res, next) => {
    const updatedLote = await lotesService.updateLote(req.lote, req.body);
    res.status(200).json({ status: 'success', data: updatedLote });
});

export const remove = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await lotesService.deleteLote(id);
    res.status(204).send();
});
