import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const deleteDietaByIdService = (dietaId) => {
  return new Promise((resolve, reject) => {
    logger.info('deleteDietaByIdService');

    const deleteDietaQ = 'DELETE FROM consulta WHERE consulta_id = ?';
    db.query(deleteDietaQ, dietaId, (err, result) => {
      if (err) {
        logger.error('Erro ao excluir consultas:', err.message);
        reject(err);
        return;
      }

      const deleteDietaQ = 'DELETE FROM dieta WHERE dieta_id = ?';
      db.query(deleteDietaQ, dietaId, (err, result) => {
        if (err) {
          logger.error('Erro ao excluir Dieta:', err.message);
          reject(err);
        } else {
          logger.info('Dieta deletada com sucesso');
          resolve(result);
        }
      });
    });
  });
};
