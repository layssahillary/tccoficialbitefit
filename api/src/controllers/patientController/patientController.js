import { getPatientsByNutricionistaIdService } from '../../services/patientService/getPatientsByNutricionistaIdService.js';
import { patientRegisterService } from '../../services/patientService/patientRegisterService.js';
import { deletePatientByIdService } from '../../services/patientService/deletePatientByIdService.js';
import { getPatientByIdService } from '../../services/patientService/getPatientByIdService.js';
import { updatePatientByIdService } from '../../services/patientService/updatePatientByIdService.js';
import { getPatientEvolutionHistoryService } from '../../services/patientService/getPatientEvolutionHistoryService.js';


import winston from 'winston';
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const registerPatient = (req, res) => {
  logger.info('registerPatientController');
  const patient = req.body;
  patientRegisterService(patient)
    .then(() => {
      logger.info('registerPatientController: Paciente criado com sucesso');
      res.status(200).json('Paciente criado com sucesso');
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};

export const getPatientsByNutricionistaId = async (req, res) => {
  logger.info('getPatientsByNutricionistaIdController');
  const nutricionistaId = req.params.id;

  try {
    const patients = await getPatientsByNutricionistaIdService(nutricionistaId);
    logger.info(
      'getPatientsByNutricionistaIdController: Pacientes encontrados',
    );
    res.status(200).json(patients);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};

export const deletePatientById = async (req, res) => {
  logger.info('deletePatientByIdController');
  const pacienteId = req.params.id;

  try {
    const patients = await deletePatientByIdService(pacienteId);
    logger.info('deletePatientByIdController: Paciente deletado com sucesso');
    res.status(200).json(patients);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};

export const getPatientById = async (req, res) => {
  logger.info('getPatientByIdController');
  const pacienteId = req.params.id;

  try {
    const patients = await getPatientByIdService(pacienteId);
    logger.info('getPatientByIdController: Paciente recuperado com sucesso');
    res.status(200).json(patients);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};

export const updatePatientById = async (req, res) => {
  logger.info('Update Patient Controller called');
  const pacienteId = req.params.id;
  const newData = req.body;

  try {
    const paciente = await updatePatientByIdService(pacienteId, newData);
    res.status(200).json(paciente);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};

export const getPatientEvolutionHistory = async (req, res) => {
  logger.info('getPatientEvolutionHistoryController');
  const pacienteId = req.params.id;

  try {
    const patients = await getPatientEvolutionHistoryService(pacienteId);
    logger.info('getPatientEvolutionHistoryController: Paciente deletado com sucesso');
    res.status(200).json(patients);
  } catch (err) {
    logger.error(err.message);
    res.status(500).json(err.message);
  }
};

