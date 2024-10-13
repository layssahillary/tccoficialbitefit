import express from 'express';
import request from 'supertest';
import loginRouter from '../../../routes/loginRoute/login'; // Altere para o caminho correto do seu arquivo de rotas

// Mock do controlador
jest.mock('../../../controllers/loginController/loginController.js', () => ({
  login: jest.fn((req, res) => {
    const { email, senha } = req.body;
    if (email === 'user@example.com' && senha === 'password') {
      return res.status(200).json({ token: 'fake-jwt-token' });
    }
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }),
}));

const app = express();
app.use(express.json()); // Para parsing de JSON
app.use('/login', loginRouter); // Monta as rotas

describe('Login Routes', () => {
  it('should login successfully with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', senha: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('fake-jwt-token');
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'user@example.com', senha: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Credenciais inválidas');
  });

  it('should return 401 for missing credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'user@example.com' }); // Falta a senha

    expect(response.status).toBe(401);
  });
});
