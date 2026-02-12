import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { STOCK_DISTRIBUCION_CONFIG } from '../../common/applyFilters.js';

export const findAllStockDistribucion = async (query) => {
    const {
        where,
        limit,
        offset,
        order,
        page,
        perPage
    } = buildSequelizeQuery(query, STOCK_DISTRIBUCION_CONFIG);

    const { rows: stockDistribucion, count: total } = await db.StockDistribucion.findAndCountAll({
        where,
        include: [
            {
                model: db.Lote,
                as: 'lote',
                include: [{ model: db.Producto, as: 'producto', attributes: ['nombre_comercial'] }]
            },
            { model: db.Ubicacion, as: 'ubicacion', attributes: ['nombre', 'tipo_area'] }
        ],
        limit,
        offset,
        order,
    });

    return {
        stockDistribucion,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
    };
};

export const findStockDistribucionById = async (id) => {
    return await db.StockDistribucion.findByPk(id, {
        include: [
            { model: db.Lote, as: 'lote' },
            { model: db.Ubicacion, as: 'ubicacion' }
        ]
    });
};

export const createStockDistribucion = async (stockData) => {
    return await db.StockDistribucion.create(stockData);
};

export const updateStockDistribucion = async (stock, stockData) => {
    return await stock.update(stockData);
};

export const deleteStockDistribucion = async (id) => {
    const stock = await db.StockDistribucion.findByPk(id);
    if (stock) {
        await stock.destroy();
    }
    return stock;
};

// Custom query to get total stock for a product
export const getTotalStockForProduct = async (id_producto) => {
    const totalStock = await db.StockDistribucion.sum('cantidad_actual', {
        include: [{
            model: db.Lote,
            as: 'lote',
            where: { id_producto }
        }]
    });
    return totalStock || 0;
};
