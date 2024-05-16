import { scheduleConsultationService } from '../../services/consultaService/scheduleConsultation.js';
import { updateConsultationStatusService } from '../../services/consultaService/updateConsultation.js';
import { getConsultasByNutricionistaIdService } from '../../services/consultaService/getConsultationByNutricionistaIdService.js';
import { getConsultasByPacienteIdService } from '../../services/consultaService/getConsultasByPacienteIdService.js';
import { deleteConsultaByIdService } from '../../services/consultaService/deleteConsultaByIdService.js';

import winston from 'winston';
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
export const scheduleConsultation = (req, res) => {
  logger.info('scheduleConsultationController');
  const consulta = req.body;

  scheduleConsultationService(consulta)
    .then(() => {
      logger.info(
        'scheduleConsultationController: Consulta agendada com sucesso',
      );
      res.status(200).json('Consulta agendada com sucesso');
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};

export const updateConsultationStatus = (req, res) => {
  logger.info('updateConsultationStatusController');
  const { id, status } = req.body;

  updateConsultationStatusService(id, status)
    .then(() => {
      logger.info(
        'updateConsultationStatusController: Status da consulta atualizado com sucesso',
      );
      res.status(200).json('Status da consulta atualizado com sucesso');
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};


export const getConsultasByNutricionistaId = (req, res) => {
  const nutricionista_id = req.params.nutricionista_id;
  
  getConsultasByNutricionistaIdService(nutricionista_id)
    .then((consultas) => {
      logger.info('getConsultasByNutricionistaIdController: Consultas obtidas com sucesso');
      res.status(200).json(consultas);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};

export const getConsultasByPacienteId = (req, res) => {
  const paciente_id = req.params.paciente_id;
  
  getConsultasByPacienteIdService(paciente_id)
    .then((consultas) => {
      logger.info('getConsultasByPacienteIdController: Consultas obtidas com sucesso');
      res.status(200).json(consultas);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};

export const deleteConsultaById = async (req, res) => {
  logger.info('deleteConsultaByIdController');
  const consultaId = req.params.id;

  try {
    const consultas = await deleteConsultaByIdService(consultaId);
    logger.info('deleteConsultaByIdController: Paciente deletado com sucesso');
    res.status(200).json(consultas);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};