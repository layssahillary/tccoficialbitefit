import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
export const scheduleConsultationService = (consulta) => {
  return new Promise((resolve, reject) => {
    logger.info('scheduleConsultationService');
    if (
      !consulta.paciente_id ||
      !consulta.nutricionista_id ||
      !consulta.dataConsulta ||
      !consulta.horaConsulta
    ) {
      logger.error(
        'scheduleConsultationService: Todos os campos são obrigatórios',
      );
      reject(new Error('Todos os campos são obrigatórios'));
      return;
    }

    const q =
      'INSERT INTO consulta (paciente_id, nutricionista_id, dataConsulta, horaConsulta, status, observacao) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
      consulta.paciente_id,
      consulta.nutricionista_id,
      consulta.dataConsulta,
      consulta.horaConsulta,
      'Agendada',
      consulta.observacao,
    ];

    db.query(q, values, (err) => {
      if (err) {
        logger.error(err.message);
        reject(err);
      } else {
        logger.info(
          'scheduleConsultationService: Consulta agendada com sucesso',
        );
        resolve('Consulta agendada com sucesso');
      }
    });
  });
};
