import DataUtil from '../utils/data.util';
import UsuarioModel from '../models/usuario.model';
import { validationResult } from 'express-validator';
import CategoriaModel from '../models/categoria.model';
import ListaComprasModel from '../models/listaCompras.model';

export default class ComprasListaController {

    async criarLista(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const usuario = await UsuarioModel.findOne({ _id: req.body.usuarioId });

            if (!usuario) {
                return res.status(400).json({errorMessage: 'usuario nao existe !'});
            }

            const categoria = await CategoriaModel.findOne({ _id: req.body.categoriaId });

            if (!categoria) {
                return res.status(400).json({errorMessage: 'categoria nao existe !'});
            }

            const listaCompras = new ListaComprasModel({
                usuarioId: usuario._id,
                categoriaId: categoria._id,
                descricao: req.body.descricao
            });

            const listaComprasSalva = await listaCompras.save();
            return res.status(201).json(listaComprasSalva);

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inesperado ao tentar criar uma lista de compras!');
        }
    }

    async pegarTodasListas(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const filtro = filtroConstutor(req);

            const listas = await ListaComprasModel.find(filtro);
            return res.status(200).json(listas || []);

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inesperado ao tentar pegar lista de compras!');
        }
    }

    async pegarUmaLista(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const usuarioId = req.body.usuarioId;
            const listaId = req.params.listaId;
            const lista = await ListaComprasModel.findOne({ usuarioId, _id: listaId });
            return res.status(200).json(lista || {});

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inxeperado ao tentar pegar a lista de compra!');
        }
    }

    async removerLista(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const usuarioId = req.body.usuarioId;
            const listaId = req.params.listaId;
            const listaDeletada = await ListaComprasModel.findOneAndRemove({ _id: listaId, usuarioId }).exec();

            if (listaDeletada) {
                return res.status(200).json({message: 'lista de compras deleteda'});
            }

            return res.status(400).json({message:'não há lista a ser removida para este usuário'});

        } catch (err) {
            console.log(err);
            return res.status(500).json('Não foi possível excluir o aplicativo devido a um erro');
        }
    }

    async atualizarLista(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const usuarioId = req.body.usuarioId;
            const listaId = req.params.listaId;

            const listaCompras = await ListaComprasModel.findOne({ usuarioId, _id: listaId });

            if (!listaCompras) {
                return res.status(400).json({errorMessage:'lista de compras a ser atualizada não existe'});
            }

            const listaComprasAtualizar = {};

            if (req.body.descricao) {
                listaComprasAtualizar.descricao = req.body.descricao;
            }

            if (req.body.categoriaId) {
                const novaCategoria = await CategoriaModel.findOne({_id: req.body.categoriaId}) || null;

                if (!novaCategoria) {
                    return res.status(400).json({errorMessage:'categoria a ser atualizada não existe'});
                }

                listaComprasAtualizar.categoriaId = novaCategoria._id;
            }

            const listaAtualizada = await ListaComprasModel.updateOne({ usuarioId, _id: listaId }, listaComprasAtualizar);
            return res.status(200).json({message:'lista de compras foi atualizada com sucesso', listaCompras: listaAtualizada});

        } catch (err) {
            console.log(err);
            return res.status(500).json('aplicativo incapaz de atualizar a lista de compras devido a um erro');
        }
    }

}

const filtroConstutor =  (req) => {
    const filtro = {
        usuarioId: req.body.usuarioId
    };

    if (req.query.descricao) {
        filtro.descricao = { $regex: `.*${req.query.descricao}.*` };
    }

    if (req.query.categoriaId) {
        filtro.categoriaId = req.query.categoriaId;
    }

    if (req.query.created) {
        const dataUtil = new DataUtil();
        const inicioData = dataUtil.getStartDayOfDate(req.query.created);
        const fimData = dataUtil.getEndDayOfDate(req.query.created);

        filtro.created = { $gte: inicioData, $lte: fimData };
    }

    return filtro;
};
