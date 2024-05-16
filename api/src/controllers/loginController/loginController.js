import { loginService } from '../../services/loginService/loginService.js';
import winston from 'winston';
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const login = (req, res) => {
  logger.info('LoginController');
  const user = req.body;

  loginService(user)
    .then((result) => {
      logger.info('LoginController: Login realizado com sucesso');
      if (result.token) {
        res.status(200).json({
          message: 'Login realizado com sucesso',
          token: result.token,
          user: {
            id: result.user.id,
            nome: result.user.nome,
            email: result.user.email,
            tipo: result.user.tipo,
          },
        });
      } else {
        res.status(200).json({ message: 'Login realizado com sucesso' });
      }
    })
    .catch((err) => {
      logger.error(err.message);
      res.status(500).json(err.message);
    });
};
