import { db } from '../../../db.js';
import winston from 'winston';


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const deleteNutricionistByIdService = (nutricionistaId) => {
  return new Promise((resolve, reject) => {
    logger.info('deleteNutricionistByIdService');

    const q = 'DELETE FROM nutricionista WHERE nutricionista_id = ?';

    db.query(q, nutricionistaId, (err, result) => {
      if (err) {
        logger.error(err.message);
        reject(err);
      } else {
        logger.info('deleteNutricionistByIdService: nutricionista deletado com sucesso');
        resolve(result);
      }
    });
  });
};
