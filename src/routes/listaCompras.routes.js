import interceptadorToken from '../interceptors/verificadorToken.intercepetor';
import express from 'express';
const router = express.Router();
import ListaComprasController from "../controllers/listaCompras.controller";
const controller = new ListaComprasController();


router.get('/lista',interceptadorToken,controller.lista);

export default router;