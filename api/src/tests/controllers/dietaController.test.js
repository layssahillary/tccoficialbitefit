
import request from 'supertest';
import express from 'express';
import {
  registerDieta,
  updateDieta,
  getDietaByPacienteId,
  deleteDietaById,
} from '../../controllers/dietaController/dietaController.js';

jest.mock('../../../src/services/dietaService/registerDietService.js', () => ({
  dietaRegisterService: jest.fn().mockResolvedValue({ message: 'Dieta criada com sucesso' }),
}));

jest.mock('../../../src/services/dietaService/updateDietaService.js', () => ({
  updateDietaService: jest.fn().mockResolvedValue({
    message: 'Status da consulta atualizado com sucesso',
  }),
}));

jest.mock('../../../src/services/dietaService/getDietaByPacienteIdService.js', () => ({
  getDietaByPacienteIdService: jest.fn().mockResolvedValue([{ id: 1, details: 'Dieta 1' }]),
}));

jest.mock('../../../src/services/dietaService/deleteDietaByIdService.js', () => ({
  deleteDietaByIdService: jest.fn().mockResolvedValue({ message: 'Dieta deletada com sucesso' }),
}));

const app = express();
app.use(express.json());
app.post('/dieta/register', registerDieta);
app.put('/dieta/update', updateDieta);
app.get('/dieta/paciente/:paciente_id', getDietaByPacienteId);
app.delete('/dieta/:id', deleteDietaById);


describe('Teste dos Controllers de Dieta', () => {
  it('Deve registrar dieta com sucesso (status 200)', async () => {
    const res = await request(app)
      .post('/dieta/register')
      .send({ dieta: 'dados_da_dieta' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Dieta criada com sucesso');
  });

  it('Deve atualizar o status da dieta com sucesso (status 200)', async () => {
    const res = await request(app)
      .put('/dieta/update')
      .send({ id: 1, status: 'approved' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Status da consulta atualizado com sucesso');
  });

  it('Deve obter dietas pelo ID do paciente (status 200)', async () => {
    const res = await request(app).get('/dieta/paciente/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{ id: 1, details: 'Dieta 1' }]);
  });

  it('Deve deletar dieta pelo ID (status 200)', async () => {
    const res = await request(app).delete('/dieta/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ message: 'Dieta deletada com sucesso' });
  });

  it('Deve retornar erro ao registrar dieta (status 500)', async () => {
    const errorMessage = 'Erro ao registrar dieta';
    const dietaRegisterService = require('../../services/dietaService/registerDietService.js').dietaRegisterService;
    dietaRegisterService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app)
      .post('/dieta/register')
      .send({ dieta: 'dados_da_dieta' });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao atualizar o status da dieta (status 500)', async () => {
    const errorMessage = 'Erro ao atualizar status da dieta';
    const updateDietaService = require('../../services/dietaService/updateDietaService.js').updateDietaService;
    updateDietaService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app)
      .put('/dieta/update')
      .send({ id: 1, status: 'approved' });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao obter dietas pelo ID do paciente (status 500)', async () => {
    const errorMessage = 'Erro ao obter dietas pelo paciente';
    const getDietaByPacienteIdService = require('../../services/dietaService/getDietaByPacienteIdService.js').getDietaByPacienteIdService;
    getDietaByPacienteIdService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).get('/dieta/paciente/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao deletar dieta pelo ID (status 500)', async () => {
    const errorMessage = 'Erro ao deletar dieta';
    const deleteDietaByIdService = require('../../services/dietaService/deleteDietaByIdService.js').deleteDietaByIdService;
    deleteDietaByIdService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).delete('/dieta/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

});
