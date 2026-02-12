import db from '../../database/index.js';
import { buildSequelizeQuery } from '../../utils/queryBuilder.js';
import { PRODUCTO_CONFIG } from '../../common/applyFilters.js';

export const findAllProductos = async (query) => {
    const {
        where,
        limit,
        offset,
        order,
        page,
        perPage
    } = buildSequelizeQuery(query, PRODUCTO_CONFIG);

    const { rows: productos, count: total } = await db.Producto.findAndCountAll({
        where: {
            ...where,
            // estado: true // Optional: if we only want active products by default
        },
        include: [
            { model: db.Categoria, as: 'categoria', attributes: ['nombre'] },
            { model: db.Marca, as: 'marca', attributes: ['nombre'] },
            { model: db.UnidadMedida, as: 'unidad_base', attributes: ['nombre', 'abreviatura'] }
        ],
        limit,
        offset,
        order,
    });

    return {
        productos,
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage)
    };
};

export const findProductoById = async (id) => {
    return await db.Producto.findByPk(id, {
        include: [
            { model: db.Categoria, as: 'categoria' },
            { model: db.Marca, as: 'marca' },
            { model: db.UnidadMedida, as: 'unidad_base' }
        ]
    });
};

export const createProducto = async (productoData) => {
    return await db.Producto.create(productoData);
};

export const updateProducto = async (producto, productoData) => {
    return await producto.update(productoData);
};

export const deleteProducto = async (id) => {
    const producto = await db.Producto.findByPk(id);
    if (producto) {
        await producto.destroy();
    }
    return producto;
};
