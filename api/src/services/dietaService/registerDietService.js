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

    // Inicia uma transação no banco de dados
    db.beginTransaction((err) => {
      if (err) {
        logger.error(err.message);
        reject(err);
        return;
      }

      // Insere os dados da dieta na tabela dieta
      const { paciente_id, data_inicio, data_termino, objetivo, observacao } = dieta;
      db.query(
        'INSERT INTO dieta (paciente_id, data_inicio, data_termino, objetivo, observacao, data_adicao) VALUES (?, ?, ?, ?, ?, NOW())',
        [paciente_id, data_inicio, data_termino, objetivo, observacao],
        (err, result) => {
          if (err) {
            // Em caso de erro, faz rollback na transação
            db.rollback(() => {
              logger.error(err.message);
              reject(err);
            });
            return;
          }

          const dieta_id = result.insertId;

          // Para cada refeição na dieta
          for (const refeicao of dieta.refeicoes) {
            // Insere os dados da refeição na tabela refeicao
            const { tipo_refeicao, horario, alimentos } = refeicao;
            db.query(
              'INSERT INTO refeicao (dieta_id, tipo_refeicao, horario) VALUES (?, ?, ?)',
              [dieta_id, tipo_refeicao, horario],
              (err, result) => {
                if (err) {
                  // Em caso de erro, faz rollback na transação
                  db.rollback(() => {
                    logger.error(err.message);
                    reject(err);
                  });
                  return;
                }

                const refeicao_id = result.insertId;

                // Para cada alimento na refeição
                for (const alimento of alimentos) {
                  // Insere os dados do alimento na tabela alimento
                  const { nome, quantidade, calorias, grupo_alimentar } = alimento;
                  db.query(
                    'INSERT INTO alimento (nome, quantidade, calorias, grupo_alimentar) VALUES (?, ?, ?, ?)',
                    [nome, quantidade, calorias, grupo_alimentar],
                    (err, result) => {
                      if (err) {
                        // Em caso de erro, faz rollback na transação
                        db.rollback(() => {
                          logger.error(err.message);
                          reject(err);
                        });
                        return;
                      }

                      const alimento_id = result.insertId;

                      // Insere a relação entre a refeição e o alimento na tabela refeicao_alimento
                      db.query(
                        'INSERT INTO refeicao_alimento (refeicao_id, alimento_id) VALUES (?, ?)',
                        [refeicao_id, alimento_id],
                        (err) => {
                          if (err) {
                            // Em caso de erro, faz rollback na transação
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

          // Commita a transação no banco de dados
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


