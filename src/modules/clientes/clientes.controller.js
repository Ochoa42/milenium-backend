import asyncHandler from "../../utils/asyncHandler.js";
import * as clienteService from './clientes.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
  const clientes = await clienteService.findAllCliente();
  res.status(200).json({ status: 'success', data: clientes });
});

export const findOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const cliente = await clienteService.findClienteById(id)
  if (!cliente) {
    return res.status(404).json({
      status: 'error',
      message: `El cliente con ID ${id} no fue encontrado.`,
    });
  }
  res.status(200).json({ status: 'success', data: cliente });
});

export const create = asyncHandler(async (req, res, next) => {
  const newCliente = await clienteService.createCliente(req.body);
  res.status(201).json({ status: 'success', data: newCliente });
});

export const update = asyncHandler(async (req, res, next) => {
  const updatedCliente = await clienteService.updateCliente(req.cliente, req.body);
  res.status(200).json({ status: 'success', data: updatedCliente });
});

export const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await clienteService.deleteCliente(id);
  res.status(204).send();
});

// export const clientListFull = asyncHandler(async (req, res, next) => {
//   let { perPage, page , searchBy, extraData = false } = req.query;
//   perPage = parseInt(perPage);
//   page = parseInt(page);
//   if(!extraData){
//     extraData = {}
//   }
//   const data = await clienteService.findAllClientFull(perPage, page, searchBy);
//   console.log("mi data",data)
//   res.status(200).json({
//     status: 'success',
//     data: data,
//     extraData
//   });
// });

export const clientListFull = asyncHandler(async (req, res, next) => {
  const data = await clienteService.findAllClientFull(req.query);
  // console.log("mi data", data);
  let extraData = req.query.extraData;

  if (!extraData) {
    extraData = {};
  }

  res.status(200).json({
    status: 'success',
    data: data,
    extraData: extraData
  });
});