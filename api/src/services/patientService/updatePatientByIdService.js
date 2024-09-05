import { db } from '../../../db.js';

export const updatePatientByIdService = (patientId, updatedPatient) => {
  return new Promise((resolve, reject) => {
    const updateQuery = `
      UPDATE paciente 
      SET 
        nome = COALESCE(?, nome), 
        email = COALESCE(?, email), 
        dataNascimento = COALESCE(?, dataNascimento), 
        altura = COALESCE(?, altura), 
        peso = COALESCE(?, peso), 
        senha = COALESCE(?, senha), 
        confirmar_senha = COALESCE(?, confirmar_senha), 
        objetivo = COALESCE(?, objetivo), 
        nutricionista_id = COALESCE(?, nutricionista_id), 
        paciente_img = COALESCE(?, paciente_img), 
        genero = COALESCE(?, genero), 
        telefone = COALESCE(?, telefone), 
        observacao = COALESCE(?, observacao), 
        historico_familiar_doencas = COALESCE(?, historico_familiar_doencas), 
        doencas_cronicas = COALESCE(?, doencas_cronicas), 
        medicamentos_em_uso = COALESCE(?, medicamentos_em_uso), 
        exames_de_sangue_relevantes = COALESCE(?, exames_de_sangue_relevantes), 
        alergia = COALESCE(?, alergia), 
        restricao_alimentar = COALESCE(?, restricao_alimentar), 
        habitos_alimentares = COALESCE(?, habitos_alimentares), 
        frequencia_exercicio_semanal = COALESCE(?, frequencia_exercicio_semanal), 
        circunferencia_bracos = COALESCE(?, circunferencia_bracos), 
        circunferencia_cintura = COALESCE(?, circunferencia_cintura), 
        circunferencia_quadril = COALESCE(?, circunferencia_quadril), 
        circunferencia_pernas = COALESCE(?, circunferencia_pernas)
      WHERE paciente_id = ?;
    `;

    const values = [
      updatedPatient.nome,
      updatedPatient.email,
      updatedPatient.dataNascimento,
      updatedPatient.altura,
      updatedPatient.peso,
      updatedPatient.senha,
      updatedPatient.confirmar_senha,
      updatedPatient.objetivo,
      updatedPatient.nutricionista_id,
      updatedPatient.paciente_img,
      updatedPatient.genero,
      updatedPatient.telefone,
      updatedPatient.observacao,
      updatedPatient.historico_familiar_doencas,
      updatedPatient.doencas_cronicas,
      updatedPatient.medicamentos_em_uso,
      updatedPatient.exames_de_sangue_relevantes,
      updatedPatient.alergia,
      updatedPatient.restricao_alimentar,
      updatedPatient.habitos_alimentares,
      updatedPatient.frequencia_exercicio_semanal,
      updatedPatient.circunferencia_bracos,
      updatedPatient.circunferencia_cintura,
      updatedPatient.circunferencia_quadril,
      updatedPatient.circunferencia_pernas,
      patientId
    ];

    db.query(updateQuery, values, (err) => {
      if (err) {
        reject(err);
      } else {
        // Verificar se o peso ou gordura corporal foi atualizado
        if (updatedPatient.peso || updatedPatient.gordura_corporal) {
          const insertHistoricoQuery = `
            INSERT INTO paciente_historico (paciente_id, peso, gordura_corporal) 
            VALUES (?, ?, ?);
          `;

          const historicoValues = [
            patientId,
            updatedPatient.peso || null,
            updatedPatient.gordura_corporal || null
          ];

          db.query(insertHistoricoQuery, historicoValues, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve('Paciente atualizado com sucesso e histórico salvo');
            }
          });
        } else {
          resolve('Paciente atualizado com sucesso');
        }
      }
    });
  });
};
