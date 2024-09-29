import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const dietaRegisterService = (dieta) => {
  return new Promise((resolve, reject) => {
    logger.info('dietaRegisterService');


    db.beginTransaction((err) => {
      if (err) {
        logger.error(err.message);
        reject(err);
        return;
      }

      const { paciente_id, data_inicio, data_termino, objetivo, observacao } = dieta;
      db.query(
        'INSERT INTO dieta (paciente_id, data_inicio, data_termino, objetivo, observacao, data_adicao) VALUES (?, ?, ?, ?, ?, NOW())',
        [paciente_id, data_inicio, data_termino, objetivo, observacao],
        (err, result) => {
          if (err) {
          
            db.rollback(() => {
              logger.error(err.message);
              reject(err);
            });
            return;
          }

          const dieta_id = result.insertId;

          for (const refeicao of dieta.refeicoes) {

            const { tipo_refeicao, horario, alimentos } = refeicao;
            db.query(
              'INSERT INTO refeicao (dieta_id, tipo_refeicao, horario) VALUES (?, ?, ?)',
              [dieta_id, tipo_refeicao, horario],
              (err, result) => {
                if (err) {

                  db.rollback(() => {
                    logger.error(err.message);
                    reject(err);
                  });
                  return;
                }

                const refeicao_id = result.insertId;

                for (const alimento of alimentos) {

                  const { nome, quantidade, calorias, grupo_alimentar } = alimento;
                  db.query(
                    'INSERT INTO alimento (nome, quantidade, calorias, grupo_alimentar) VALUES (?, ?, ?, ?)',
                    [nome, quantidade, calorias, grupo_alimentar],
                    (err, result) => {
                      if (err) {

                        db.rollback(() => {
                          logger.error(err.message);
                          reject(err);
                        });
                        return;
                      }

                      const alimento_id = result.insertId;


                      db.query(
                        'INSERT INTO refeicao_alimento (refeicao_id, alimento_id) VALUES (?, ?)',
                        [refeicao_id, alimento_id],
                        (err) => {
                          if (err) {

                            db.rollback(() => {
                              logger.error(err.message);
                              reject(err);
                            });
                            return;
                          }
                        }
                      );
                    }
                  );
                }
              }
            );
          }


          db.commit((err) => {
            if (err) {
              logger.error(err.message);
              reject(err);
              return;
            }

            logger.info('dietaRegisterService: Dieta criada com sucesso');
            resolve('Dieta criada com sucesso');
          });
        }
      );
    });
  });
};


