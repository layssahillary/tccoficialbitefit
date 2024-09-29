import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const deletePatientByIdService = (pacienteId) => {
  return new Promise((resolve, reject) => {
    logger.info('deletePatientByIdService');


    const deleteConsultasQ = 'DELETE FROM consulta WHERE paciente_id = ?';
    db.query(deleteConsultasQ, pacienteId, (err, result) => {
      if (err) {
        logger.error('Erro ao excluir consultas:', err.message);
        reject(err);
        return;
      }

      const deletePacienteQ = 'DELETE FROM paciente WHERE paciente_id = ?';
      db.query(deletePacienteQ, pacienteId, (err, result) => {
        if (err) {
          logger.error('Erro ao excluir paciente:', err.message);
          reject(err);
        } else {
          logger.info('Paciente e consultas deletados com sucesso');
          resolve(result);
        }
      });
    });
  });
};
