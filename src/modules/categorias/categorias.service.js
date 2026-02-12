import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { CATEGORIA_CONFIG } from '../../common/applyFilters.js';

export const findAllCategorias = async (query) => {
    const {
        where,
        limit,
        offset,
        order,
        page,
        perPage
    } = buildSequelizeQuery(query, CATEGORIA_CONFIG);

    const { rows: categorias, count: total } = await db.Categoria.findAndCountAll({
        where: {
            ...where,
            esta_activo: true
        },
        limit,
        offset,
        order,
    });

    return {
        categorias,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
    };
};

export const findCategoriaById = async (id) => {
    return await db.Categoria.findByPk(id);
};

export const createCategoria = async (categoriaData) => {
    return await db.Categoria.create(categoriaData);
};

export const updateCategoria = async (categoria, categoriaData) => {
    return await categoria.update(categoriaData);
};

export const deleteCategoria = async (id) => {
    const categoria = await db.Categoria.findByPk(id);
    if (categoria) {
        await categoria.destroy();
    }
    return categoria;
};
