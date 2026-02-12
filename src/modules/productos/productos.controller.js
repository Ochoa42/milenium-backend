import asyncHandler from '../../utils/asyncHandler.js';
import * as productosService from './productos.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
    const result = await productosService.findAllProductos(req.query);
    res.status(200).json({ status: 'success', data: result });
});

export const findOne = asyncHandler(async (req, res, next) => {
    const { producto } = req;
    res.status(200).json({ status: 'success', data: producto });
});

export const create = asyncHandler(async (req, res, next) => {
    const newProducto = await productosService.createProducto(req.body);
    res.status(201).json({ status: 'success', data: newProducto });
});

export const update = asyncHandler(async (req, res, next) => {
    const updatedProducto = await productosService.updateProducto(req.producto, req.body);
    res.status(200).json({ status: 'success', data: updatedProducto });
});

export const remove = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    await productosService.deleteProducto(id);
    res.status(204).send();
});
