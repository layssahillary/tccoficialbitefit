import { db } from '../../../db.js';
import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export const patientRegisterService = (patient) => {
  return new Promise((resolve, reject) => {
    logger.info('patientRegisterService');
    if (
      (!patient.nome,
      !patient.email,
      !patient.senha,
      !patient.confirmar_senha,
      !patient.nutricionista_id)
    ) {
      logger.error('patientRegisterService: Todos os campos são obrigatórios');
      reject(new Error('Todos os campos são obrigatórios'));
      return;
    }

    if (patient.senha !== patient.confirmar_senha) {
      logger.error('As senhas não coincidem');
      reject(new Error('As senhas não coincidem'));
      return;
    }

    const emailExistsQuery =
      'SELECT COUNT(*) AS count FROM paciente WHERE email = ?';
    db.query(emailExistsQuery, [patient.email], (emailErr, emailResults) => {
      if (emailErr) {
        logger.error(emailErr.message);
        reject(emailErr);
        return;
      }

      if (emailResults[0].count > 0) {
        logger.error('patientRegisterService: O email já está em uso');
        reject(new Error('O email já está em uso'));
        return;
      }

      const q =
        'INSERT INTO paciente(nome, email, dataNascimento, altura, peso, senha, confirmar_senha, objetivo, nutricionista_id, paciente_img, genero, telefone, observacao, historico_familiar_doencas, doencas_cronicas, medicamentos_em_uso, exames_de_sangue_relevantes, alergia, restricao_alimentar, habitos_alimentares, frequencia_exercicio_semanal, circunferencia_bracos, circunferencia_cintura, circunferencia_quadril, circunferencia_pernas, gordura_corporal) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [
        patient.nome,
        patient.email,
        patient.dataNascimento,
        patient.altura,
        patient.peso,
        patient.senha,
        patient.confirmar_senha,
        patient.objetivo,
        patient.nutricionista_id,
        patient.paciente_img,
        patient.genero,
        patient.telefone,
        patient.observacao,
        patient.historico_familiar_doencas,
        patient.doencas_cronicas,
        patient.medicamentos_em_uso,
        patient.exames_de_sangue_relevantes,
        patient.alergia,
        patient.restricao_alimentar,
        patient.habitos_alimentares,
        patient.frequencia_exercicio_semanal,
        patient.circunferencia_bracos,
        patient.circunferencia_cintura,
        patient.circunferencia_quadril,
        patient.circunferencia_pernas,
        patient.gordura_corporal
      ];

      db.query(q, values, (err) => {
        if (err) {
          logger.error(err.message);
          reject(err);
        } else {
          logger.info('patientRegisterService: Paciente criado com sucesso');
          resolve('Paciente criado com sucesso');
        }
      });
    });
  });
};
