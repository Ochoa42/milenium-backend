import logger from '../config/logger.js';
import { saveError } from '../modules/errors/error.service.js';

export const errorMiddleware = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  saveError(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};
