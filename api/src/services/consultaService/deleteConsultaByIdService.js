import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const deleteConsultaByIdService = (consultaId) => {
  return new Promise((resolve, reject) => {
    logger.info('deleteConsultaByIdService');


    const deleteConsultasQ = 'DELETE FROM consulta WHERE consulta_id = ?';
    db.query(deleteConsultasQ, consultaId, (err, result) => {
      if (err) {
        logger.error('Erro ao excluir consultas:', err.message);
        reject(err);
        return;
      }


      const deleteConsultaQ = 'DELETE FROM consulta WHERE consulta_id = ?';
      db.query(deleteConsultaQ, consultaId, (err, result) => {
        if (err) {
          logger.error('Erro ao excluir Consulta:', err.message);
          reject(err);
        } else {
          logger.info('Consulta e consultas deletados com sucesso');
          resolve(result);
        }
      });
    });
  });
};
