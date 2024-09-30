import {
  registerPatient,
  getPatientsByNutricionistaId,
  deletePatientById,
  getPatientById,
  updatePatientById,
  getPatientEvolutionHistory,
} from '../../controllers/patientController/patientController';
import { patientRegisterService } from '../../services/patientService/patientRegisterService';
import { getPatientsByNutricionistaIdService } from '../../services/patientService/getPatientsByNutricionistaIdService';
import { deletePatientByIdService } from '../../services/patientService/deletePatientByIdService';
import { getPatientByIdService } from '../../services/patientService/getPatientByIdService';
import { updatePatientByIdService } from '../../services/patientService/updatePatientByIdService';
import { getPatientEvolutionHistoryService } from '../../services/patientService/getPatientEvolutionHistoryService';

jest.mock('../../services/patientService/patientRegisterService');
jest.mock('../../services/patientService/getPatientsByNutricionistaIdService');
jest.mock('../../services/patientService/deletePatientByIdService');
jest.mock('../../services/patientService/getPatientByIdService');
jest.mock('../../services/patientService/updatePatientByIdService');
jest.mock('../../services/patientService/getPatientEvolutionHistoryService');

const mockRequest = (params, body) => ({
  params: params || {},
  body: body || {}
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res); // Mock encadeável
  res.json = jest.fn().mockReturnValue(res);   // Mock encadeável
  return res;
};

describe('Patient Controller Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });



  test('getPatientsByNutricionistaId should return patients', async () => {
    const req = mockRequest({ id: '123' });
    const res = mockResponse();

    getPatientsByNutricionistaIdService.mockResolvedValueOnce([
      { name: 'John Doe' },
    ]);

    await getPatientsByNutricionistaId(req, res);

    expect(getPatientsByNutricionistaIdService).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ name: 'John Doe' }]);
  });

  test('getPatientsByNutricionistaId should handle errors', async () => {
    const req = mockRequest({ id: '123' });
    const res = mockResponse();

    const errorMessage = 'Failed to fetch patients';
    getPatientsByNutricionistaIdService.mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await getPatientsByNutricionistaId(req, res);

    expect(getPatientsByNutricionistaIdService).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test('deletePatientById should delete a patient', async () => {
    const req = mockRequest({ id: '123' });
    const res = mockResponse();

    deletePatientByIdService.mockResolvedValueOnce({});

    await deletePatientById(req, res);

    expect(deletePatientByIdService).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({});
  });

  test('deletePatientById should handle errors', async () => {
    const req = mockRequest({ id: '123' });
    const res = mockResponse();

    const errorMessage = 'Failed to delete patient';
    deletePatientByIdService.mockRejectedValueOnce(new Error(errorMessage));

    await deletePatientById(req, res);

    expect(deletePatientByIdService).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test('getPatientById should return a patient', async () => {
    const req = mockRequest({ id: '123' });
    const res = mockResponse();

    getPatientByIdService.mockResolvedValueOnce({ name: 'John Doe' });

    await getPatientById(req, res);

    expect(getPatientByIdService).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: 'John Doe' });
  });

  test('getPatientById should handle errors', async () => {
    const req = mockRequest({ id: '123' });
    const res = mockResponse();

    const errorMessage = 'Failed to fetch patient';
    getPatientByIdService.mockRejectedValueOnce(new Error(errorMessage));

    await getPatientById(req, res);

    expect(getPatientByIdService).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test('updatePatientById should update a patient', async () => {
    const req = mockRequest({ id: '123' }, { name: 'John Doe Updated' });
    const res = mockResponse();

    updatePatientByIdService.mockResolvedValueOnce({
      name: 'John Doe Updated',
    });

    await updatePatientById(req, res);

    expect(updatePatientByIdService).toHaveBeenCalledWith('123', {
      name: 'John Doe Updated',
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ name: 'John Doe Updated' });
  });

  test('updatePatientById should handle errors', async () => {
    const req = mockRequest({ id: '123' }, { name: 'John Doe Updated' });
    const res = mockResponse();

    const errorMessage = 'Failed to update patient';
    updatePatientByIdService.mockRejectedValueOnce(new Error(errorMessage));

    await updatePatientById(req, res);

    expect(updatePatientByIdService).toHaveBeenCalledWith('123', {
      name: 'John Doe Updated',
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });

  test('getPatientEvolutionHistory should return patient evolution history', async () => {
    const req = mockRequest({ id: '123' });
    const res = mockResponse();

    getPatientEvolutionHistoryService.mockResolvedValueOnce([
      { weight: 70, date: '2024-01-01' },
    ]);

    await getPatientEvolutionHistory(req, res);

    expect(getPatientEvolutionHistoryService).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ weight: 70, date: '2024-01-01' }]);
  });

  test('getPatientEvolutionHistory should handle errors', async () => {
    const req = mockRequest({ id: '123' });
    const res = mockResponse();

    const errorMessage = 'Failed to fetch patient evolution history';
    getPatientEvolutionHistoryService.mockRejectedValueOnce(
      new Error(errorMessage),
    );

    await getPatientEvolutionHistory(req, res);

    expect(getPatientEvolutionHistoryService).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(errorMessage);
  });
});
