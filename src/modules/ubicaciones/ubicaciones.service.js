import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { UBICACIONES_CONFIG } from '../../common/applyFilters.js';

export const findAllUbicaciones = async (query) => {
    const {
        where,
        limit,
        offset,
        order,
        page,
        perPage
    } = buildSequelizeQuery(query, UBICACIONES_CONFIG);

    const { rows: ubicaciones, count: total } = await db.Ubicacion.findAndCountAll({
        where: {
            ...where,
            esta_activo: true
        },
        limit,
        offset,
        order,
    });

    return {
        ubicaciones,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
    };
};

export const findUbicacionById = async (id) => {
    return await db.Ubicacion.findByPk(id);
};

export const createUbicacion = async (ubicacionData) => {
    return await db.Ubicacion.create(ubicacionData);
};

export const updateUbicacion = async (ubicacion, ubicacionData) => {
    return await ubicacion.update(ubicacionData);
};

export const deleteUbicacion = async (id) => {
    const ubicacion = await db.Ubicacion.findByPk(id);
    if (ubicacion) {
        await ubicacion.destroy();
    }
    return ubicacion;
};
