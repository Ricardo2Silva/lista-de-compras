import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import DataUtil from '../utils/data.util';
import {validationResult} from "express-validator";
import UsuarioModel from '../models/usuario.model';
import AtivacaoCodigoModel from '../models/codigoAtivacao.model';
import AtivacaoCodigoService from "../services/codigoAtivacao.service";
import RefreshTokenModel from '../models/refreshToken.model';

export  default class autenticacaoController{

    async registrar(req,res){

        const erros = validationResult(req);

        if (!erros.isEmpty()){
            return res.status(400).json(erros);
        }

        const existeEmail = await UsuarioModel.findOne({email:req.body.email});

        if(existeEmail){
            res.status(400).json({erro:'o email já existe'});

        }

        try{
            const salt = await bcrypt.genSalt(10);
            const hashedSenha= await bcrypt.hash(req.body.senha,salt);

            const usuario =new UsuarioModel({
                nome:req.body.nome,
                email:req.body.email,
                senha:hashedSenha
            });
            const usuarioSalvo =await usuario.save();

            const ativacaoCodigoService = new AtivacaoCodigoService();
            const enviarCodigoAtivacao = ativacaoCodigoService.enviarAtivacaoCodigo(usuario.email);
            const emailMensagem = enviarCodigoAtivacao ? 'a ativação do código foi enviada para o email' :'ocorreu um erro ao tentar enviar a ativação do código por email. vá para / auth / activation';

            return res.status(201).json({usuarioId: usuarioSalvo._id, mensagem: emailMensagem});


        }catch (err) {
           return res.status(500).json('houve um erro inesperado');
        }



    }


    async login(req,res){

        const erros = validationResult(req);

        if (!erros.isEmpty()){
            return res.status(400).json(erros);
        }

        const usuario = await UsuarioModel.findOne({email:req.body.email});

        if(!usuario){
            return res.status(400).json({erro: 'email ou senha invalidos!'});
        }

        const senhaValida= await bcrypt.compare(req.body.senha,usuario.senha);

        if(!senhaValida){
            return res.status(500).json({erro:'email ou senha invalidos!'});
        }

        const payload = {
            usuarioId: usuario._id,
            usuarioNome: usuario.nome,
            usuarioEmail: usuario.email
        };

        const tokenAcesso = geradorCodigoToken(payload);
        const tokenAcessoRefresh = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRETO);

        const refreshTokenModel = new RefreshTokenModel({
            refreshToken: tokenAcessoRefresh
        });

        const refreshTokenSalvo = await refreshTokenModel.save();

        const resObj = {
          tokenAcesso,
          tokenAcessoRefresh: refreshTokenSalvo.refreshToken,
          tipoToken:'Bearer'
        };

        return res.status(200).json(resObj);
    }
    async enviarCodigoAtivacao(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const email = req.body.email;
            const usuario = await UsuarioModel.findOne(email);

            if (usuario && usuario.active) {
                return res.status(400).json({ errorMessage:'Usuário já ativado' });
            }
            const ativacaoCodigoService = new AtivacaoCodigoService();
            const enviarCodigoAtivacao = ativacaoCodigoService.enviarAtivacaoCodigo(usuario.email);
            const emailMensagem = enviarCodigoAtivacao ? 'a ativação do código foi enviada para o email' :'ocorreu um erro ao tentar enviar a ativação do código por email. vá para / auth / activation';

            return res.status(201).json({mensagem: emailMensagem});

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inesperado ao tentar enviar a ativação do código. tente novamente mais tarde');
        }

    }
    async ativarConta(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const email = req.body.email;
            const codigo = req.body.activationCode;

            const usuario = await UsuarioModel.findOne({email});

            if (!usuario) {
                return res.status(400).json({ errorMessage: 'Email  nao existe  em seu database' });
            }

            if (usuario.active) {
                return res.status(400).json({ errorMessage: 'Usuário já ativado' });
            }

            const ativacao = AtivacaoCodigoModel.findOne({ email, codigo });

            if (!ativacao) {
                return res.status(400).json({ errorMessage:'código de ativação não corresponde' });
            }

            const dataUtil = new DataUtil();

            if (!dataUtil.isCodeActivationDateValid(ativacao.generated)) {
                return res.status(400).json({ errorMessage:'o código de ativação expirou. Por favor gere outro código' });
            }

            UsuarioModel.updateOne({_id: usuario._id}, { active: true });
            return res.status(201).json({ errorMessage: 'Usuário foi ativado' });

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inesperado ao tentar ativar a conta. tente novamente mais tarde');
        }

    }
    async desativarConta(req, res) {
        try {
            const erros = validationResult(req);

            if (!erros.isEmpty()) {
                return res.status(400).json(erros);
            }

            const usuario = await UsuarioModel.findOne({email: req.body.email});

            if (!usuario) {
                return res.status(400).json({errorMessage: 'email ou senha invalidos!'});
            }

            if (!usuario.active) {
                return res.status(401).json({errorMessage:'Conta de usuário já desativada'});
            }

            const senhaValida = await bcrypt.compare(req.body.senha, usuario.senha);

            if (!senhaValida) {
                return res.status(400).json({errorMessage: 'email ou senha invalidos!'});
            }

            usuario.active = false;
            UsuarioModel.updateOne({_id: usuario._id}, { active: false });
            return res.status(201).json({ errorMessage:'Usuário desabilitado' });

        } catch (err) {
            console.log(err);
            return res.status(500).json('houve um erro inesperado ao tentar ativar a conta. tente novamente mais tarde');
        }

    }
    async logout(req, res) {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({errorMessage: ' o campo refreshToken  é requerido dentro do corpo'});
        }

        const tokenDeleted = await RefreshTokenModel.findOneAndRemove({refreshToken}).exec();

        if (tokenDeleted) {
            return res.status(200).json({message: 'refresh token deletado'});
        }

        return res.status(400).json({message: ' nao houve token para ser removido!'});
    }

    async getRefreshToken(req, res) {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({errorMessage: ' campo refreshToken é requerido dentro do corpo'});
        }

        const contains = await RefreshTokenModel.countDocuments({refreshToken});

        if (!contains) {
            return res.status(403).json({errorMessage: 'refresh token nao existe'});
        }

        try {
            const user = await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETO);
            const accessToken = geradorCodigoToken(user);
            return res.status(200).json({accessToken});

        } catch (err) {
            return res.status(403).json({ errorMessage: 'refresh token is not valid' });
        }

    }
}

function geradorCodigoToken(payload){
    return jwt.sign(payload,process.env.TOKEN_SECRETO,{expiresIn: '1800s'});
}
