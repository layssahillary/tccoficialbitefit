import { db } from '../../../../db.js';
import { getPatientsByNutricionistaIdService } from '../../../services/patientService/getPatientsByNutricionistaIdService.js';
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

describe('getPatientsByNutricionistaIdService', () => {
  const mockNutricionistaId = 1;
  const mockPatients = [
    { paciente_id: 1, name: 'Patient A', nutricionista_id: mockNutricionistaId },
    { paciente_id: 2, name: 'Patient B', nutricionista_id: mockNutricionistaId },
  ];

  test('should retrieve patients by nutricionista ID successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, mockPatients); // Simulate successful query
    });

    await getPatientsByNutricionistaIdService(mockNutricionistaId);

    expect(db.query).toHaveBeenCalledTimes(1);
  });

  test('should reject if there is an error retrieving patients', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Error retrieving patients')); // Simulate error
    });

    await expect(getPatientsByNutricionistaIdService(mockNutricionistaId)).rejects.toThrow('Error retrieving patients');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Error retrieving patients');
  });
});
