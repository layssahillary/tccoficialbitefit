import express from 'express';
import { registerNutricionist, getNutricionistById, deleteNutricionistById, updateNutricionistById } from '../../controllers/nutritionistController/nutritionistController.js';
const router = express.Router();

/**
 * @openapi
 * /nutricionist/nutricionistRegister:
 *   post:
 *     summary: Cria um novo nutricionista
 *     description: Cria um novo nutricionista com os dados fornecidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionistRegister'
 *     tags: [Nutricionista]
 *     responses:
 *       '200':
 *         description: Requisição bem-sucedida
 */
router.post('/nutricionistRegister', registerNutricionist);


/**
 * @openapi
 * /nutricionist/getNutricionistById/{id}:
 *   get:
 *     summary: Recupera  o nutricionista pelo id 
 *     description: Recupera  o nutricionista pelo id 
 *     tags: [Nutricionista]
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
router.get('/getNutricionistById/:id', getNutricionistById);

/**
 * @openapi
 * /nutricionist/deleteNutricionistById/{id}:
 *   delete:
 *     summary: Deleta o nutricionista pelo ID
 *     description: Deleta o nutricionista com o ID especificado.
 *     tags: [Nutricionista]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Nutricionista a ser deletado.
 *     responses:
 *       '200':
 *         description: Nutricionista deletado com sucesso.
 *         content:
 *           application/json:
 *             example: { message: 'Nutricionista deletado com sucesso.' }
 *       '404':
 *         description: Nutricionista não encontrado.
 *         content:
 *           application/json:
 *             example: { message: 'Nutricionista não encontrado.' }
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno do servidor.' }
 */
router.delete('/deleteNutricionistById/:id', deleteNutricionistById);

/**
 * @openapi
 * /nutricionist/updateNutricionist/{id}:
 *   put:
 *     summary: Atualiza um nutricionista pelo ID
 *     description: Atualiza um nutricionista com os dados fornecidos pelo ID especificado.
 *     tags: [Nutricionista]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do Nutricionista a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionistUpdate'
 *     responses:
 *       '200':
 *         description: Nutricionista atualizado com sucesso.
 *         content:
 *           application/json:
 *             example: { message: 'Nutricionista atualizado com sucesso.' }
 *       '404':
 *         description: Nutricionista não encontrado.
 *         content:
 *           application/json:
 *             example: { message: 'Nutricionista não encontrado.' }
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             example: { message: 'Erro interno do servidor.' }
 */
router.put('/updateNutricionist/:id', updateNutricionistById);


export default router;
