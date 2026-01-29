import express from 'express';
import * as authController from './auth.controller.js';
import * as userMiddleware from '../usuarios/usuarios.middleware.js';
import { jwtAuth } from './auth.middleware.js';

const router = express.Router();

router.post(
  '/register',
  userMiddleware.validateCreateUsuario,
  userMiddleware.checkEmailIsAvailable,
  authController.register
);

router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password/:token', authController.resetPassword);


// --- RUTAS PROTEGIDAS (Ejemplo) ---
router.get('/profile', jwtAuth, authController.getProfile);

router.post('/logout', jwtAuth, authController.logout);


export default router;