import { db } from '../../../../db.js';
import { nutritionistRegisterService } from '../../../services/nutritionistService/nutritionistRegisterService';
import winston from 'winston';

// Mock the db and winston modules
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

const mockNutritionist = {
  nome: 'Test Nutritionist',
  email: 'nutritionist@example.com',
  senha: 'password123',
  confirmarSenha: 'password123',
  crn: '12345',
};

describe('nutritionistRegisterService', () => {
  beforeEach(() => {
    // Limpar os mocks antes de cada teste
    jest.clearAllMocks();
  });

  test('should register a nutritionist successfully', async () => {
    // Simula a ausência do email no banco de dados
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('SELECT COUNT')) {
        callback(null, [{ count: 0 }]); // Email not found
      } else {
        callback(null); // Success on insert
      }
    });

    const result = await nutritionistRegisterService(mockNutritionist);

    expect(db.query).toHaveBeenCalledTimes(2); // Verifica se a query foi chamada duas vezes (SELECT e INSERT)
    expect(result).toBe('Nutricionista criado com sucesso');
    
    // Verifica se os logs de info foram chamados
    const logger = winston.createLogger();
    expect(logger.info).toHaveBeenCalledWith('nutritionistRegisterService');
    expect(logger.info).toHaveBeenCalledWith('nutritionistRegisterService: Nutricionista criado com sucesso');
  });

  test('should reject if required fields are missing', async () => {
    const incompleteNutritionist = { ...mockNutritionist, nome: '' }; // Nome vazio

    await expect(nutritionistRegisterService(incompleteNutritionist)).rejects.toThrow('Todos os campos são obrigatórios');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('nutritionistRegisterService: Todos os campos são obrigatórios');
  });

  test('should reject if passwords do not match', async () => {
    const invalidPasswordNutritionist = { ...mockNutritionist, confirmarSenha: 'differentPassword' };

    await expect(nutritionistRegisterService(invalidPasswordNutritionist)).rejects.toThrow('As senhas não coincidem');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('As senhas não coincidem');
  });

  test('should reject if email is already in use', async () => {
    // Simula a presença do email no banco de dados
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('SELECT COUNT')) {
        callback(null, [{ count: 1 }]); // Email already exists
      }
    });

    await expect(nutritionistRegisterService(mockNutritionist)).rejects.toThrow('O email já está em uso');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('nutritionistRegisterService: O email já está em uso');
  });

  test('should reject if there is a database error', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Database error')); // Simula erro no banco de dados
    });

    await expect(nutritionistRegisterService(mockNutritionist)).rejects.toThrow('Database error');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Database error');
  });
});
