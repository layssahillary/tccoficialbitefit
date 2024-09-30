// src/tests/services/dietaService/registerDietService.test.js
import { dietaRegisterService } from '../../../services/dietaService/registerDietService';
const db = require('../../../../db'); // Certifique-se de que o caminho está correto
const winston = require('winston');

jest.mock('../../../../db');

describe('dietaRegisterService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should reject if there is a database error on dieta insert', async () => {
    db.beginTransaction.mockImplementation((callback) => callback(null));
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('INSERT INTO dieta')) {
        return callback(new Error('Database error'), null); // Simula erro de banco
      }
      // ... (outras simulações de consulta, se necessário)
    });

    await expect(dietaRegisterService(mockDieta)).rejects.toThrow(
      'Database error',
    );

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Database error'),
    );
  });

  test('should reject if there is a database error on refeicao insert', async () => {
    db.beginTransaction.mockImplementation((callback) => callback(null));
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('INSERT INTO refeicao')) {
        return callback(new Error('Database error'), null);
      }
      // ... (outras simulações de consulta, se necessário)
    });

    await expect(dietaRegisterService(mockDieta)).rejects.toThrow(
      'Database error',
    );

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Database error'),
    );
  });

  test('should reject if there is a database error on alimento insert', async () => {
    db.beginTransaction.mockImplementation((callback) => callback(null));
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('INSERT INTO alimento')) {
        return callback(new Error('Database error'), null);
      }
      // ... (outras simulações de consulta, se necessário)
    });

    await expect(dietaRegisterService(mockDieta)).rejects.toThrow(
      'Database error',
    );

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining('Database error'),
    );
  });

  // Adicione mais testes conforme necessário
});
