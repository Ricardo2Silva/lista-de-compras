export default () => {
    return{
        port:3000,
        defaultFormatDate: 'YYYY-MM-DD',
        mailSenderService: 'gmail',
        usernameMailSender: 'listaComprasApp',
        mongoUrlConexao:`mongodb+srv://${process.env.DBMONGO_USUARIO}:${process.env.MONGO_SENHA}@cluster0-poeal.mongodb.net/test?retryWrites=true&w=majority`
    }
}
