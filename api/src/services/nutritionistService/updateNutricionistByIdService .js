import { db } from '../../../db.js';

export const updateNutricionistByIdService = (
  nutricionistaId,
  updatedNutricionista,
) => {
  return new Promise((resolve, reject) => {
    const updateQuery = `
    UPDATE nutricionista 
    SET 
      nome = COALESCE(?, nome), 
      email = COALESCE(?, email), 
      senha = COALESCE(?, senha), 
      confirmarSenha = COALESCE(?, confirmarSenha), 
      celular = COALESCE(?, celular), 
      crn = COALESCE(?, crn), 
      horarioInicio = COALESCE(?, horarioInicio), 
      horarioFim = COALESCE(?, horarioFim), 
      diasSemanas = COALESCE(?, diasSemanas), 
      especialidade = COALESCE(?, especialidade), 
      endereco = COALESCE(?, endereco), 
      cpf = COALESCE(?, cpf), 
      dataNascimento = COALESCE(?, dataNascimento), 
      instagram = COALESCE(?, instagram), 
      linkedin = COALESCE(?, linkedin), 
      whatsapp = COALESCE(?, whatsapp)
    WHERE nutricionista_id = ?;
  `;

    const values = [
      updatedNutricionista.nome || null,
      updatedNutricionista.email || null,
      updatedNutricionista.senha || null,
      updatedNutricionista.confirmarSenha || null,
      updatedNutricionista.celular || null,
      updatedNutricionista.crn || null,
      updatedNutricionista.horarioInicio || null,
      updatedNutricionista.horarioFim || null,
      updatedNutricionista.diasSemanas || null,
      updatedNutricionista.especialidade || null,
      updatedNutricionista.endereco || null,
      updatedNutricionista.cpf || null,
      updatedNutricionista.dataNascimento || null,
      updatedNutricionista.instagram || null,
      updatedNutricionista.linkedin || null,
      updatedNutricionista.whatsapp || null,
      nutricionistaId,
    ];

    db.query(updateQuery, values, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Nutricionista atualizado com sucesso');
      }
    });
  });
};
