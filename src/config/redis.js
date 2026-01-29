import { createClient } from 'redis';
import logger from './logger.js';
import config from './index.js';

const redisClient = createClient({
  // URL flexible traída de variables de entorno (docker o local)
  url: config.server.hostRedis
});

redisClient.on('error', err => logger.error('Error de Cliente Redis', err));
redisClient.on('connect', () => logger.info('Cliente Redis conectado exitosamente.'));

(async () => {
  await redisClient.connect();
})();

export default redisClient;