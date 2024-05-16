import { db } from '../../../db.js';
import winston from 'winston';


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const getPatientByIdService = (pacienteId) => {
  return new Promise((resolve, reject) => {
    logger.info('getPatientByIdService');

    const q = 'SELECT * FROM paciente WHERE paciente_id = ?';

    db.query(q, pacienteId, (err, result) => {
      if (err) {
        logger.error(err.message);
        reject(err);
      } else {
        logger.info('getPatientByIdService: Pacientes recuperados com sucesso');
        resolve(result);
      }
    });
  });
};
