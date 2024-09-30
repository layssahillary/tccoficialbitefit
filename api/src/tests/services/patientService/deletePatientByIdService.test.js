import { db } from '../../../../db.js';
import { deletePatientByIdService } from '../../../services/patientService/deletePatientByIdService.js';
import winston from 'winston';

// Mock the db module
jest.mock('../../../../db.js');
jest.mock('winston', () => {
  const logFn = jest.fn();
  return {
    createLogger: jest.fn(() => ({
      error: logFn,
      info: jest.fn(),
      transports: {
        Console: jest.fn(),
        File: jest.fn(),
      },
    })),
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
  };
});

describe('deletePatientByIdService', () => {
  const mockPacienteId = 1;

  test('should delete patient and their consultations successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('DELETE FROM consulta')) {
        callback(null); // Simulate successful deletion of consultations
      } else if (query.includes('DELETE FROM paciente')) {
        callback(null); // Simulate successful deletion of patient
      }
    });

    const result = await deletePatientByIdService(mockPacienteId);

    expect(db.query).toHaveBeenCalledTimes(2);
    expect(result).toBeUndefined();
  });

  test('should reject if there is an error deleting consultas', async () => {
    db.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Error deleting consultas')); // Simulate error on deleting consultations
    });

    await expect(deletePatientByIdService(mockPacienteId)).rejects.toThrow(
      'Error deleting consultas',
    );

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao excluir consultas:',
      'Error deleting consultas',
    );
  });

  test('should reject if there is an error deleting patient', async () => {
    db.query.mockImplementationOnce((query, values, callback) => {
      callback(null); // Simulate successful deletion of consultations
    });

    db.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Error deleting patient')); // Simulate error on deleting patient
    });

    await expect(deletePatientByIdService(mockPacienteId)).rejects.toThrow(
      'Error deleting patient',
    );

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith(
      'Erro ao excluir paciente:',
      'Error deleting patient',
    );
  });
});
