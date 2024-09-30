import { db } from '../../../../db.js';
import { getPatientByIdService } from '../../../services/patientService/getPatientByIdService.js';
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

describe('getPatientByIdService', () => {
  const mockPacienteId = 1;
  const mockPatientData = [{ paciente_id: mockPacienteId, name: 'John Doe' }];

  test('should retrieve a patient successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, mockPatientData); // Simulate successful query
    });

    const result = await getPatientByIdService(mockPacienteId);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockPatientData); // Check if the returned result matches the mock data
  });

  test('should reject if there is an error retrieving the patient', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Error retrieving patient')); // Simulate error
    });

    await expect(getPatientByIdService(mockPacienteId)).rejects.toThrow('Error retrieving patient');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Error retrieving patient');
  });
});
