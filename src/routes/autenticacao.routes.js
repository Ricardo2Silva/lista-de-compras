import express from 'express';
const router =express.Router();
import AutenticacaoController from '../controllers/autenticacao.controller';
const controle = new AutenticacaoController();
import validadorUsuario from '../validators/validadorUsuario.validator';
import validadorLoginUsuario from '../validators/validadorLoginUsuario.validator';

router.post('/registrar',validadorUsuario(),controle.registrar);

router.post('/login',validadorLoginUsuario(),controle.login)


export default router;