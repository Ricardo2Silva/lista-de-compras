import express from 'express';
const router =express.Router();
import AutenticacaoController from '../controllers/autenticacao.controller';
const controle = new AutenticacaoController()

router.post('/registrar',controle.registrar);

router.post('/login',controle.login)


export default router;