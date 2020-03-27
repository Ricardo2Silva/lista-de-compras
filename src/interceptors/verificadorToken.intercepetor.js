import jwt from 'jsonwebtoken';

export default (req,res,next)=>{

    const tokenHeader = req.header(process.env.TOKEN_HEADER_NAME);
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if (!token) {
        return res.status(400).send('access denied, token is not present');
    }

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

