import express from 'express';
import request from 'supertest';
import dietaRouter from '../../../routes/dietaRoute/dieta'; // Altere para o caminho correto do seu arquivo de rotas

// Mock dos controladores
jest.mock('../../../controllers/dietaController/dietaController.js', () => ({
  registerDieta: jest.fn((req, res) => res.status(200).json({ message: 'Dieta criada com sucesso' })),
  updateDieta: jest.fn((req, res) => res.status(200).json({ message: 'Dieta atualizada com sucesso' })),
  getDietaByPacienteId: jest.fn((req, res) => res.status(200).json([])),
  deleteDietaById: jest.fn((req, res) => res.status(200).json({ message: 'Dieta deletada com sucesso' })),
}));

const app = express();
app.use(express.json()); // Para parsing de JSON
app.use('/dieta', dietaRouter); // Monta as rotas

describe('Dieta Routes', () => {
  it('should register a new dieta', async () => {
    const response = await request(app)
      .post('/dieta/dietaRegister')
      .send({ /* dados da dieta */ });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Dieta criada com sucesso');
  });

  it('should update a dieta', async () => {
    const response = await request(app)
      .put('/dieta/updateDieta')
      .send({ id: 1, status: 'Agendada' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Dieta atualizada com sucesso');
  });

  it('should get dieta by paciente ID', async () => {
    const response = await request(app)
      .get('/dieta/getDietaByPacienteId/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Espera uma lista vazia
  });

  it('should delete a dieta by ID', async () => {
    const response = await request(app)
      .delete('/dieta/deleteDietaById/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Dieta deletada com sucesso');
  });
});
