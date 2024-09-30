import { db } from '../../../../db.js';
import { deleteConsultaByIdService } from '../../../services/consultaService/deleteConsultaByIdService.js';
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

describe('deleteConsultaByIdService', () => {
  const mockConsultaId = 1;

  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  test('deve excluir a consulta com sucesso', async () => {
    // Simula uma exclusão bem-sucedida de consulta
    db.query.mockImplementation((query, consultaId, callback) => {
      callback(null, { affectedRows: 1 });
    });

    const result = await deleteConsultaByIdService(mockConsultaId);

    expect(db.query).toHaveBeenCalledTimes(2); // A query é chamada duas vezes
    expect(winston.createLogger().info).toHaveBeenCalledWith('deleteConsultaByIdService'); // Verifica o log de info
    expect(winston.createLogger().info).toHaveBeenCalledWith('Consulta e consultas deletados com sucesso'); // Verifica o log de sucesso
    expect(result).toEqual({ affectedRows: 1 }); // Verifica o resultado da exclusão
  });

  test('deve falhar ao excluir a consulta devido a erro no banco de dados', async () => {
    // Simula um erro ao excluir a consulta
    db.query.mockImplementation((query, consultaId, callback) => {
      callback(new Error('Erro ao excluir consultas'));
    });

    await expect(deleteConsultaByIdService(mockConsultaId))
      .rejects
      .toThrow('Erro ao excluir consultas'); // Verifica se o erro é lançado

    expect(db.query).toHaveBeenCalledTimes(1); // A query é chamada apenas uma vez
    expect(winston.createLogger().error).toHaveBeenCalledWith('Erro ao excluir consultas:', 'Erro ao excluir consultas'); // Verifica o log de erro
  });

  test('deve falhar ao excluir a consulta devido a erro na segunda query', async () => {
    // Simula exclusão bem-sucedida na primeira query e erro na segunda query
    db.query
      .mockImplementationOnce((query, consultaId, callback) => {
        callback(null, { affectedRows: 1 }); // Primeira query bem-sucedida
      })
      .mockImplementationOnce((query, consultaId, callback) => {
        callback(new Error('Erro ao excluir Consulta')); // Segunda query com erro
      });

    await expect(deleteConsultaByIdService(mockConsultaId))
      .rejects
      .toThrow('Erro ao excluir Consulta'); // Verifica se o erro da segunda query é lançado

    expect(db.query).toHaveBeenCalledTimes(2); // A query é chamada duas vezes
    expect(winston.createLogger().error).toHaveBeenCalledWith('Erro ao excluir Consulta:', 'Erro ao excluir Consulta'); // Verifica o log de erro
  });
});
