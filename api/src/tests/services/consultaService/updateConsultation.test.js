import { db } from '../../../../db.js';
import { updateConsultationStatusService } from '../../../services/consultaService/updateConsultation.js'; // ajuste o caminho conforme necessário

// Mock do db.query para simular o comportamento do banco de dados
jest.mock('../../../../db.js', () => ({
  db: {
    query: jest.fn(),
  },
}));

describe('updateConsultationStatusService', () => {
  const consultaId = 1;
  const status = 'Confirmada';

  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  it('deve atualizar o status da consulta com sucesso', async () => {
    // Mock do retorno da função db.query para simular sucesso
    db.query.mockImplementation((query, values, callback) => {
      callback(null); // Chama o callback sem erro
    });

    const result = await updateConsultationStatusService(consultaId, status);
    expect(result).toBe('Status da consulta atualizado com sucesso');
    expect(db.query).toHaveBeenCalledWith(
      'UPDATE consulta SET status = ? WHERE consulta_id = ?',
      [status, consultaId],
      expect.any(Function) // Espera que um callback qualquer tenha sido passado
    );
  });

  it('deve rejeitar com erro quando db.query falha', async () => {
    // Mock do retorno da função db.query para simular erro
    const errorMessage = 'Erro ao atualizar';
    db.query.mockImplementation((query, values, callback) => {
      callback(new Error(errorMessage)); // Chama o callback com um erro
    });

    await expect(updateConsultationStatusService(consultaId, status)).rejects.toThrow(errorMessage);
    expect(db.query).toHaveBeenCalledWith(
      'UPDATE consulta SET status = ? WHERE consulta_id = ?',
      [status, consultaId],
      expect.any(Function) // Espera que um callback qualquer tenha sido passado
    );
  });
});
