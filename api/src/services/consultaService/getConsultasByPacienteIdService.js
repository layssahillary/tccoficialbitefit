import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const getConsultasByPacienteIdService = (paciente_id) => {
  return new Promise((resolve, reject) => {
    const q = 'SELECT * FROM consulta WHERE paciente_id = ?';
    db.query(q, [paciente_id], (err, result) => {
      if (err) {
        logger.error(err.message);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};


