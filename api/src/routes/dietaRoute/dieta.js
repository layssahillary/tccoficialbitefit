import express from 'express';
import { registerDieta, updateDieta, getDietaByPacienteId, deleteDietaById } from '../../controllers/dietaController/dietaController.js';

const router = express.Router();

/**
 * @openapi
 * /dieta/dietaRegister:
 *   post:
 *     summary: Cria um novo dieta
 *     description: Cria um novo dieta com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DietaInput'
 *     tags: [Dieta]
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.post('/dietaRegister', registerDieta);

/**
 * @openapi
 * /dieta/updateDieta:
 *   put:
 *     summary: Atualiza dieta
 *     description: Atualiza dieta com o ID especificado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID da dieta
 *               status:
 *                 type: string
 *                 enum: [Agendada, Cancelada, Realizada]
 *                 description: Novo status da Dieta
 *     tags: [Dieta]
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.put('/updateDieta', updateDieta);

/**
 * @openapi
 * /dieta/getDietaByPacienteId/{paciente_id}:
 *   get:
 *     summary: Retorna as dieta de um paciente pelo ID 
 *     description: Retorna as dieta associadas a um paciente com base no ID d
 *     parameters:
 *       - in: path
 *         name: paciente_id
 *         description: ID do paciente
 *         required: true
 *         schema:
 *           type: integer
 *     tags: [Dieta]
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.get('/getDietaByPacienteId/:paciente_id', getDietaByPacienteId);


/**
 * @openapi
 * /dieta/deleteDietaById/{id}:
 *   delete:
 *     summary: Deleta o Dieta pelo ID
 *     description: Deleta o Dieta com o ID especificado.
 *     tags: [Dieta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Dieta a ser deletada.
 *     responses:
 *       '200':
 *         description: Dieta deletada com sucesso.
 *         content:
 *           application/json:
 *             example: { message: 'Dieta deletada com sucesso.' }
 *       '404':
 *         description: Dieta não encontrado.
 *         content:
 *           application/json:
 *             example: { message: 'Dieta não encontrado.' }
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno do servidor.' }
 */
router.delete('/deleteDietaById/:id', deleteDietaById);

export default router;

