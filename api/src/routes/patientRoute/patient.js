import express from 'express';
import {
  registerPatient,
  getPatientsByNutricionistaId,
  deletePatientById,
  getPatientById,
  updatePatientById,
  getPatientEvolutionHistory
} from '../../controllers/patientController/patientController.js';
const router = express.Router();

/**
 * @openapi
 * /patient/patientRegister:
 *   post:
 *     summary: Cria um novo paciente
 *     description: Cria um novo paciente com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PacienteRegister'
 *     tags: [Patient]
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.post('/patientRegister', registerPatient);

/**
 * @openapi
 * /patient/getPatientsByNutricionistaId/{id}:
 *   get:
 *     summary: Recupera todos os pacientes pelo id do nutricionista
 *     description: Recupera todos os pacientes pelo id do nutricionista
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do nutricionista
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.get('/getPatientsByNutricionistaId/:id', getPatientsByNutricionistaId);

/**
 * @openapi
 * /patient/deletePatientById/{id}:
 *   delete:
 *     summary: Deleta o paciente pelo ID
 *     description: Deleta o paciente com o ID especificado.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente a ser deletado.
 *     responses:
 *       '200':
 *         description: Paciente deletado com sucesso.
 *         content:
 *           application/json:
 *             example: { message: 'Paciente deletado com sucesso.' }
 *       '404':
 *         description: Paciente não encontrado.
 *         content:
 *           application/json:
 *             example: { message: 'Paciente não encontrado.' }
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno do servidor.' }
 */
router.delete('/deletePatientById/:id', deletePatientById);

/**
 * @openapi
 * /patient/getPatientById/{id}:
 *   get:
 *     summary: Deleta o paciente pelo ID
 *     description: Deleta o paciente com o ID especificado.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente a ser deletado.
 *     responses:
 *       '200':
 *         description: Paciente deletado com sucesso.
 *         content:
 *           application/json:
 *             example: { message: 'Paciente deletado com sucesso.' }
 *       '404':
 *         description: Paciente não encontrado.
 *         content:
 *           application/json:
 *             example: { message: 'Paciente não encontrado.' }
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno do servidor.' }
 */
router.get('/getPatientById/:id', getPatientById);

/**
 * @openapi
 * /patient/updatePatientById/{id}:
 *   put:
 *     summary: Atualiza um paciente pelo ID
 *     description: Atualiza um paciente com os dados fornecidos pelo ID especificado.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Paciente a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionistUpdate'
 *     responses:
 *       '200':
 *         description: Paciente atualizado com sucesso.
 *         content:
 *           application/json:
 *             example: { message: 'Paciente atualizado com sucesso.' }
 *       '404':
 *         description: Paciente não encontrado.
 *         content:
 *           application/json:
 *             example: { message: 'Paciente não encontrado.' }
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno do servidor.' }
 */
router.put('/updatePatientById/:id', updatePatientById);

/**
 * @openapi
 * /patient/getPatientEvolutionHistory/{id}:
 *   get:
 *     summary: Deleta o paciente pelo ID
 *     description: Deleta o paciente com o ID especificado.
 *     tags: [Patient]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente a ser deletado.
 *     responses:
 *       '200':
 *         description: Paciente deletado com sucesso.
 *         content:
 *           application/json:
 *             example: { message: 'Paciente deletado com sucesso.' }
 *       '404':
 *         description: Paciente não encontrado.
 *         content:
 *           application/json:
 *             example: { message: 'Paciente não encontrado.' }
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno do servidor.' }
 */
router.get('/getPatientEvolutionHistory/:id', getPatientEvolutionHistory);


export default router;
