import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { PRESENTACION_CONFIG } from '../../common/applyFilters.js';

export const findAllPresentaciones = async (query) => {
    const {
        where,
        limit,
        offset,
        order,
        page,
        perPage
    } = buildSequelizeQuery(query, PRESENTACION_CONFIG);

    const { rows: presentaciones, count: total } = await db.Presentacion.findAndCountAll({
        where: {
            ...where,
            esta_activo: true
        },
        include: [
            { model: db.Producto, as: 'producto', attributes: ['nombre_comercial'] }
        ],
        limit,
        offset,
        order,
    });

    return {
        presentaciones,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
    };
};

export const findPresentacionById = async (id) => {
    return await db.Presentacion.findByPk(id, {
        include: [
            { model: db.Producto, as: 'producto' }
        ]
    });
};

export const createPresentacion = async (presentacionData) => {
    return await db.Presentacion.create(presentacionData);
};

export const updatePresentacion = async (presentacion, presentacionData) => {
    return await presentacion.update(presentacionData);
};

export const deletePresentacion = async (id) => {
    const presentacion = await db.Presentacion.findByPk(id);
    if (presentacion) {
        await presentacion.destroy();
    }
    return presentacion;
};
