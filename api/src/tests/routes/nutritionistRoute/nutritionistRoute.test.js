import express from 'express';
import request from 'supertest';
import nutritionistRouter from '../../../routes/nutritionistRoute/nutritionistRoute'; // Altere para o caminho correto do seu arquivo de rotas

// Mock do controlador
jest.mock('../../../controllers/nutritionistController/nutritionistController.js', () => ({
  registerNutricionist: jest.fn((req, res) => {
    return res.status(200).json({ message: 'Nutricionista registrado com sucesso.' });
  }),
  getNutricionistById: jest.fn((req, res) => {
    const { id } = req.params;
    if (id === '1') {
      return res.status(200).json({ id, name: 'Nutricionista Exemplo' });
    }
    return res.status(404).json({ message: 'Nutricionista não encontrado.' });
  }),
  deleteNutricionistById: jest.fn((req, res) => {
    const { id } = req.params;
    if (id === '1') {
      return res.status(200).json({ message: 'Nutricionista deletado com sucesso.' });
    }
    return res.status(404).json({ message: 'Nutricionista não encontrado.' });
  }),
  updateNutricionistById: jest.fn((req, res) => {
    const { id } = req.params;
    if (id === '1') {
      return res.status(200).json({ message: 'Nutricionista atualizado com sucesso.' });
    }
    return res.status(404).json({ message: 'Nutricionista não encontrado.' });
  }),
}));

const app = express();
app.use(express.json()); // Para parsing de JSON
app.use('/nutricionist', nutritionistRouter); // Monta as rotas

describe('Nutritionist Routes', () => {
  it('should register a nutritionist successfully', async () => {
    const response = await request(app)
      .post('/nutricionist/nutricionistRegister')
      .send({ name: 'Novo Nutricionista' }); // Exemplo de dados que podem ser enviados

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nutricionista registrado com sucesso.');
  });

  it('should get a nutritionist by ID successfully', async () => {
    const response = await request(app).get('/nutricionist/getNutricionistById/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'Nutricionista Exemplo' });
  });

  it('should return 404 when getting a nutritionist by invalid ID', async () => {
    const response = await request(app).get('/nutricionist/getNutricionistById/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Nutricionista não encontrado.');
  });

  it('should delete a nutritionist by ID successfully', async () => {
    const response = await request(app).delete('/nutricionist/deleteNutricionistById/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nutricionista deletado com sucesso.');
  });

  it('should return 404 when deleting a nutritionist by invalid ID', async () => {
    const response = await request(app).delete('/nutricionist/deleteNutricionistById/999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Nutricionista não encontrado.');
  });

  it('should update a nutritionist by ID successfully', async () => {
    const response = await request(app)
      .put('/nutricionist/updateNutricionistById/1')
      .send({ name: 'Nutricionista Atualizado' }); // Exemplo de dados para atualização

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nutricionista atualizado com sucesso.');
  });

  it('should return 404 when updating a nutritionist by invalid ID', async () => {
    const response = await request(app)
      .put('/nutricionist/updateNutricionistById/999')
      .send({ name: 'Nutricionista Atualizado' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Nutricionista não encontrado.');
  });
});
