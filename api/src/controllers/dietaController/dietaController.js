import { dietaRegisterService } from '../../services/dietaService/registerDietService.js';
import { updateDietaService } from '../../services/dietaService/updateDietaService.js';
import { getDietaByPacienteIdService } from '../../services/dietaService/getDietaByPacienteIdService.js';
import { deleteDietaByIdService } from '../../services/dietaService/deleteDietaByIdService.js';

import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const registerDieta = (req, res) => {
  logger.info('registerDietaController');
  const dieta = req.body;

  dietaRegisterService(dieta)
    .then(() => {
      logger.info('registerDietaController: Dieta criada com sucesso');
      res.status(200).json('Dieta criada com sucesso');
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};

export const updateDieta = (req, res) => {
  logger.info('updateDietaController');
  const { id, status } = req.body;

  updateDietaService(id, status)
    .then(() => {
      logger.info(
        'updateDietaController: Status da consulta atualizado com sucesso',
      );
      res.status(200).json('Status da consulta atualizado com sucesso');
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};

export const getDietaByPacienteId = (req, res) => {
  const paciente_id = req.params.paciente_id;

  getDietaByPacienteIdService(paciente_id)
    .then((dietas) => {
      logger.info('getDietaByPacienteIdController: Dietas obtidas com sucesso');
      res.status(200).json(dietas);
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};

export const deleteDietaById = async (req, res) => {
  logger.info('deleteDietaByIdController');
  const dietaId = req.params.id;

  try {
    const dieta = await deleteDietaByIdService(dietaId);
    logger.info('deleteDietaByIdController: Paciente deletado com sucesso');
    res.status(200).json(dieta);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};
