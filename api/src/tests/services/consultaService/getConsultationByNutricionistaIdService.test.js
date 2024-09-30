import { db } from '../../../../db.js';
import { getConsultasByNutricionistaIdService } from '../../../services/consultaService/getConsultationByNutricionistaIdService.js';
import winston from 'winston';

// Mock do módulo db
jest.mock('../../../../db.js');

// Mock do logger winston
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

describe('getConsultasByNutricionistaIdService', () => {
  const mockNutricionistaId = 1;

  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  test('deve retornar consultas com sucesso', async () => {
    const mockResult = [{ consulta_id: 1, nutricionista_id: mockNutricionistaId, descricao: 'Consulta 1' }];

    // Simula uma resposta bem-sucedida do banco de dados
    db.query.mockImplementation((query, params, callback) => {
      callback(null, mockResult);
    });

    const result = await getConsultasByNutricionistaIdService(mockNutricionistaId);

    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM consulta WHERE nutricionista_id = ?',
      [mockNutricionistaId],
      expect.any(Function)
    );
    expect(result).toEqual(mockResult);
  });

  test('deve falhar ao buscar consultas devido a um erro no banco de dados', async () => {
    const mockError = new Error('Erro ao buscar consultas');

    // Simula um erro ao realizar a consulta no banco de dados
    db.query.mockImplementation((query, params, callback) => {
      callback(mockError);
    });

    await expect(getConsultasByNutricionistaIdService(mockNutricionistaId))
      .rejects
      .toThrow('Erro ao buscar consultas');

    expect(db.query).toHaveBeenCalledWith(
      'SELECT * FROM consulta WHERE nutricionista_id = ?',
      [mockNutricionistaId],
      expect.any(Function)
    );
    expect(winston.createLogger().error).toHaveBeenCalledWith(mockError.message);
  });
});
