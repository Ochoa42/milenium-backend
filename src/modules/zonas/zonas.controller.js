import asyncHandler from '../../utils/asyncHandler.js';
import * as zonasService from './zonas.service.js';

export const findAll = asyncHandler(async (req, res, next) => {
  const zonas = await zonasService.findAllZonas();
  res.status(200).json({ status: 'success', data: zonas });
});

export const findOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const zona = await zonasService.findZonaById(id);
  if (!zona) {
     return res.status(404).json({
      status: 'error',
      message: `La zona con ID ${id} no fue encontrada.`,
    });
  }
  res.status(200).json({ status: 'success', data: zona });
});

export const create = asyncHandler(async (req, res, next) => {
  const newZona = await zonasService.createZona(req.body);
  res.status(201).json({ status: 'success', data: newZona });
});

export const update = asyncHandler(async (req, res, next) => {
  const updatedZona = await zonasService.updateZona(req.zona, req.body);
  res.status(200).json({ status: 'success', data: updatedZona });
});

export const remove = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await zonasService.deleteZona(id);
  res.status(204).send();
});

export const zonaListFull = asyncHandler(async(req,res,next)=>{
  const data = await zonasService.findAllZonaFull(req.query); 
  let extraData = req.query.extraData;
  if (!extraData) {
    extraData = {};
  }
  res.status(200).json({
    status: 'success',
    data: data,
    extraData: extraData
  });  
})