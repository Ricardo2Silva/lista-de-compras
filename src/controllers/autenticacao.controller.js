import UsuarioModel from '../models/usuario.model';



export  default class autenticacaoController{
   async registrar(req,res){
        const usuario =new UsuarioModel({
            nome:req.body.nome,
            email:req.body.email,
            senha:req.body.senha
        });
       const usuarioSalvo =await usuario.save();

        if(usuarioSalvo){
            return res.status(201).json(usuarioSalvo);
        }
        return res.status(500).json('houve um erro');
    }


    login(req,res){

        res.json('login');
    }

}
