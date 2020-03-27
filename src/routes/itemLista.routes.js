import express from 'express';
import verificadorToken from '../interceptors/verificadorToken.intercepetor';
import objetoIdValidator from '../validators/objetoId.validator';
import dataFormatoValidator from "../validators/dataFormato.validator";
import procuraPaginadaValidator from '../validators/procurarPagina.validator';
import itemListaFiltrarValidator from '../validators/itemListaFiltrar.validator';
import itemListCriarValidator from '../validators/itemListaCriar.validator';
import itemListaAtualizarValidator from '../validators/itemListaAtualizar.validator';
import ItemListaController from "../controllers/itemListaController";

const router = express.Router();
const controle = new ItemListaController();

router.post('/adicionar',
            verificadorToken,
            objetoIdValidator({name: 'usuarioId'}, {name: 'listaId'}),
            itemListCriarValidator(),
            controle.inserirItemLista);

router.get('/:itemListaId',
            verificadorToken,
            objetoIdValidator({name: 'itemListaId'}, {name: 'usuarioId'}),
            controle.pegarItemLista);

router.get('/filtro/:listaId',
            verificadorToken,
            objetoIdValidator({name: 'listaId'}, {name: 'usuarioId'}),
            dataFormatoValidator({name: 'created', required: false}),
            itemListaFiltrarValidator(),
            controle.pegarItensLista);


router.get('/paginado/:listaId',
            verificadorToken,
            objetoIdValidator({name: 'listaId'}, {name: 'usuarioId'}),
            dataFormatoValidator({name: 'created', required: false}),
            itemListaFiltrarValidator(),
            procuraPaginadaValidator(),
            controle.pegarPaginadoItensLista);

router.put('/atualizar/:itemListaId',
             verificadorToken,
             objetoIdValidator({name: 'itemListaId'}, {name: 'listaId', required: false}, {name: 'usuarioId'}),
             itemListaAtualizarValidator(),
             controle.atualizarItemLista);

router.delete('/deletar/:itemListaId',
            verificadorToken,
            objetoIdValidator({name: 'itemListaId'}, {name: 'usuarioId'}),
            controle.removerItemLista);

export default router;