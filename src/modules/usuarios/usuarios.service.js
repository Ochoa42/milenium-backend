import db from '../../database/index.js';
import bcrypt from 'bcrypt';

export const findAllUsuarios = async () => {
  return await db.Usuario.findAll();
};

export const findUsuarioById = async (id) => {
  const usuario = await db.Usuario.findByPk(id);
  return usuario;
};

export const findUsuarioByName = async (name) => {
  const usuario = await db.Usuario.findOne({
    where: { name_user: name }
  });
  return usuario;
};

export const createUsuario = async (usuarioData, options = {}) => {
  const { password, ...restOfData } = usuarioData;

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  const newUsuario = await db.Usuario.create({
    ...restOfData,
    password_hash: password_hash,
  }, options);

  if (newUsuario && newUsuario.dataValues) {
    delete newUsuario.dataValues.password_hash;
  }
  return newUsuario;
};

export const updateUsuario = async (usuario, usuarioData) => {
  return await usuario.update(usuarioData);
};

export const deleteUsuario = async (id) => {
  const usuario = await db.Usuario.findByPk(id);
  if (usuario) {
    await usuario.destroy();
  }
  return usuario;
};

export const findUserByEmail = async (email) => {
  return await db.Usuario.findOne({
    where: { email: email }
  });
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const countUsers = async () => {
  return await db.Usuario.count();
};