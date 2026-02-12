import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { MARCA_CONFIG } from '../../common/applyFilters.js';

export const findAllMarcas = async (query) => {
    const {
        where,
        limit,
        offset,
        order,
        page,
        perPage
    } = buildSequelizeQuery(query, MARCA_CONFIG);

    const { rows: marcas, count: total } = await db.Marca.findAndCountAll({
        where: {
            ...where,
            esta_activo: true
        },
        limit,
        offset,
        order,
    });

    return {
        marcas,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
    };
};

export const findMarcaById = async (id) => {
    return await db.Marca.findByPk(id);
};

export const createMarca = async (marcaData) => {
    return await db.Marca.create(marcaData);
};

export const updateMarca = async (marca, marcaData) => {
    return await marca.update(marcaData);
};

export const deleteMarca = async (id) => {
    const marca = await db.Marca.findByPk(id);
    if (marca) {
        await marca.destroy();
    }
    return marca;
};
