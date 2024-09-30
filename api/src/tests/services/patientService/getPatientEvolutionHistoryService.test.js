import { db } from '../../../../db.js';
import { getPatientEvolutionHistoryService } from '../../../services/patientService/getPatientEvolutionHistoryService.js';
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

describe('getPatientEvolutionHistoryService', () => {
  const mockPacienteId = 1;
  const mockEvolutionHistory = [
    { paciente_id: mockPacienteId, data_registro: '2023-09-01', details: 'First checkup' },
    { paciente_id: mockPacienteId, data_registro: '2023-09-10', details: 'Follow-up' },
  ];

  test('should retrieve patient evolution history successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, mockEvolutionHistory); // Simulate successful query
    });

    const result = await getPatientEvolutionHistoryService(mockPacienteId);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockEvolutionHistory); // Check if the returned result matches the mock data
  });

  test('should reject if there is an error retrieving the evolution history', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Error retrieving evolution history')); // Simulate error
    });

    await expect(getPatientEvolutionHistoryService(mockPacienteId)).rejects.toThrow('Error retrieving evolution history');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Error retrieving evolution history');
  });
});
