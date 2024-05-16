import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
export const updateDietaService = (dietaId, status) => {
  return new Promise((resolve, reject) => {
    const q = 'UPDATE dieta SET status = ? WHERE dieta_id = ?';
    const values = [status, dietaId];

    db.query(q, values, (err) => {
      if (err) {
        logger.error(err.message);
        reject(err);
      } else {
        logger.info(
          'updateDietaService: Dieta atualizada com sucesso',
        );
        resolve('Dieta atualizada com sucesso');
      }
    });
  });
};
