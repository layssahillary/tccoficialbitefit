import { db } from '../../../../db.js';
import { updateNutricionistByIdService } from '../../../services/nutritionistService/updateNutricionistByIdService.js';

// Mock do módulo db
jest.mock('../../../../db.js');

describe('updateNutricionistByIdService', () => {
  const mockNutricionistaId = 1;
  const updatedNutricionistaData = {
    nome: 'Updated Nutricionista',
    email: 'updated@nutricionista.com',
    senha: 'newpassword123',
    confirmarSenha: 'newpassword123',
    celular: '1234567890',
    crn: '123456',
    horarioInicio: '08:00',
    horarioFim: '18:00',
    diasSemanas: 'Segunda a Sexta',
    especialidade: 'Nutrição Esportiva',
    endereco: 'Rua dos Nutricionistas, 123',
    cpf: '12345678900',
    dataNascimento: '1985-05-15',
    instagram: '@updated_nutri',
    linkedin: 'linkedin.com/in/updatednutri',
    whatsapp: '9876543210',
  };

  test('deve atualizar o nutricionista com sucesso', async () => {
    db.query.mockImplementation((query, values, callback) => {
      // Simula uma atualização bem-sucedida
      callback(null);
    });

    const result = await updateNutricionistByIdService(mockNutricionistaId, updatedNutricionistaData);

    expect(db.query).toHaveBeenCalledTimes(1); // Verifica se a query foi chamada uma vez
    expect(result).toBe('Nutricionista atualizado com sucesso'); // Verifica a mensagem de retorno
  });

  test('deve falhar ao atualizar o nutricionista quando ocorre um erro na query', async () => {
    db.query.mockImplementation((query, values, callback) => {
      // Simula um erro durante a atualização
      callback(new Error('Erro ao atualizar o nutricionista'));
    });

    await expect(updateNutricionistByIdService(mockNutricionistaId, updatedNutricionistaData))
      .rejects
      .toThrow('Erro ao atualizar o nutricionista'); // Verifica se o erro foi lançado
  });

  test('deve atualizar apenas campos fornecidos', async () => {
    const partialData = { nome: 'Updated Name' }; // Dados parciais
    db.query.mockImplementation((query, values, callback) => {
      callback(null); // Simula sucesso
    });

    const result = await updateNutricionistByIdService(mockNutricionistaId, partialData);

    expect(db.query).toHaveBeenCalledTimes(3); // Query chamada uma vez
    expect(result).toBe('Nutricionista atualizado com sucesso'); // Mensagem de sucesso
  });
});
