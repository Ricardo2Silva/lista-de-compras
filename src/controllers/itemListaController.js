import { validationResult } from "express-validator";
import listaComprasModel from '../models/listaCompras.model';
import ItemListaModel from '../models/itemLista.model';
import DataUtil from "../utils/data.util";
import ProcuraPaginadaUtil from "../utils/procurarPagina.util";


export default class ItemListaController {

    async inserirItemLista(req, res)  {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const lista = await listaComprasModel.findOne({ _id: req.body.listaId, usuarioId: req.body.usuarioId  });

            if (!lista) {
                return res.status(400).json({errorMessage: 'lista de compras ou usuário não existe! '});
            }

            delete req.body.usuarioId;
            const itemLista = new ItemListaModel(req.body);
            const itemListaSalva = await itemLista.save();
            return res.status(201).json(itemListaSalva);

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inesperado ao tentar criar um item da lista de compras!');
        }
    }

    async pegarItemLista(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const itemLista = await ItemListaModel.findOne({ _id: req.params.itemListaId });
            return res.status(200).json(itemLista || {});

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inesperado ao tentar obter uma lista de itens!');
        }
    }

    async pegarItensLista(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const filtro = filtroConstrutor(req);

            const itemsLista = await ItemListaModel.find(filtro);
            return res.status(200).json(itemsLista || []);

        } catch (err) {
            console.log(err);
            return res.status(500).json('there was an unexpected error when try to filter list items!');
        }
    }

    async pegarPaginadoItensLista(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            let pageSize = 10;
            let pageNumber = 1;

            if (req.query.pageSize) {
                pageSize = parseInt(req.query.pageSize);
            }

            if (req.query.pageNumber) {
                pageNumber = parseInt(req.query.pageNumber);
            }

            const filtro = filtroConstrutor(req);
            const total = ItemListaModel.countDocuments(filtro);

            const inicioIndex = (pageNumber - 1) * pageSize;

            if (total < inicioIndex) {

            }

            const itemsLista = await ItemListaModel
                .find(filtro)
                .limit(pageSize)
                .skip(inicioIndex)
                .exec();

            const procuraPaginada = new ProcuraPaginadaUtil();
            const paginadoResultado = procuraPaginada.pegarObjetoPaginado(pageSize, pageNumber, total, itemsLista);
            return res.status(200).json(paginadoResultado);

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inesperado ao tentar pegar itens da lista paginada!');
        }
    }

    async atualizarItemLista(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const itemLista = await ItemListaModel.findOne({ _id: req.params.itemListaId });

            if (!itemLista) {
                return res.status(400).json({errorMessage: 'item list to be updated does not exist'});
            }

            const itemListaAtualizar= itemListaAtualizarConstrutor(req);

            if (req.body.listaId) {
                const novaListaCompras = await listaComprasModel.findOne({ _id: req.body.listaId, userId: req.body.usuarioId  });

                if (!novaListaCompras) {
                    return res.status(400).json({errorMessage:'lista de compras a ser atualizado não existe e não é de propriedade do usuário'});
                }

                itemListaAtualizar.listaId = novaListaCompras._id;
            }

            const itemListaAtualizada = await ItemListaModel.updateOne({ _id: req.params.itemListId }, itemListaAtualizar);
            return res.status(200).json({message: 'item lista atualizada com sucesso', itemLista: itemListaAtualizada});

        } catch (err) {
            console.log(err);
            return res.status(500).json('aplicativo incapaz de atualizar a lista de itens devido a um erro');
        }
    }

    async removerItemLista(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const itemListaDeletada = await ItemListaModel
                .findOneAndRemove({_id: req.params.itemListaId})
                .exec();

            if (itemListaDeletada) {
                return res.status(200).json({message: 'item da lista deletada!'});
            }

            return res.status(400).json({message:'não há lista de itens a ser removida!'});

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inesperado ao tentar remover uma lista de itens!');
        }
    }

}

const filtroConstrutor  = (req) => {
    const filtro = {
        listaId: req.params.listaId
    };

    if (req.query.quantidade) {
        filtro.quantidade = req.query.quantidade
    }

    if (req.query.descricao) {
        filtro.descricao = { $regex: `.*${req.query.descricao}.*` };
    }

    if (req.query.comprado) {
        filtro.comprado = req.query.comprado
    }

    if (req.query.preco) {
        filtro.preco = req.query.preco
    }

    if (req.query.url) {
        filtro.url = { $regex: `.*${req.query.url}.*` };
    }

    if (req.query.created) {
        const dataUtil = new DataUtil();
        const startDate = dataUtil.getStartDayOfDate(req.query.created);
        const endDate = dataUtil.getEndDayOfDate(req.query.created);

        filtro.created = { $gte: startDate, $lte: endDate };
    }

    return filtro;
};

const itemListaAtualizarConstrutor = (req) => {
    const itemListaAtualizar = {};

    if (req.body.quantidade) {
        itemListaAtualizar.quantidade = req.body.quantidade;
    }

    if (req.body.descricao) {
        itemListaAtualizar.descricao = req.body.descricao;
    }

    if (req.body.comprado) {
        itemListaAtualizar.comprado = req.body.comprado;
    }

    if (req.body.preco) {
        itemListaAtualizar.preco = req.body.preco;
    }

    if (req.body.url) {
        itemListaAtualizar.url = req.body.url;
    }

    return itemListaAtualizar;
};
