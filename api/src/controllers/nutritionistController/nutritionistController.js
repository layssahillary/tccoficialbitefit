import { nutritionistRegisterService } from '../../services/nutritionistService/nutritionistRegisterService.js';
import { getNutricionistByIdService } from '../../services/nutritionistService/getNutricionistByIdService.js';
import { deleteNutricionistByIdService } from '../../services/nutritionistService/deleteNutricionistByIdService.js';
import { updateNutricionistByIdService } from '../../services/nutritionistService/updateNutricionistByIdService.js';

import winston from 'winston';
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const registerNutricionist = (req, res) => {
  logger.info('registerNutricionistController');
  const nutritionist = req.body;

  nutritionistRegisterService(nutritionist)
    .then(() => {
      logger.info(
        'registerNutricionistController: Nutricionista criado com sucesso',
      );
      res.status(200).json('Nutricionista criado com sucesso');
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};

export const getNutricionistById = async (req, res) => {
  logger.info('getNutricionistByIdController');
  const nutricionistaId = req.params.id;

  try {
    const nutricionista = await getNutricionistByIdService(nutricionistaId);
    logger.info('getNutricionistByIdController: Nutricionista recuperado com sucesso');
    res.status(200).json(nutricionista);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};

export const deleteNutricionistById = async (req, res) => {
  logger.info('deleteNutricionistByIdController');
  const nutricionistaId = req.params.id;

  try {
    const nutricionista = await deleteNutricionistByIdService(nutricionistaId);
    logger.info('deleteNutricionistByIdController: Nutricionista deletado com sucesso');
    res.status(200).json(nutricionista);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};

export const updateNutricionistById = async (req, res) => {
  logger.info('Update Nutricionist Controller called');
  const nutricionistaId = req.params.id;
  const newData = req.body;

  try {
    const paciente = await updateNutricionistByIdService(nutricionistaId, newData);
    res.status(200).json(paciente);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};