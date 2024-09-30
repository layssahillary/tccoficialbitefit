
import request from 'supertest';
import express from 'express';
import {
  deleteConsultaById,
  getConsultasByPacienteId,
  getConsultasByNutricionistaId,
  updateConsultationStatus,
  scheduleConsultation,
} from '../../controllers/consultacontroller/consultaController.js';


jest.mock('../../../src/services/consultaService/scheduleConsultation', () => ({
  scheduleConsultationService: jest
    .fn()
    .mockResolvedValue({ message: 'Consulta agendada com sucesso' }),
}));

jest.mock('../../../src/services/consultaService/updateConsultation', () => ({
  updateConsultationStatusService: jest.fn().mockResolvedValue({
    message: 'Status da consulta atualizado com sucesso',
  }),
}));

jest.mock(
  '../../../src/services/consultaService/getConsultationByNutricionistaIdService.js',
  () => ({
    getConsultasByNutricionistaIdService: jest
      .fn()
      .mockResolvedValue([{ id: 1, details: 'Consulta 1' }]),
  }),
);

jest.mock(
  '../../../src/services/consultaService/getConsultasByPacienteIdService.js',
  () => ({
    getConsultasByPacienteIdService: jest
      .fn()
      .mockResolvedValue([{ id: 2, details: 'Consulta 2' }]),
  }),
);

jest.mock(
  '../../../src/services/consultaService/deleteConsultaByIdService.js',
  () => ({
    deleteConsultaByIdService: jest
      .fn()
      .mockResolvedValue('Consulta deletada com sucesso'),
  }),
);

const app = express();
app.use(express.json());
app.post('/schedule', scheduleConsultation);
app.put('/consultas/status', updateConsultationStatus);
app.get(
  '/consultas/nutricionista/:nutricionista_id',
  getConsultasByNutricionistaId,
);
app.get('/consultas/paciente/:paciente_id', getConsultasByPacienteId);
app.delete('/consultas/:id', deleteConsultaById);


describe('Teste dos Controllers', () => {
  it('Deve agendar consulta com sucesso (status 200)', async () => {
    const res = await request(app)
      .post('/schedule')
      .send({ consulta: 'dados_da_consulta' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Consulta agendada com sucesso');
  });

  it('Deve atualizar o status da consulta com sucesso (status 200)', async () => {
    const res = await request(app)
      .put('/consultas/status')
      .send({ id: 1, status: 'confirmed' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Status da consulta atualizado com sucesso');
  });

  it('Deve obter consultas pelo ID do nutricionista (status 200)', async () => {
    const res = await request(app).get('/consultas/nutricionista/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{ id: 1, details: 'Consulta 1' }]);
  });

  it('Deve obter consultas pelo ID do paciente (status 200)', async () => {
    const res = await request(app).get('/consultas/paciente/2');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{ id: 2, details: 'Consulta 2' }]);
  });

  it('Deve deletar consulta pelo ID (status 200)', async () => {
    const res = await request(app).delete('/consultas/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('Consulta deletada com sucesso' );
  });

  it('Deve retornar erro ao agendar consulta (status 500)', async () => {
    const errorMessage = 'Erro ao agendar consulta';
    const scheduleConsultationService =
      require('../../services/consultaService/scheduleConsultation.js').scheduleConsultationService;
    scheduleConsultationService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app)
      .post('/schedule')
      .send({ consulta: 'dados_da_consulta' });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao atualizar o status da consulta (status 500)', async () => {
    const errorMessage = 'Erro ao atualizar status da consulta';
    const updateConsultationStatusService =
      require('../../services/consultaService/updateConsultation.js').updateConsultationStatusService;
    updateConsultationStatusService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app)
      .put('/consultas/status')
      .send({ id: 1, status: 'confirmed' });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao obter consultas pelo ID do nutricionista (status 500)', async () => {
    const errorMessage = 'Erro ao obter consultas pelo nutricionista';
    const getConsultasByNutricionistaIdService =
      require('../../services/consultaService/getConsultationByNutricionistaIdService.js').getConsultasByNutricionistaIdService;
    getConsultasByNutricionistaIdService.mockRejectedValue(
      new Error(errorMessage),
    );

    const res = await request(app).get('/consultas/nutricionista/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao obter consultas pelo ID do paciente (status 500)', async () => {
    const errorMessage = 'Erro ao obter consultas pelo paciente';
    const getConsultasByPacienteIdService =
      require('../../services/consultaService/getConsultasByPacienteIdService.js').getConsultasByPacienteIdService;
    getConsultasByPacienteIdService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).get('/consultas/paciente/2');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

  it('Deve retornar erro ao deletar consulta pelo ID (status 500)', async () => {
    const errorMessage = 'Erro ao deletar consulta';
    const deleteConsultaByIdService =
      require('../../services/consultaService/deleteConsultaByIdService.js').deleteConsultaByIdService;
    deleteConsultaByIdService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app).delete('/consultas/1');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

});
