import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const getPatientEvolutionHistoryService = (pacienteId) => {
  return new Promise((resolve, reject) => {
    logger.info('getPatientEvolutionHistoryService');

    const q = `
    SELECT * FROM paciente_historico 
    WHERE paciente_id = ?
    ORDER BY data_registro DESC;
  `;

    db.query(q, pacienteId, (err, result) => {
      if (err) {
        logger.error(err.message);
        reject(err);
      } else {
        logger.info(
          'getPatientEvolutionHistoryService: Pacientes recuperados com sucesso',
        );
        resolve(result);
      }
    });
  });
};
