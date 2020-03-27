import express from 'express';
import CategoriaController from "../controllers/categoria.controller";

const router = express.Router();
const controle = new CategoriaController();

router.get('/lista', controle.categoriasLista);

export default router;
