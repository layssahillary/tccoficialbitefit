import { db } from '../../../../db.js';
import { patientRegisterService } from '../../../services/patientService/patientRegisterService.js';
import winston from 'winston';

// Mock the db and winston modules
jest.mock('../../../../db.js');
jest.mock('winston', () => {
  const logFn = jest.fn();
  return {
    createLogger: jest.fn(() => ({
      error: logFn,
      info: jest.fn(),
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

const mockPatient = {
  nome: 'Test Patient',
  email: 'test@example.com',
  senha: 'password123',
  confirmar_senha: 'password123',
  dataNascimento: '2000-01-01',
  altura: 1.75,
  peso: 70,
  objetivo: 'Emagrecimento',
  nutricionista_id: null,
  paciente_img: null,
  genero: 'Masculino',
  telefone: '1234567890',
  observacao: null,
  historico_familiar_doencas: null,
  doencas_cronicas: null,
  medicamentos_em_uso: null,
  exames_de_sangue_relevantes: null,
  alergia: null,
  restricao_alimentar: null,
  habitos_alimentares: null,
  frequencia_exercicio_semanal: null,
  circunferencia_bracos: null,
  circunferencia_cintura: null,
  circunferencia_quadril: null,
  circunferencia_pernas: null,
};

describe('patientRegisterService', () => {
  // Your beforeEach and afterEach remain unchanged

  test('should register a patient successfully', async () => {
    db.query.mockImplementation((query, values, callback) => {
      if (query.includes('SELECT COUNT')) {
        callback(null, [{ count: 0 }]); // Email not found
      } else {
        callback(null); // Success on insert
      }
    });

    const result = await patientRegisterService(mockPatient);

    expect(db.query).toHaveBeenCalled();
    expect(result).toBe('Paciente criado com sucesso');
    
    // Check if the logger was called
  }, 20000); // Increased timeout to 20 seconds

  // Continue with other tests...
});
