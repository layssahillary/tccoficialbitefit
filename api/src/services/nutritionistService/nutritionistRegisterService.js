import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const nutritionistRegisterService = (nutritionist) => {
  return new Promise((resolve, reject) => {
    logger.info('nutritionistRegisterService');
    if (!nutritionist.nome || !nutritionist.email || !nutritionist.senha || !nutritionist.confirmarSenha || !nutritionist.crn) {
      logger.error('nutritionistRegisterService: Todos os campos são obrigatórios');
      reject(new Error('Todos os campos são obrigatórios'));
      return;
    }

    if (nutritionist.senha !== nutritionist.confirmarSenha) {
      logger.error('As senhas não coincidem');
      reject(new Error('As senhas não coincidem'));
      return;
    }

    const emailExistsQuery = 'SELECT COUNT(*) AS count FROM nutricionista WHERE email = ?';
    db.query(emailExistsQuery, [nutritionist.email], (emailErr, emailResults) => {
      if (emailErr) {
        logger.error(emailErr.message);
        reject(emailErr);
        return;
      }

      if (emailResults[0].count > 0) {
        logger.error('nutritionistRegisterService: O email já está em uso');
        reject(new Error('O email já está em uso'));
        return;
      }

      const q = 'INSERT INTO nutricionista(`nome`, `email`, `senha`, `confirmarSenha`, `crn`) VALUES(?, ?, ?, ?, ?)';
      const values = [nutritionist.nome, nutritionist.email, nutritionist.senha, nutritionist.confirmarSenha, nutritionist.crn];

      db.query(q, values, (err) => {
        if (err) {
          logger.error(err.message);
          reject(err);
        } else {
          logger.info('nutritionistRegisterService: Nutricionista criado com sucesso');
          resolve('Nutricionista criado com sucesso');
        }
      });
    });
  });
};
