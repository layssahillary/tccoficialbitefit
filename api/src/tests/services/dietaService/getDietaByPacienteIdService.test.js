import { db } from '../../../../db.js';
import { getDietaByPacienteIdService } from '../../../services/dietaService/getDietaByPacienteIdService'; // Ajuste o caminho conforme necessário
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

describe('getDietaByPacienteIdService', () => {
  const mockPacienteId = 1;
  const mockDietaData = [
    {
      dieta_id: 1,
      paciente_id: mockPacienteId,
      data_inicio: '2024-01-01',
      data_termino: '2024-01-07',
      objetivo: 'Perda de peso',
      observacao: 'Evitar açúcar',
      refeicoes: [
        {
          refeicao_id: 1,
          tipo_refeicao: 'Café da Manhã',
          horario: '08:00',
          alimentos: [
            {
              alimento_id: 1,
              nome: 'Aveia',
              grupo_alimentar: 'Cereais',
              calorias: 100,
              quantidade: 50,
            },
          ],
        },
      ],
    },
  ];

  test('should retrieve dieta successfully', async () => {
    // Mocking the SQL response to return rows similar to the expected output
    db.query.mockImplementation((query, values, callback) => {
      callback(null, [
        {
          dieta_id: 1,
          paciente_id: mockPacienteId,
          data_inicio: '2024-01-01',
          data_termino: '2024-01-07',
          objetivo: 'Perda de peso',
          observacao: 'Evitar açúcar',
          refeicao_id: 1,
          tipo_refeicao: 'Café da Manhã',
          horario: '08:00',
          alimento_id: 1,
          nome: 'Aveia',
          grupo_alimentar: 'Cereais',
          calorias: 100,
          alimento_quantidade: 50,
        },
      ]);
    });

    const result = await getDietaByPacienteIdService(mockPacienteId);

    expect(db.query).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockDietaData);
    const logger = winston.createLogger();
    expect(logger.info).toHaveBeenCalledWith('getDietaByPacienteIdService');
  });

  test('should reject if there is an error retrieving the dieta', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Error retrieving dieta'));
    });

    await expect(getDietaByPacienteIdService(mockPacienteId)).rejects.toThrow('Error retrieving dieta');

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Error retrieving dieta');
  });
});

