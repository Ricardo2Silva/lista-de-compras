import express from 'express';
import CategoriaController from "../controllers/categoria.controller";

const router = express.Router();
const controle = new CategoriaController();

/**
 * @swagger
 * definitions:
 *      Categoria:
 *          properties:
 *              _id:
 *                  type: string
 *              descricao:
 *                  type: string
 */



/**
 * @swagger
 * /api/categoria:
 *      get:
 *          tags:
 *              - categorias
 *          produces:
 *              - application/json
 *          responses:
 *              200:
 *                  description : retorne uma lista de categorias
 *                  schema:
 *                        $ref: '#/definitions/Categoria'
 */


router.get('', controle.categoriasLista);

export default router;
