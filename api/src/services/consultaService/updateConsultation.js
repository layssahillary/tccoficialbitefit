import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
export const updateConsultationStatusService = (consultaId, status) => {
  return new Promise((resolve, reject) => {
    const q = 'UPDATE consulta SET status = ? WHERE consulta_id = ?';
    const values = [status, consultaId];

    db.query(q, values, (err) => {
      if (err) {
        logger.error(err.message);
        reject(err);
      } else {
        logger.info(
          'updateConsultationStatusService: Status da consulta atualizado com sucesso',
        );
        resolve('Status da consulta atualizado com sucesso');
      }
    });
  });
};
