import { db } from '../../../../db.js';
import { scheduleConsultationService } from '../../../services/consultaService/scheduleConsultation.js';
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

const mockConsulta = {
  paciente_id: 1,
  nutricionista_id: 1,
  dataConsulta: '2024-10-01',
  horaConsulta: '10:00:00',
  observacao: 'Consulta de rotina',
};

describe('scheduleConsultationService', () => {
  beforeEach(() => {
    // Limpar os mocks antes de cada teste
    jest.clearAllMocks();
  });

  test('should schedule a consultation successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(null); // Success on insert
    });

    const result = await scheduleConsultationService(mockConsulta);

    expect(db.query).toHaveBeenCalledTimes(1); // Verifica se a query foi chamada uma vez (INSERT)
    expect(result).toBe('Consulta agendada com sucesso');

    // Verifica se os logs de info foram chamados
    const logger = winston.createLogger();
    expect(logger.info).toHaveBeenCalledWith('scheduleConsultationService');
    expect(logger.info).toHaveBeenCalledWith('scheduleConsultationService: Consulta agendada com sucesso');
  });

  test('should reject if required fields are missing', async () => {
    const incompleteConsulta = { ...mockConsulta, paciente_id: null }; // paciente_id vazio

    await expect(scheduleConsultationService(incompleteConsulta)).rejects.toThrow('Todos os campos são obrigatórios');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('scheduleConsultationService: Todos os campos são obrigatórios');
  });

  test('should reject if there is a database error', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Database error')); // Simula erro no banco de dados
    });

    await expect(scheduleConsultationService(mockConsulta)).rejects.toThrow('Database error');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Database error');
  });
});
