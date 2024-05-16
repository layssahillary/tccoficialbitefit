import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const updateNutricionistByIdService = (id, newData) => {
  return new Promise((resolve, reject) => {
    logger.info('updateNutricionistByIdService');
    const q =
      'UPDATE nutricionista SET nome=?, email=?, senha=?, confirmarSenha=?, celular=?, crn=?, horarioInicio=?, horarioFim=?, diasSemanas=?, especialidade=?, endereco=?, cpf=?, nutricionista_img=?, dataNascimento=?, instagram=?, linkedin=?, whatsapp=? WHERE nutricionista_id=?';
    const values = [
      newData.nome,
      newData.email,
      newData.senha,
      newData.confirmarSenha,
      newData.celular,
      newData.crn,
      newData.horarioInicio,
      newData.horarioFim,
      newData.diasSemanas,
      newData.especialidade,
      newData.endereco,
      newData.cpf,
      newData.nutricionista_img,
      newData.dataNascimento,
      newData.instagram,
      newData.linkedin,
      newData.whatsapp,
      id,
    ];

    db.query(q, values, (err, result) => {
      if (err) {
        logger.error(err.message);
        reject(err);
      } else {
        if (result.affectedRows === 0) {
          logger.error(
            'updateNutricionistByIdService: Nutricionista não encontrado',
          );
          reject(new Error('Nutricionista não encontrado'));
        } else {
          logger.info(
            'updateNutricionistByIdService: Nutricionista atualizado com sucesso',
          );
          resolve('Nutricionista atualizado com sucesso');
        }
      }
    });
  });
};
