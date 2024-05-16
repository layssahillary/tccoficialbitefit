import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
export const putPatientByIdService = (patientId, updatedPatient) => {
  return new Promise((resolve, reject) => {
    logger.info('patientUpdateService');
    const {
      nome,
      email,
      dataNascimento,
      altura,
      peso,
      senha,
      confirmar_senha,
      objetivo,
      nutricionista_id,
      paciente_img,
      genero,
      telefone,
      observacao,
      historico_familiar_doencas,
      doencas_cronicas,
      medicamentos_em_uso,
      exames_de_sangue_relevantes,
      alergia,
      restricao_alimentar,
      habitos_alimentares,
      frequencia_exercicio_semanal,
      circunferencia_bracos,
      circunferencia_cintura,
      circunferencia_quadril,
      circunferencia_pernas,
    } = updatedPatient;

    const updateQuery = `
      UPDATE paciente 
      SET 
        nome = ?, 
        email = ?, 
        dataNascimento = ?, 
        altura = ?, 
        peso = ?, 
        senha = ?, 
        confirmar_senha = ?, 
        objetivo = ?, 
        nutricionista_id = ?, 
        paciente_img = ?, 
        genero = ?, 
        telefone = ?, 
        observacao = ?, 
        historico_familiar_doencas = ?, 
        doencas_cronicas = ?, 
        medicamentos_em_uso = ?, 
        exames_de_sangue_relevantes = ?, 
        alergia = ?, 
        restricao_alimentar = ?, 
        habitos_alimentares = ?, 
        frequencia_exercicio_semanal = ?, 
        circunferencia_bracos = ?, 
        circunferencia_cintura = ?, 
        circunferencia_quadril = ?, 
        circunferencia_pernas = ?
      WHERE id = ?`;

    const values = [
      nome,
      email,
      dataNascimento,
      altura,
      peso,
      senha,
      confirmar_senha,
      objetivo,
      nutricionista_id,
      paciente_img,
      genero,
      telefone,
      observacao,
      historico_familiar_doencas,
      doencas_cronicas,
      medicamentos_em_uso,
      exames_de_sangue_relevantes,
      alergia,
      restricao_alimentar,
      habitos_alimentares,
      frequencia_exercicio_semanal,
      circunferencia_bracos,
      circunferencia_cintura,
      circunferencia_quadril,
      circunferencia_pernas,
      patientId,
    ];

    db.query(updateQuery, values, (err) => {
      if (err) {
        logger.error(err.message);
        reject(err);
      } else {
        logger.info('patientUpdateService: Paciente atualizado com sucesso');
        resolve('Paciente atualizado com sucesso');
      }
    });
  });
};
