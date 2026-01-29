import { Op } from 'sequelize';
export const buildSequelizeQuery = (query, config) => {
  const { searchableFields = [], filterableFields = [], defaultSort = ['id', 'ASC'] } = config;

  const page = parseInt(query.page, 10) || 1;
  const perPage = parseInt(query.perPage, 10) || 20;
  const offset = (page - 1) * perPage;
  const limit = perPage;

  let where = {};
  let order = [defaultSort];

  const { search } = query;
  if (search && searchableFields.length > 0) {
    where[Op.or] = searchableFields.map(field => ({
      [field]: { [Op.iLike]: `%${search}%` }
    }));
  }

  const { sortBy, sortOrder = 'ASC' } = query;
  if (sortBy) {
    order = [[sortBy, sortOrder.toUpperCase()]];
  }

  const filters = { ...query };
  delete filters.page;
  delete filters.perPage;
  delete filters.search;
  delete filters.sortBy;
  delete filters.sortOrder;

  for (const key in filters) {
    if (filterableFields.includes(key)) {
      const value = filters[key];
      where[key] = value;
    }
  }

  return { where, limit, offset, order, page, perPage };
};