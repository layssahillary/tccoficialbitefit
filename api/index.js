import express from 'express';
import cors from 'cors';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import nutritionistRoute from './src/routes/nutritionistRoute/nutritionistRoute.js';
import patientRoutes from './src/routes/patientRoute/patient.js';
import consultaRoutes from './src/routes/consultaRoute/consulta.js';
import dietaRoutes from './src/routes/dietaRoute/dieta.js';
import loginRoutes from './src/routes/loginRoute/login.js';
import DietaInputSchema from './src/schema/dietaSchema/DietaSchema.js';
import ConsultationSchema from './src/schema/consultaSchema/ConsultaSchema.js';
import NutritionistRegisterSchema from './src/schema/nutritionitSchema/NutritionistRegisterSchema.js';
import PatientRegisterSchema from './src/schema/patientSchema/PatientRegisterSchema.js';

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8800;

app.use(express.json());
app.use(cors());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Nutrição BiteFit',
      version: '1.0.0',
      description: 'Documentação da API do software de nutrição BiteFit',
    },
    components: {
      schemas: {
        DietaInput: DietaInputSchema,
        ConsultationRegister: ConsultationSchema,
        NutritionistRegister: NutritionistRegisterSchema,
        PacienteRegister: PatientRegisterSchema,
      },
    },
  },
  apis: ['./src/routes/*/*.js'],
};
const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/nutricionist', nutritionistRoute);
app.use('/patient', patientRoutes);
app.use('/consultation', consultaRoutes);
app.use('/dieta', dietaRoutes);
app.use('/login', loginRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
