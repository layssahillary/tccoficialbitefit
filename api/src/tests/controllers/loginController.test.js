
import request from 'supertest';
import express from 'express';
import { login } from '../../controllers/loginController/loginController.js';
import { loginService } from '../../services/loginService/loginService.js';


jest.mock('../../../src/services/loginService/loginService.js', () => ({
  loginService: jest.fn(),
}));

const app = express();
app.use(express.json());
app.post('/login', login);


describe('Teste do LoginController', () => {
  it('Deve realizar login com sucesso (status 200)', async () => {
    const mockUser = { email: 'test@example.com', password: 'password' };
    const mockResponse = {
      token: 'mockedToken',
      user: { id: 1, nome: 'User Name', email: 'test@example.com', tipo: 'nutricionista' },
    };

    loginService.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post('/login')
      .send(mockUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: 'Login realizado com sucesso',
      token: mockResponse.token,
      user: mockResponse.user,
    });
  });

  it('Deve realizar login sem token (status 200)', async () => {
    const mockUser = { email: 'test@example.com', password: 'password' };
    const mockResponse = {};

   
    loginService.mockResolvedValue(mockResponse);

    const res = await request(app)
      .post('/login')
      .send(mockUser);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      message: 'Login realizado com sucesso',
    });
  });

  it('Deve retornar erro ao realizar login (status 500)', async () => {
    const mockUser = { email: 'test@example.com', password: 'wrongpassword' };
    const errorMessage = 'Erro ao realizar login';

    loginService.mockRejectedValue(new Error(errorMessage));

    const res = await request(app)
      .post('/login')
      .send(mockUser);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual(errorMessage);
  });

});
