const NutritionistUpdateSchema = {
  type: 'object',
  properties: {
    nome: { type: 'string', maxLength: 255 },
    email: { type: 'string', format: 'email', maxLength: 100 },
    senha: { type: 'string', maxLength: 100 },
    confirmarSenha: { type: 'string', maxLength: 100 },
    celular: { type: 'string', maxLength: 20 },
    crn: { type: 'string', maxLength: 20 },
    horarioInicio: { type: 'string', format: 'time', maxLength: 100 },
    horarioFim: { type: 'string', format: 'time', maxLength: 100 },
    diasSemanas: { type: 'string', maxLength: 100 },
    especialidade: { type: 'string', maxLength: 100 },
    endereco: { type: 'string', maxLength: 100 },
    cpf: { type: 'string', maxLength: 100 },
    dataNascimento: { type: 'string', format: 'date' },
    instagram: { type: 'string', maxLength: 100 },
    linkedin: { type: 'string', maxLength: 100 },
    whatsapp: { type: 'string', maxLength: 20 },
  },
};

export default NutritionistUpdateSchema;
