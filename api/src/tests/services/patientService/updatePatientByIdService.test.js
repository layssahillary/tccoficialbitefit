import { db } from '../../../../db.js';
import { updatePatientByIdService } from '../../../services/patientService/updatePatientByIdService.js';
import winston from 'winston';

// Mock the db module
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

describe('updatePatientByIdService', () => {
  const mockPatientId = 1;
  const updatedPatientData = {
    nome: 'Updated Patient',
    email: 'updated@example.com',
    dataNascimento: '1990-01-01',
    altura: 180,
    peso: 75,
    gordura_corporal: 20,
    senha: 'newpassword',
    confirmar_senha: 'newpassword',
    objetivo: 'Gain Muscle',
    nutricionista_id: 2,
    paciente_img: 'image.png',
    genero: 'Male',
    telefone: '1234567890',
    observacao: 'No allergies',
    historico_familiar_doencas: 'None',
    doencas_cronicas: 'None',
    medicamentos_em_uso: 'None',
    exames_de_sangue_relevantes: 'None',
    alergia: 'None',
    restricao_alimentar: 'None',
    habitos_alimentares: 'None',
    frequencia_exercicio_semanal: '3',
    circunferencia_bracos: 30,
    circunferencia_cintura: 80,
    circunferencia_quadril: 95,
    circunferencia_pernas: 50,
  };

  test('should update patient successfully and save historical data', async () => {
    db.query.mockImplementation((query, values, callback) => {
      // Simulate successful patient update
      if (query.includes('UPDATE paciente')) {
        return callback(null);
      }

      // Simulate successful insertion into paciente_historico
      if (query.includes('INSERT INTO paciente_historico')) {
        return callback(null);
      }
    });

    const result = await updatePatientByIdService(mockPatientId, updatedPatientData);

    expect(db.query).toHaveBeenCalledTimes(2); // Two queries should be executed
    expect(result).toBe('Paciente atualizado com sucesso e histórico salvo'); // Check the returned message
  });

  test('should update patient successfully without saving historical data', async () => {
    const dataWithoutHistory = { ...updatedPatientData, peso: null, gordura_corporal: null };

    db.query.mockImplementation((query, values, callback) => {
      // Simulate successful patient update
      if (query.includes('UPDATE paciente')) {
        return callback(null);
      }

      // No historical data insertion should happen
      return callback(null);
    });

    const result = await updatePatientByIdService(mockPatientId, dataWithoutHistory);

    expect(db.query).toHaveBeenCalledTimes(3); // Only one query should be executed
    expect(result).toBe('Paciente atualizado com sucesso'); // Check the returned message
  });

  test('should reject if there is an error updating the patient', async () => {
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error('Error updating patient')); // Simulate error
    });

    await expect(updatePatientByIdService(mockPatientId, updatedPatientData)).rejects.toThrow('Error updating patient');
  });

  test('should reject if there is an error inserting historical data', async () => {
    db.query.mockImplementation((query, values, callback) => {
      // Simulate successful patient update
      if (query.includes('UPDATE paciente')) {
        return callback(null);
      }

      // Simulate error while inserting historical data
      if (query.includes('INSERT INTO paciente_historico')) {
        return callback(new Error('Error inserting historical data'));
      }
    });

    await expect(updatePatientByIdService(mockPatientId, updatedPatientData)).rejects.toThrow('Error inserting historical data');
  });
});
