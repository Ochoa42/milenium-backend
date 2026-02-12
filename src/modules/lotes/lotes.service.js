import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { LOTE_CONFIG } from '../../common/applyFilters.js';

export const findAllLotes = async (query) => {
    const {
        where,
        limit,
        offset,
        order,
        page,
        perPage
    } = buildSequelizeQuery(query, LOTE_CONFIG);

    const { rows: lotes, count: total } = await db.Lote.findAndCountAll({
        where,
        include: [
            { model: db.Producto, as: 'producto', attributes: ['nombre_comercial', 'codigo_barras'] },
            { model: db.Proveedor, as: 'proveedor', attributes: ['nombre', 'empresa'] }
        ],
        limit,
        offset,
        order,
    });

    return {
        lotes,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
    };
};

export const findLoteById = async (id) => {
    return await db.Lote.findByPk(id, {
        include: [
            { model: db.Producto, as: 'producto' },
            { model: db.Proveedor, as: 'proveedor' }
        ]
    });
};

export const createLote = async (loteData) => {
    return await db.Lote.create(loteData);
};

export const updateLote = async (lote, loteData) => {
    return await lote.update(loteData);
};

export const deleteLote = async (id) => {
    const lote = await db.Lote.findByPk(id);
    if (lote) {
        await lote.destroy();
    }
    return lote;
};
