import { where } from 'sequelize';
import { PROVEEDOR_CONFIG } from '../../common/applyFilters.js';
import { PROVEEDOR_EXCLUDED } from '../../common/attributeExclude.js';
import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';

export const findAllProveedores = async () => {
  return await db.Proveedor.findAll();
};

export const findAllExtraDataProveedor = async () => {
  return await db.Proveedor.findAll({
    attributes: {
      exclude: PROVEEDOR_EXCLUDED
    },
    where: {
      esta_activo: true
    }
  });
};


export const findProveedorById = async (id) => {
  const proveedor = await db.Proveedor.findByPk(id);
  return proveedor;
};

export const createProveedor = async (proveedorData) => {
  return await db.Proveedor.create(proveedorData);
};

export const updateProveedor = async (proveedor, proveedorData) => {
  return await proveedor.update(proveedorData);
};

export const deleteProveedor = async (id) => {
  const proveedor = await db.Proveedor.findByPk(id);
  if (proveedor) {
    await proveedor.destroy();
  }
  return proveedor;
};

export const findAllProveedorFull = async (query) => {
  const { 
    where, 
    limit, 
    offset, 
    order, 
    page, 
    perPage 
  } = buildSequelizeQuery(query, PROVEEDOR_CONFIG);

  const { rows: proveedores, count: total } = await db.Proveedor.findAndCountAll({
    where: {
      ...where,
      esta_activo: true
    },
    limit,
    offset,
    order,
    include: [
      {
        model: db.Zona,
        attributes: ['id', 'nombre']
      }
    ]
  });

  return {
    proveedores,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage)
  };
};