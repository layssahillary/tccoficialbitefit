import express from 'express';
import request from 'supertest';
import consultaRouter from '../../../routes/consultaRoute/consulta'; // Altere para o caminho correto do seu arquivo de rotas

// Mock dos controladores
jest.mock('../../../controllers/consultacontroller/consultaController.js', () => ({
  scheduleConsultation: jest.fn((req, res) => res.status(200).json({ message: 'Consulta agendada com sucesso' })),
  updateConsultationStatus: jest.fn((req, res) => res.status(200).json({ message: 'Status da consulta atualizado com sucesso' })),
  getConsultasByNutricionistaId: jest.fn((req, res) => res.status(200).json([])),
  getConsultasByPacienteId: jest.fn((req, res) => res.status(200).json([])),
  deleteConsultaById: jest.fn((req, res) => res.status(200).json({ message: 'Consulta deletada com sucesso' })),
}));

const app = express();
app.use(express.json()); // Para parsing de JSON
app.use('/consultation', consultaRouter); // Monta as rotas

describe('Consulta Routes', () => {
  it('should schedule a consultation', async () => {
    const response = await request(app)
      .post('/consultation/scheduleConsultation')
      .send({ /* dados de consulta */ });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Consulta agendada com sucesso');
  });

  it('should update consultation status', async () => {
    const response = await request(app)
      .put('/consultation/updateConsultationStatus')
      .send({ id: 1, status: 'Agendada' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Status da consulta atualizado com sucesso');
  });

  it('should get consultations by nutricionista ID', async () => {
    const response = await request(app)
      .get('/consultation/getConsultasByNutricionistaId/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Espera uma lista vazia
  });

  it('should get consultations by paciente ID', async () => {
    const response = await request(app)
      .get('/consultation/getConsultasByPacienteId/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]); // Espera uma lista vazia
  });

  it('should delete a consultation by ID', async () => {
    const response = await request(app)
      .delete('/consultation/deleteConsultaById/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Consulta deletada com sucesso');
  });
});
