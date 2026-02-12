import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { PRODUCTOS_SERIES_CONFIG } from '../../common/applyFilters.js';

export const findAllProductosSeries = async (query) => {
    const {
        where,
        limit,
        offset,
        order,
        page,
        perPage
    } = buildSequelizeQuery(query, PRODUCTOS_SERIES_CONFIG);

    const { rows: productosSeries, count: total } = await db.ProductoSerie.findAndCountAll({
        where,
        include: [
            {
                model: db.Lote,
                as: 'lote',
                include: [{ model: db.Producto, as: 'producto' }]
            },
            { model: db.Ubicacion, as: 'ubicacion' }
        ],
        limit,
        offset,
        order,
    });

    return {
        productosSeries,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
    };
};

export const findProductoSerieById = async (id) => {
    return await db.ProductoSerie.findByPk(id, {
        include: [
            { model: db.Lote, as: 'lote' },
            { model: db.Ubicacion, as: 'ubicacion' }
        ]
    });
};

export const findBySerial = async (numero_serie) => {
    return await db.ProductoSerie.findOne({ where: { numero_serie } });
}

export const createProductoSerie = async (serieData) => {
    return await db.ProductoSerie.create(serieData);
};

export const updateProductoSerie = async (serie, serieData) => {
    return await serie.update(serieData);
};

export const deleteProductoSerie = async (id) => {
    const serie = await db.ProductoSerie.findByPk(id);
    if (serie) {
        await serie.destroy();
    }
    return serie;
};
