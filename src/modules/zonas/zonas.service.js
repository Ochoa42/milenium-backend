import { ZONA_CONFIG } from '../../common/applyFilters.js';
import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';

export const findAllZonas = async () => {
  return await db.Zona.findAll();
};

export const findZonaById = async (id) => {
  const zona = await db.Zona.findByPk(id);
  return zona;
};

export const createZona = async (zonaData) => {
  return await db.Zona.create(zonaData);
};

export const updateZona = async (zona, zonaData) => {
  return await zona.update(zonaData);
};

export const deleteZona = async (id) => {
  const zona = await db.Zona.findByPk(id);
  if (zona) {
    await zona.destroy();
  }
  return zona;
};

export const findAllZonaFull = async (query) => {
  const { 
    where, 
    limit, 
    offset, 
    order, 
    page, 
    perPage 
  } = buildSequelizeQuery(query, ZONA_CONFIG);

  const { rows: zonas, count: total } = await db.Zona.findAndCountAll({
    where,
    limit,
    offset,
    order,
  });

  return {
    zonas,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage)
  };
};