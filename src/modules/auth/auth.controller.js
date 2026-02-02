import asyncHandler from '../../utils/asyncHandler.js';
import * as usuariosService from '../usuarios/usuarios.service.js';
import * as authService from './auth.service.js';
import db from '../../database/index.js';
import { Op } from 'sequelize';
import passport from 'passport';

// REGISTRO
export const register = asyncHandler(async (req, res, next) => {
  const newUser = await usuariosService.createUser(req.body);
  res.status(201).json({ status: 'success', message: 'Usuario registrado exitosamente.', data: newUser });
});

// LOGIN
export const login = asyncHandler(async (req, res, next) => {
  // Al no haber middleware en la ruta, esta es la UNICA vez que se ejecuta esto.
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // Aquí puedes personalizar el mensaje si info trae algo raro
      return res.status(401).json({
        status: 'error',
        message: info ? info.message : 'Credenciales incorrectas'
      });
    }

    // Generar token
    const token = authService.signToken(user);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        id: user.id,
        email: user.email,
        rol_id: user.rol_id // Útil para el frontend
      },
    });
  })(req, res, next);
});

// OLVIDÉ MI CONTRASEÑA
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await usuariosService.findUserByEmail(email);
  console.log(user);
  if (user) {
    const { resetToken, password_reset_token, password_reset_expires } = authService.generatePasswordResetToken();
    user.password_reset_token = password_reset_token;
    user.password_reset_expires = password_reset_expires;
    await user.save();

    await authService.sendPasswordResetEmail(user, resetToken);
  }

  res.status(200).json({ status: 'success', message: 'Si el email está registrado, recibirás un enlace para restablecer tu contraseña.' });
});

// RESTABLECER CONTRASEÑA
export const resetPassword = asyncHandler(async (req, res, next) => {
  const hashedToken = authService.hashToken(req.params.token);

  const user = await db.Usuario.findOne({
    where: {
      password_reset_token: hashedToken,
      password_reset_expires: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    return res.status(400).json({ status: 'error', message: 'El token es inválido o ha expirado.' });
  }

  // Actualizar contraseña
  const newPasswordHash = await usuariosService.hashPassword(req.body.password);
  user.password_hash = newPasswordHash;
  user.password_reset_token = null;
  user.password_reset_expires = null;
  await user.save();

  res.status(200).json({ status: 'success', message: 'Contraseña actualizada exitosamente.' });
});

// LOGOUT (Explicación)
export const logout = asyncHandler(async (req, res, next) => {
  // Extraemos el token del header 'Authorization'
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    await authService.add(token);
  }
  res.status(200).json({ status: 'success', message: 'Sesión cerrada exitosamente.' });
});

// PERFIL DE USUARIO (Ruta protegida de ejemplo)
export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const profile = await usuariosService.findUsuarioById(userId);
  res.status(200).json({ status: 'success', data: profile });
});