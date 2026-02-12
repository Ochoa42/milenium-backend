import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { UNIDAD_MEDIDA_CONFIG } from '../../common/applyFilters.js';

export const findAllUnidadMedidas = async (query) => {
    const {
        where,
        limit,
        offset,
        order,
        page,
        perPage
    } = buildSequelizeQuery(query, UNIDAD_MEDIDA_CONFIG);

    const { rows: unidadMedidas, count: total } = await db.UnidadMedida.findAndCountAll({
        where: {
            ...where,
            esta_activo: true
        },
        limit,
        offset,
        order,
    });

    return {
        unidadMedidas,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
    };
};

export const findUnidadMedidaById = async (id) => {
    return await db.UnidadMedida.findByPk(id);
};

export const createUnidadMedida = async (unidadMedidaData) => {
    return await db.UnidadMedida.create(unidadMedidaData);
};

export const updateUnidadMedida = async (unidadMedida, unidadMedidaData) => {
    return await unidadMedida.update(unidadMedidaData);
};

export const deleteUnidadMedida = async (id) => {
    const unidadMedida = await db.UnidadMedida.findByPk(id);
    if (unidadMedida) {
        await unidadMedida.destroy();
    }
    return unidadMedida;
};
