import { db } from '../../../db.js';
import winston from 'winston'; 
import jwt from 'jsonwebtoken'; 
import crypto from 'crypto';


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
const secret = Array.from(crypto.randomBytes(32))
  .map((byte) => {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  })
  .join('');

  export const loginService = (user) => {
    return new Promise((resolve, reject) => {
      const { email, senha, token } = user;
  
      if (token) {
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            logger.error('Token inválido');
            reject(new Error('Token inválido'));
            return;
          }
          resolve(decoded);
        });
        return;
      }
  
      const queryNutricionista = `SELECT * FROM nutricionista WHERE email = ? AND senha = ?`;
      db.query(queryNutricionista, [email, senha], (errNutricionista, resultsNutricionista) => {
        if (errNutricionista) {
          logger.error(errNutricionista.message);
          reject(errNutricionista);
          return;
        }
      
        if (resultsNutricionista.length > 0) {
          const userObj = {
            id: resultsNutricionista[0].nutricionista_id,
            nome: resultsNutricionista[0].nome,
            email: resultsNutricionista[0].email,
            tipo: 'nutricionista',
          };
      
          const newToken = jwt.sign(userObj, secret, { expiresIn: '24h' });
          logger.info(`Usuário ${userObj.email} fez login`);
          resolve({ user: userObj, token: newToken });
          return;
        }
      
        const queryPaciente = `SELECT * FROM paciente WHERE email = ? AND senha = ?`;
        db.query(queryPaciente, [email, senha], (errPaciente, resultsPaciente) => {
          if (errPaciente) {
            logger.error(errPaciente.message);
            reject(errPaciente);
            return;
          }
          
      
          if (resultsPaciente.length === 0) {
            logger.error('Usuário não encontrado');
            reject(new Error('Usuário não encontrado'));
            return;
          }
      
          const userObj = {
            id: resultsPaciente[0].paciente_id,
            nome: resultsPaciente[0].nome,
            email: resultsPaciente[0].email,
            tipo: 'paciente',
          };
      
          const newToken = jwt.sign(userObj, secret, { expiresIn: '24h' });
          logger.info(`Usuário ${userObj.email} fez login`);
          resolve({ user: userObj, token: newToken });
        });
      });
    });
  };
  
  
  
  
  
  
  
