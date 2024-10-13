import express from 'express';
import request from 'supertest';
import patientRouter from '../../../routes/patientRoute/patient'; // Altere para o caminho correto do seu arquivo de rotas

// Mock do controlador
jest.mock('../../../controllers/patientController/patientController.js', () => ({
  registerPatient: jest.fn((req, res) => {
    return res.status(200).json({ message: 'Paciente registrado com sucesso.' });
  }),
  getPatientsByNutricionistaId: jest.fn((req, res) => {
    const { id } = req.params;
    if (id === '1') {
      return res.status(200).json([{ id: '1', name: 'Paciente Exemplo' }]);
    }
    return res.status(404).json({ message: 'Nutricionista não encontrado.' });
  }),
  deletePatientById: jest.fn((req, res) => {
    const { id } = req.params;
    if (id === '1') {
      return res.status(200).json({ message: 'Paciente deletado com sucesso.' });
    }
    return res.status(404).json({ message: 'Paciente não encontrado.' });
  }),
  getPatientById: jest.fn((req, res) => {
    const { id } = req.params;
    if (id === '1') {
      return res.status(200).json({ id, name: 'Paciente Exemplo' });
    }
    return res.status(404).json({ message: 'Paciente não encontrado.' });
  }),
  updatePatientById: jest.fn((req, res) => {
    const { id } = req.params;
    if (id === '1') {
      return res.status(200).json({ message: 'Paciente atualizado com sucesso.' });
    }
    return res.status(404).json({ message: 'Paciente não encontrado.' });
  }),
  getPatientEvolutionHistory: jest.fn((req, res) => {
    const { id } = req.params;
    if (id === '1') {
      return res.status(200).json({ id, evolution: 'Histórico de evolução do paciente' });
    }
    return res.status(404).json({ message: 'Paciente não encontrado.' });
  }),
}));

const app = express();
app.use(express.json()); // Para parsing de JSON
app.use('/patient', patientRouter); // Monta as rotas

describe('Patient Routes', () => {
  it('should register a patient successfully', async () => {
    const response = await request(app)
      .post('/patient/patientRegister')
      .send({ name: 'Novo Paciente' }); // Exemplo de dados que podem ser enviados

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Paciente registrado com sucesso.');
  });

  it('should get patients by nutricionista ID successfully', async () => {
    const response = await request(app).get('/patient/getPatientsByNutricionistaId/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: '1', name: 'Paciente Exemplo' }]);
  });

  it('should return 404 when getting patients by invalid nutricionista ID', async () => {
    const response = await request(app).get('/patient/getPatientsByNutricionistaId/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Nutricionista não encontrado.');
  });

  it('should delete a patient by ID successfully', async () => {
    const response = await request(app).delete('/patient/deletePatientById/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Paciente deletado com sucesso.');
  });

  it('should return 404 when deleting a patient by invalid ID', async () => {
    const response = await request(app).delete('/patient/deletePatientById/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Paciente não encontrado.');
  });

  it('should get a patient by ID successfully', async () => {
    const response = await request(app).get('/patient/getPatientById/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'Paciente Exemplo' });
  });

  it('should return 404 when getting a patient by invalid ID', async () => {
    const response = await request(app).get('/patient/getPatientById/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Paciente não encontrado.');
  });

  it('should update a patient by ID successfully', async () => {
    const response = await request(app)
      .put('/patient/updatePatientById/1')
      .send({ name: 'Paciente Atualizado' }); // Exemplo de dados para atualização

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Paciente atualizado com sucesso.');
  });

  it('should return 404 when updating a patient by invalid ID', async () => {
    const response = await request(app)
      .put('/patient/updatePatientById/999')
      .send({ name: 'Paciente Atualizado' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Paciente não encontrado.');
  });

  it('should get patient evolution history successfully', async () => {
    const response = await request(app).get('/patient/getPatientEvolutionHistory/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', evolution: 'Histórico de evolução do paciente' });
  });

  it('should return 404 when getting evolution history for invalid patient ID', async () => {
    const response = await request(app).get('/patient/getPatientEvolutionHistory/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Paciente não encontrado.');
  });
});
