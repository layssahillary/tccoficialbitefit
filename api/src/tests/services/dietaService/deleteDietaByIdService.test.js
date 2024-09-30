import { db } from '../../../../db.js';
import { deleteDietaByIdService } from '../../../services/dietaService/deleteDietaByIdService.js';
import winston from 'winston';

// Mock the db and winston modules
jest.mock('../../../../db.js');
jest.mock('winston', () => {
  const logFn = jest.fn();
  return {
    createLogger: jest.fn(() => ({
      info: logFn,
      error: logFn,
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

describe('deleteDietaByIdService', () => {
  const mockDietaId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should delete dieta successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('DELETE FROM consulta')) {
        callback(null); // Simulate successful deletion of consultas
      } else if (query.includes('DELETE FROM dieta')) {
        callback(null); // Simulate successful deletion of dieta
      }
    });

    await deleteDietaByIdService(mockDietaId);
    
    expect(db.query).toHaveBeenCalledTimes(2); // Verify both DELETE queries were called

    const logger = winston.createLogger();
    expect(logger.info).toHaveBeenCalledWith('deleteDietaByIdService');
    expect(logger.info).toHaveBeenCalledWith('Dieta deletada com sucesso');
  });

  test('should reject if there is an error deleting consultas', async () => {
    db.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Erro ao excluir consultas')); // Simulate error on deleting consultas
    });

    await expect(deleteDietaByIdService(mockDietaId)).rejects.toThrow('Erro ao excluir consultas');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Erro ao excluir consultas:', 'Erro ao excluir consultas');
  });

  test('should reject if there is an error deleting dieta', async () => {
    db.query.mockImplementationOnce((query, values, callback) => {
      callback(null); // Simulate successful deletion of consultas
    });

    db.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Erro ao excluir Dieta')); // Simulate error on deleting dieta
    });

    await expect(deleteDietaByIdService(mockDietaId)).rejects.toThrow('Erro ao excluir Dieta');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Erro ao excluir Dieta:', 'Erro ao excluir Dieta');
  });
});
