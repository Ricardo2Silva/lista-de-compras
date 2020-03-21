import autenticacaoRotas from '../routes/autenticacao.routes';

export default (app) =>{

app.use('/autenticacao',autenticacaoRotas);

}