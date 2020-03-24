import autenticacaoRotas from '../routes/autenticacao.routes';
import listaCompras from '../routes/listaCompras.routes';

export default (app) =>{

    app.use('/compras',listaCompras);
    app.use('/autenticacao',autenticacaoRotas);

}