import { db } from '../../../../db.js'; // Importe o módulo db
import { updateDietaService } from '../../../services/dietaService/updateDietaService.js'; // Altere o caminho conforme necessário
import winston from 'winston';

// Criação do mock para o logger
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

describe('updateDietaService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  test('should resolve with success message when dieta is updated successfully', async () => {
    // Simulação do comportamento de db.query para sucesso
    db.query = jest.fn((query, values, callback) => {
      callback(null); // Chama o callback com null para indicar sucesso
    });

    const result = await updateDietaService(1, 'active');

    expect(result).toBe('Dieta atualizada com sucesso');
    expect(db.query).toHaveBeenCalledWith(
      'UPDATE dieta SET status = ? WHERE dieta_id = ?',
      ['active', 1],
      expect.any(Function) // Espera que um callback qualquer seja passado
    );
    expect(winston.createLogger().info).toHaveBeenCalledWith(
      'updateDietaService: Dieta atualizada com sucesso'
    );
  });

  test('should reject with error message when there is a database error', async () => {
    // Simulação do comportamento de db.query para erro
    const errorMessage = 'Database error';
    db.query = jest.fn((query, values, callback) => {
      callback(new Error(errorMessage)); // Chama o callback com um erro
    });

    await expect(updateDietaService(1, 'inactive')).rejects.toThrow(errorMessage);
    expect(db.query).toHaveBeenCalledWith(
      'UPDATE dieta SET status = ? WHERE dieta_id = ?',
      ['inactive', 1],
      expect.any(Function)
    );
    expect(winston.createLogger().error).toHaveBeenCalledWith(errorMessage);
  });
});
