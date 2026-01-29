import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import config from '../../config/index.js';
import redisClient from '../../config/redis.js';

import crypto from 'crypto';

export const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString('hex');
  const password_reset_token = crypto.createHash('sha256').update(resetToken).digest('hex');
  const password_reset_expires = Date.now() + 10 * 60 * 1000;
  return { resetToken, password_reset_token, password_reset_expires };
};

export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const signToken = (user) => {
  const payload = {
    id: String(user.id),
    email: user.email,
    rol_id: String(user.rol_id),
  };
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const sendPasswordResetEmail = async (user, token) => {
  const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: false,
    auth: {
      user: config.email.user,
      pass: config.email.password,
    },
  });

  const resetUrl = `${config.client.url}/reset-password/${token}`;

  await transporter.sendMail({
    from: `"${config.email.appName}" <${config.email.from}>`,
    to: user.email,
    subject: 'Restablecimiento de Contraseña',
    html: `
      <p>Hola ${user.email},</p>
      <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
      <a href="${resetUrl}">Restablecer Contraseña</a>
      <p>Si no solicitaste esto, por favor ignora este correo.</p>
    `,
  });
};


export const add = async (token) => {
  const decoded = jwt.decode(token);
  const expirationInSeconds = decoded.exp;
  const nowInSeconds = Math.floor(Date.now() / 1000);

  const expiresIn = expirationInSeconds - nowInSeconds;

  if (expiresIn > 0) {
    // Guarda el token en Redis con la expiración restante.
    // El '1' es un valor placeholder. Lo que importa es que la llave (el token) exista.
    await redisClient.set(token, 'blocked', {
      EX: expiresIn,
    });
  }
};

export const isTokenBlocked = async (token) => {
  const result = await redisClient.get(token);
  return result !== null;
};