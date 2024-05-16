const DietaRegisterSchema = {
  type: 'object',
  properties: {
    dieta_id: { type: 'integer' },
    paciente_id: { type: 'integer' },
    data_inicio: { type: 'string', format: 'date' },
    data_termino: { type: 'string', format: 'date' },
    objetivo: { type: 'string', maxLength: 255 },
    observacao: { type: 'string', format: 'textarea' },
    refeicoes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          refeicao_id: { type: 'integer' },
          tipo_refeicao: { type: 'string', maxLength: 50 },
          horario: { type: 'string', format: 'time' },
          alimentos: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                alimento_id: { type: 'integer' },
                nome: { type: 'string', maxLength: 255 },
                quantidade: { type: 'integer' },
                calorias: { type: 'number', format: 'float' },
              },
              required: ['alimento_id', 'nome', 'quantidade', 'calorias'],
            },
          },
        },
        required: ['refeicao_id', 'tipo_refeicao', 'horario', 'alimentos'],
      },
    },
  },
  required: ['dieta_id', 'paciente_id', 'data_inicio', 'data_termino', 'objetivo', 'refeicoes'],
};

export default DietaRegisterSchema;