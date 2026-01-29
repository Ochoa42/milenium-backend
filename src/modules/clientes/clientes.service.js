import { Op, where } from "sequelize";
import db from "../../database/index.js";
import { buildSequelizeQuery } from "../../utils/queryBuilder.js";
import { CLIENT_CONFIG } from "../../common/applyFilters.js";

export const findAllCliente = async () => {
    return await db.Cliente.findAll();
}

export const findClienteById = async (id) => {
  const cliente = await db.Cliente.findByPk(id);
  return cliente;
};

export const findOneClientCi = async (ci) => {
  return await db.Cliente.findOne({
    where : {
      ci : ci,
      esta_activo: true
    }
  }) 
}

export const createCliente = async (clienteData) => {
  return await db.Cliente.create(clienteData);
};

export const updateCliente = async (cliente, clienteData) => {
  return await cliente.update(clienteData);
};

export const deleteCliente = async (id) => {
  const cliente = await db.Cliente.findByPk(id);
  if (cliente) {
    await cliente.destroy();
  }
  return cliente;
};

export const findAllClientFull = async (query) => {
  const { 
    where, 
    limit, 
    offset, 
    order, 
    page, 
    perPage 
  } = buildSequelizeQuery(query, CLIENT_CONFIG);

  const { rows: clientes, count: total } = await db.Cliente.findAndCountAll({
    where,
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
    clientes,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage)
  };
};

export const countClient = async () => {
  return await db.Cliente.count();
}

export const top50ClientsByPoints = async () => {
  return await db.Cliente.findAll({
    attributes: ['id', 'nombre', 'puntos','apellido_paterno','apellido_materno'],
    where: {
      esta_activo: true
    },
    group: ['Cliente.id'],
    order: [['puntos', 'DESC']],
    limit: 50
  });
};