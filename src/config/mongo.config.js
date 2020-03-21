import mongoose from 'mongoose';
import envVariaveis from './environment.config';

if(envVariaveis.variables.env ==='dev'){
    mongoose.set('debug',true);
}


export default () => {
    mongoose.connect(envVariaveis.variables.mongoUrlConexao, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('mongo esta conectado!');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('mongo foi desconectado!');
    });

    mongoose.connection.on('error', (err) => {
        console.log(' Houve um erro enquanto tentava conectar com o banco de dados do mongo:', err);
    });

}
