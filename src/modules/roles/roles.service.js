import db from '../../database/index.js';

export const findAllRoles = async () => {
  return await db.Role.findAll();
};

export const findRoleById = async (id) => {
  const role = await db.Role.findByPk(id);
  return role;
};

export const createRole = async (roleData) => {
  return await db.Role.create(roleData);
};

export const updateRole = async (role, roleData) => {
  return await role.update(roleData);
};

export const deleteRole = async (id) => {
  const role = await db.Role.findByPk(id);
  if (role) {
    await role.destroy();
  }
  return role;
};