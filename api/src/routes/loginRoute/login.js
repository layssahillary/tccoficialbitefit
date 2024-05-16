import express from 'express';
import { login } from '../../controllers/loginController/loginController.js';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Login
 *   description: Operações relacionadas a login
 */

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login de usuario
 *     description: Permite que um usuario faça login na aplicação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *             required:
 *               - email
 *               - senha
 *     tags: [Login]
 *     responses:
 *       '200':
 *         description: Login bem-sucedido, retorna o token JWT
 *       '401':
 *         description: Credenciais inválidas
 *       '500':
 *         description: Erro interno do servidor
 */
router.post('/', login);

export default router;
