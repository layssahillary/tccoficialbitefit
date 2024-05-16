import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const getDietaByPacienteIdService = (paciente_id) => {
  return new Promise((resolve, reject) => {
    logger.info('getDietaByPacienteIdService');

    db.query(
      `SELECT 
         d.dieta_id, d.paciente_id, d.data_inicio, d.data_termino, d.objetivo, d.observacao,
         r.refeicao_id, r.tipo_refeicao, r.horario,
         a.alimento_id, a.nome, a.grupo_alimentar, a.calorias, a.quantidade as alimento_quantidade
       FROM dieta d
       LEFT JOIN refeicao r ON r.dieta_id = d.dieta_id
       LEFT JOIN refeicao_alimento ra ON ra.refeicao_id = r.refeicao_id
       LEFT JOIN alimento a ON a.alimento_id = ra.alimento_id
       WHERE d.paciente_id = ?`,
      [paciente_id],
      (err, result) => {
        if (err) {
          logger.error(err.message);
          reject(err);
          return;
        }

        const dietasMap = new Map();
        result.forEach(row => {
          const dietaId = row.dieta_id;
          if (!dietasMap.has(dietaId)) {
            dietasMap.set(dietaId, {
              dieta_id: dietaId,
              paciente_id: row.paciente_id,
              data_inicio: row.data_inicio,
              data_termino: row.data_termino,
              objetivo: row.objetivo,
              observacao: row.observacao,
              refeicoes: []
            });
          }

          const refeicaoId = row.refeicao_id;
          if (refeicaoId) {
            const refeicao = {
              refeicao_id: refeicaoId,
              tipo_refeicao: row.tipo_refeicao,
              horario: row.horario,
              alimentos: []
            };
            dietasMap.get(dietaId).refeicoes.push(refeicao);
          }

          if (row.alimento_id) {
            const alimento = {
              alimento_id: row.alimento_id,
              nome: row.nome,
              grupo_alimentar: row.grupo_alimentar,
              calorias: row.calorias,
              quantidade: row.alimento_quantidade
            };
            dietasMap.get(dietaId).refeicoes[dietasMap.get(dietaId).refeicoes.length - 1].alimentos.push(alimento);
          }
        });

        const dietas = Array.from(dietasMap.values());
        resolve(dietas);
      }
    );
  });
};











