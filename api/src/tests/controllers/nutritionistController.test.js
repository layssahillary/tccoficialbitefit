// src/tests/nutricionistaController.test.js
import request from 'supertest';
import express from 'express';
import {
  registerNutricionist,
  getNutricionistById,
  deleteNutricionistById,
  updateNutricionistById,
} from '../../controllers/nutritionistController/nutritionistController.js'; 

jest.mock('../../../src/services/nutritionistService/nutritionistRegisterService', () => ({
  nutritionistRegisterService: jest
    .fn()
    .mockResolvedValue({ message: 'Nutricionista criado com sucesso' }),
}));

jest.mock('../../../src/services/nutritionistService/getNutricionistByIdService', () => ({
  getNutricionistByIdService: jest
    .fn()
    .mockResolvedValue({ id: 1, name: 'Nutricionista 1' }),
}));

jest.mock('../../../src/services/nutritionistService/deleteNutricionistByIdService', () => ({
  deleteNutricionistByIdService: jest
    .fn()
    .mockResolvedValue('Nutricionista deletado com sucesso'),
}));

jest.mock('../../../src/services/nutritionistService/updateNutricionistByIdService', () => ({
  updateNutricionistByIdService: jest
    .fn()
    .mockResolvedValue('Nutricionista atualizado com sucesso'),
}));


const app = express();
app.use(express.json());
app.post('/register', registerNutricionist);
app.get('/nutricionista/:id', getNutricionistById);
app.delete('/nutricionista/:id', deleteNutricionistById);
app.put('/nutricionista/:id', updateNutricionistById);

// Start the tests
describe('Teste dos Controllers de Nutricionista', () => {
  it('Deve registrar nutricionista com sucesso (status 200)', async () => {
    const res = await request(app)
      .post('/register')
      .send({ name: 'Nutricionista 1' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Nutricionista criado com sucesso');
  });

  it('Deve obter nutricionista pelo ID (status 200)', async () => {
    const res = await request(app).get('/nutricionista/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ id: 1, name: 'Nutricionista 1' });
  });

  it('Deve deletar nutricionista pelo ID (status 200)', async () => {
    const res = await request(app).delete('/nutricionista/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Nutricionista deletado com sucesso');
  });

  it('Deve atualizar nutricionista pelo ID com sucesso (status 200)', async () => {
    const res = await request(app)
      .put('/nutricionista/1')
      .send({ name: 'Nutricionista Atualizado' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual("Nutricionista atualizado com sucesso");
  });

  it('Deve retornar erro ao registrar nutricionista (status 500)', async () => {
    const errorMessage = 'Erro ao registrar nutricionista';
    const nutritionistRegisterService = require('../../services/nutritionistService/nutritionistRegisterService.js').nutritionistRegisterService;
    nutritionistRegisterService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app)
      .post('/register')
      .send({ name: 'Nutricionista 1' });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao obter nutricionista pelo ID (status 500)', async () => {
    const errorMessage = 'Erro ao obter nutricionista';
    const getNutricionistByIdService = require('../../services/nutritionistService/getNutricionistByIdService.js').getNutricionistByIdService;
    getNutricionistByIdService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).get('/nutricionista/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao deletar nutricionista pelo ID (status 500)', async () => {
    const errorMessage = 'Erro ao deletar nutricionista';
    const deleteNutricionistByIdService = require('../../services/nutritionistService/deleteNutricionistByIdService.js').deleteNutricionistByIdService;
    deleteNutricionistByIdService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).delete('/nutricionista/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao atualizar nutricionista pelo ID (status 500)', async () => {
    const errorMessage = 'Erro ao atualizar nutricionista';
    const updateNutricionistByIdService = require('../../services/nutritionistService/updateNutricionistByIdService.js').updateNutricionistByIdService;
    updateNutricionistByIdService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app)
      .put('/nutricionista/1')
      .send({ name: 'Nutricionista Atualizado' });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  // Add more tests as needed
});
