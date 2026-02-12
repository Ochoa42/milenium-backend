import asyncHandler from '../../utils/asyncHandler.js';
import * as productosSeriesService from './productos_series.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
    const result = await productosSeriesService.findAllProductosSeries(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const findOne = asyncHandler(async (req, res, next) => {
    const { productoSerie } = req;
    res.status(200).json({ status: 'success', data: productoSerie });
});

export const create = asyncHandler(async (req, res, next) => {
    const newSerie = await productosSeriesService.createProductoSerie(req.body);
    res.status(201).json({ status: 'success', data: newSerie });
});

export const update = asyncHandler(async (req, res, next) => {
    const updatedSerie = await productosSeriesService.updateProductoSerie(req.productoSerie, req.body);
    res.status(200).json({ status: 'success', data: updatedSerie });
});

export const remove = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await productosSeriesService.deleteProductoSerie(id);
    res.status(204).send();
});
