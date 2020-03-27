import express from 'express';
import verificadorToken from '../interceptors/verificadorToken.intercepetor';
import objetoIdValidator from '../validators/objetoId.validator';
import dataFormatoValidator from '../validators/dataFormato.validator';
import listaComprasValidator from '../validators/listaCompras.validator';

const router = express.Router();

import ComprasListaController from '../controllers/listaCompras.controller';
const controle = new ComprasListaController();


router.get('/',
            verificadorToken,
            objetoIdValidator({name: 'usuarioId'}, {name: 'categoriaId', required: false}),
            dataFormatoValidator({name: 'created', required: false}),
            controle.pegarTodasListas);

router.get('/:listaId',
            verificadorToken,
            objetoIdValidator({name: 'usuarioId'}, {name: 'listaId'}),
            controle.pegarUmaLista);

router.post('/criar',
            verificadorToken,
            objetoIdValidator({name: 'usuarioId'}, {name: 'categoriaId'}),
            listaComprasValidator(),controle.criarLista);

router.put('/atualizar/:listaId',
            verificadorToken,
            objetoIdValidator({name: 'usuarioId'}, {name: 'listaId'}, {name: 'categoriaId', required: false}),
            controle.atualizarLista);

router.delete('/deletar/:listaId',
            verificadorToken,
            objetoIdValidator({name: 'usuarioId'}, {name: 'listaId'}),
            controle.removerLista);

export default router;
