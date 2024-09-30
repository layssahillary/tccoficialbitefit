import { db } from '../../../../db.js';
import { deleteNutricionistByIdService } from '../../../services/nutritionistService/deleteNutricionistByIdService';
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

describe('deleteNutricionistByIdService', () => {
  const mockNutricionistaId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should delete nutricionista and their consultations successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('DELETE FROM consulta')) {
        callback(null); // Simulate successful deletion of consultations
      } else if (query.includes('DELETE FROM nutricionista')) {
        callback(null); // Simulate successful deletion of nutricionista
      }
    });

    await expect(
      deleteNutricionistByIdService(mockNutricionistaId),
    ).resolves.not.toThrow();
    expect(db.query).toHaveBeenCalledTimes(1);
    const logger = winston.createLogger();
  });

  test('should reject if there is an error deleting consultas', async () => {
    db.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Error deleting consultas')); // Simulate error on deleting consultations
    });

    await expect(
      deleteNutricionistByIdService(mockNutricionistaId),
    ).rejects.toThrow('Error deleting consultas');
  });

  test('should reject if there is an error deleting nutricionista', async () => {
    db.query.mockImplementationOnce((query, values, callback) => {
      callback(null); // Simulate successful deletion of consultations
    });

    db.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Error deleting nutricionista')); // Simulate error on deleting nutricionista
    });
  });
});
