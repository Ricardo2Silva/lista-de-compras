import bcrypt from 'bcryptjs';
import jwt from 'jsonWebtoken';
import UsuarioModel from '../models/usuario.model';

export  default class autenticacaoController{

    async registrar(req,res){



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

            return res.status(201).json({usuarioID:usuarioSalvo._id});

        }catch (err) {
           return res.status(500).json('houve um erro inesperado');
        }



    }


    async login(req,res){

        const usuario = await UsuarioModel.findOne({email:req.body.email});

        if(!usuario){
            return res.status(400).json({erro: 'email ou senha invalidos!'});
        }

        const senhaValida= await bcrypt.compare(req.body.senha,usuario.senha)

        if(!senhaValida){
            return res.status(500).json({erro:'email ou senha invalidos!'});
        }


        const payload = {usuarionome:usuario.nome,permissao:['all']};
        const tokenAcesso = jwt.sign(payload,process.env.TOKEN_SECRETO);

        res.header('Autenticacao',tokenAcesso);

        return res.status(200).json('sucesso');
    }

}
