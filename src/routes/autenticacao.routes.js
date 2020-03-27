import express from 'express';
import validadorUsuario from '../validators/validadorUsuario.validator';
import AutenticacaoController from '../controllers/autenticacao.controller';
import validadorLoginUsuario from '../validators/validadorLoginUsuario.validator';
import ativacaoContaValidator from'../validators/ativacaoConta.validator';

const router =express.Router();
const controle = new AutenticacaoController();

router.post('/registrar',validadorUsuario(),controle.registrar);

router.post('/login',validadorLoginUsuario(),controle.login);

router.post('/ativacao', ativacaoContaValidator('requestActivation'), controle.enviarCodigoAtivacao);

router.post('/ativar', ativacaoContaValidator(), controle.ativarConta);

router.post('/desativar', validadorLoginUsuario(), controle.desativarConta);



export default router;