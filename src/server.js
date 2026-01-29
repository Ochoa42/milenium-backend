import dotenv from 'dotenv';
import app from './app.js';
import config from './config/index.js';
import db from './database/index.js';
import logger from './config/logger.js';

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({
      force: false,
      // alter: false 
    });

    const server = app.listen(config.server.port, () => {
      logger.info(`Server is running on port ${config.server.port}`);
      logger.info(`Environment: ${config.server.nodeEnv}`)
      logger.info(`Access API at http://${config.server.serverHost}:${config.server.port}/api/v1`);
    });

    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
