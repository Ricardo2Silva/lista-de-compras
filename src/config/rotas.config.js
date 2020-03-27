import autenticacaoRotas from '../routes/autenticacao.routes';
import listaComprasRotas from '../routes/listaCompras.routes';
import itemListaRotas from '../routes/itemLista.routes';
import categoriaRotas from '../routes/categoria.routes';
import swaggerRotas from '../config/swagger.config';


export default (app) =>{
    app.use('',swaggerRotas);
    app.use('/api/compras',listaComprasRotas);
    app.use('/api/autenticacao',autenticacaoRotas);
    app.use('/api/itemLista',itemListaRotas);
    app.use('/api/categoria',categoriaRotas);

    app.get('*', (req, res) => res.render('naoEncontrado',{nomeApp:'Lista de compras'}))
}