import express from 'express';
import {
  scheduleConsultation,
  updateConsultationStatus,
  getConsultasByNutricionistaId,
  getConsultasByPacienteId,
  deleteConsultaById
} from '../../controllers/consultacontroller/consultaController.js';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Consulta
 *   description: Operações relacionadas a consultas
 */

// router
/**
 * @openapi
 * /consultation/scheduleConsultation:
 *   post:
 *     summary: Agenda uma nova consulta
 *     description: Agenda uma nova consulta com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsultationRegister'
 *     tags: [Consulta]
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.post('/scheduleConsultation', scheduleConsultation);

/**
 * @openapi
 * /consultation/updateConsultationStatus:
 *   put:
 *     summary: Atualiza o status da consulta
 *     description: Atualiza o status da consulta com o ID especificado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da consulta
 *               status:
 *                 type: string
 *                 enum: [Agendada, Cancelada, Realizada]
 *                 description: Novo status da consulta
 *     tags: [Consulta]
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.put('/updateConsultationStatus', updateConsultationStatus);

/**
 * @openapi
 * /consultation/getConsultasByNutricionistaId/{nutricionista_id}:
 *   get:
 *     summary: Retorna as consultas de um nutricionista pelo ID 
 *     description: Retorna as consultas associadas a um nutricionista com base no ID d
 *     parameters:
 *       - in: path
 *         name: nutricionista_id
 *         description: ID do nutricionista
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Consulta]
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.get('/getConsultasByNutricionistaId/:nutricionista_id', getConsultasByNutricionistaId);

/**
 * @openapi
 * /consultation/getConsultasByPacienteId/{paciente_id}:
 *   get:
 *     summary: Retorna as consultas pelo id do paciente
 *     description: Retorna as consultas associadas a um paciente com base no ID
 *     parameters:
 *       - in: path
 *         name: paciente_id
 *         description: ID do paciente
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Consulta]
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.get('/getConsultasByPacienteId/:paciente_id', getConsultasByPacienteId);

/**
 * @openapi
 * /consultation/deleteConsultaById/{id}:
 *   delete:
 *     summary: Deleta o Consulta pelo ID
 *     description: Deleta o Consulta com o ID especificado.
 *     tags: [Consulta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Consulta a ser deletado.
 *     responses:
 *       '200':
 *         description: Consulta deletado com sucesso.
 *         content:
 *           application/json:
 *             example: { message: 'Consulta deletado com sucesso.' }
 *       '404':
 *         description: Consulta não encontrado.
 *         content:
 *           application/json:
 *             example: { message: 'Consulta não encontrado.' }
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno do servidor.' }
 */
router.delete('/deleteConsultaById/:id', deleteConsultaById);

export default router;
