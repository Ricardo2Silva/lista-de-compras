import jwt from 'jsonwebtoken';

export default (req,res,next)=>{

    const token =req.header(process.env.TOKEN_HEADER_NOME);

    if(!token){
        return res.status(400).send('acesso negado,token nao esta presente');
    }

   try{
        const usuario = jwt.verify(token,process.env.TOKEN_SECRETO);
        req.body.usuarioId = usuario.usuarioId;

        next();

   }catch(error){
       return res.status(500).send('token invalido!');
    }
}

