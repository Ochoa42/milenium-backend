import { where } from 'sequelize';
import { EMPLEADO_CONFIG } from '../../common/applyFilters.js';
import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { EMPLEADO_EXCLUDED, ROLE_EXCLUDE, USUARIO_EXCLUDED } from '../../common/attributeExclude.js';

export const findAllEmpleados = async () => {
  return await db.Empleado.findAll();
};

export const findAllExtraDataEmpleado = async () => {
  return await db.Empleado.findAll({
    attributes: {
      exclude: EMPLEADO_EXCLUDED
    },
    where: {
      esta_activo: true
    }
  });
};

export const findAllExtraDataPromotor = async () => {
  return await db.Empleado.findAll({
    include: [
      {
        model: db.Usuario,
        required: true,
        include: [
          {
            model: db.Role,
            required: true,
            where: {
              code_rol: 'PTOR'
            },
            attributes: {
              exclude: ROLE_EXCLUDE
            }
          }
        ],
        attributes: {
          exclude: USUARIO_EXCLUDED
        }
      }
    ],
    attributes: {
      exclude: EMPLEADO_EXCLUDED
    },
    where: {
      esta_activo: true
    }
  });
};


export const findEmpleadoById = async (id) => {
  const empleado = await db.Empleado.findByPk(id);
  return empleado;
};

import { sequelize } from '../../database/connection.js';
import * as usuariosService from '../usuarios/usuarios.service.js';

export const createEmpleado = async (empleadoData) => {
  const transaction = await sequelize.transaction();
  try {
    let usuarioId = empleadoData.usuario_id;

    if (empleadoData.usuario) {
      const nuevoUsuario = await usuariosService.createUsuario(empleadoData.usuario, { transaction });
      usuarioId = nuevoUsuario.id;
    }

    const newEmpleado = await db.Empleado.create({
      ...empleadoData,
      usuario_id: usuarioId || null
    }, { transaction });

    await transaction.commit();
    return newEmpleado;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const updateEmpleado = async (empleado, empleadoData) => {
  return await empleado.update(empleadoData);
};

export const deleteEmpleado = async (id) => {
  const empleado = await db.Empleado.findByPk(id);
  if (empleado) {
    await empleado.destroy();
  }
  return empleado;
};

export const findAllEmpleadoFull = async (query) => {
  const {
    where,
    limit,
    offset,
    order,
    page,
    perPage
  } = buildSequelizeQuery(query, EMPLEADO_CONFIG);

  const { rows: empleados, count: total } = await db.Empleado.findAndCountAll({
    where: {
      ...where,
      esta_activo: true
    },
    limit,
    offset,
    order,
    include: [
      {
        model: db.Usuario,
        attributes: ['id', 'name_user']
      }
    ]
  });

  return {
    empleados,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage)
  };
};

export const countEmpleados = async () => {
  return await db.Empleado.count();
}