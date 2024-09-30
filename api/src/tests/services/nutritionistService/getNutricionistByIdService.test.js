import { db } from '../../../../db.js';
import { getNutricionistByIdService } from '../../../services/nutritionistService/getNutricionistByIdService';
import winston from 'winston';

// Mock the db module
jest.mock('../../../../db.js');
jest.mock('winston', () => {
  const logFn = jest.fn();
  return {
    createLogger: jest.fn(() => ({
      error: logFn,
      info: logFn,
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

describe('getNutricionistByIdService', () => {
  const mockNutricionistaId = 1;
  const mockNutricionistData = [{ nutricionista_id: mockNutricionistaId, name: 'Jane Doe' }];

  test('should retrieve a nutricionista successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null, mockNutricionistData); // Simulate successful query
    });

    const result = await getNutricionistByIdService(mockNutricionistaId);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockNutricionistData); // Check if the returned result matches the mock data
    const logger = winston.createLogger();
    expect(logger.info).toHaveBeenCalledWith('getNutricionistByIdService');
    expect(logger.info).toHaveBeenCalledWith('getNutricionistByIdService: Nutricionista recuperado com sucesso');
  });

  test('should reject if there is an error retrieving the nutricionista', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Error retrieving nutricionista')); // Simulate error
    });

    await expect(getNutricionistByIdService(mockNutricionistaId)).rejects.toThrow('Error retrieving nutricionista');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Error retrieving nutricionista');
  });
});
