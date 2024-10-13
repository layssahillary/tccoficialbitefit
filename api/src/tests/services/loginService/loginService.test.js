import { loginService } from '../../../services/loginService/loginService'; // Ajuste o caminho conforme necessário
import winston from 'winston';
import jwt from 'jsonwebtoken';

// Mock the logger instance
jest.mock('winston', () => {
  const winstonMock = {
    info: jest.fn(),
    error: jest.fn(),
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
    createLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      error: jest.fn(),
    }),
  };
  return winstonMock;
});


// Mocking database query
jest.mock('../../../../db.js', () => ({
  db: {
    query: jest.fn(),
  },
}));

describe('loginService', () => {
  const mockUser = { email: 'test@test.com', senha: 'password' };

  let mockLogger;

  // Reset logger and DB mocks before each test
  beforeEach(() => {
    mockLogger = winston.createLogger();
    jest.clearAllMocks();
  });

  test('should resolve with nutricionista user on successful login', async () => {
    const mockResultsNutricionista = [{ nutricionista_id: 1, nome: 'Nutricionista Teste', email: mockUser.email }];

    // Mock DB query for nutricionista
    require('../../../../db.js').db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, mockResultsNutricionista);
    });

    const result = await loginService(mockUser);

    expect(result).toHaveProperty('token');
    expect(result.user).toEqual(expect.objectContaining({
      id: mockResultsNutricionista[0].nutricionista_id,
      nome: mockResultsNutricionista[0].nome,
      email: mockResultsNutricionista[0].email,
      tipo: 'nutricionista',
    }));

    // Assert logger.info was called with the correct message
    expect(mockLogger.info).toHaveBeenCalledWith(`Usuário ${mockUser.email} fez login`);
  });

  test('should resolve with paciente user on successful login', async () => {
    const mockResultsPaciente = [{ paciente_id: 1, nome: 'Paciente Teste', email: mockUser.email }];

    // Mock DB query for nutricionista (no results)
    require('../../../../db.js').db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, []);
    });

    // Mock DB query for paciente
    require('../../../../db.js').db.query.mockImplementationOnce((query, params, callback) => {
      callback(null, mockResultsPaciente);
    });

    const result = await loginService(mockUser);

    expect(result).toHaveProperty('token');
    expect(result.user).toEqual(expect.objectContaining({
      id: mockResultsPaciente[0].paciente_id,
      nome: mockResultsPaciente[0].nome,
      email: mockResultsPaciente[0].email,
      tipo: 'paciente',
    }));

    // Assert logger.info was called with the correct message
    expect(mockLogger.info).toHaveBeenCalledWith(`Usuário ${mockUser.email} fez login`);
  });

  test('should reject with "Usuário não encontrado" error if no user found', async () => {
    // Mock DB queries for nutricionista and paciente (no results)
    require('../../../../db.js').db.query.mockImplementation((query, params, callback) => {
      callback(null, []);
    });

    await expect(loginService(mockUser)).rejects.toThrow('Usuário não encontrado');

    // Assert logger.error was called with the correct message
    expect(mockLogger.error).toHaveBeenCalledWith('Usuário não encontrado');
  });

  test('should reject if there is a database error on nutricionista query', async () => {
    const dbError = new Error('Database error');

    // Mock DB query for nutricionista (error)
    require('../../../../db.js').db.query.mockImplementationOnce((query, params, callback) => {
      callback(dbError);
    });

    await expect(loginService(mockUser)).rejects.toThrow('Database error');

    // Assert logger.error was called with the correct message
    expect(mockLogger.error).toHaveBeenCalledWith('Database error');
  });

  test('should reject if token is invalid', async () => {
    const invalidTokenUser = { token: 'invalid.token.here' };

    jest.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
      callback(new Error('Token inválido'));
    });

    await expect(loginService(invalidTokenUser)).rejects.toThrow('Token inválido');

    // Assert logger.error was called with the correct message
    expect(mockLogger.error).toHaveBeenCalledWith('Token inválido');
  });
});
