const ConsultationSchema = {
  type: 'object',
  properties: {
    paciente_id: { type: 'integer' },
    nutricionista_id: { type: 'integer' },
    dataConsulta: { type: 'string', format: 'date' },
    horaConsulta: { type: 'string', format: 'time' },
    status: { type: 'string', enum: ['Agendada', 'Cancelada', 'Realizada'] },
    observacao: { type: 'string' },
  },
  required: [
    'paciente_id',
    'nutricionista_id',
    'dataConsulta',
    'horaConsulta',
    'status',
  ],
};

export default ConsultationSchema;
