import autenticacaoRotas from '../routes/autenticacao.routes';
import listaComprasRotas from '../routes/listaCompras.routes';
import itemListaRotas from '../routes/itemLista.routes';
import categoriaRotas from '../routes/categoria.routes';


export default (app) =>{

    app.use('/api/compras',listaComprasRotas);
    app.use('/api/autenticacao',autenticacaoRotas);
    app.use('/api/itemLista',itemListaRotas);
    app.use('/api/categoria',categoriaRotas);

}