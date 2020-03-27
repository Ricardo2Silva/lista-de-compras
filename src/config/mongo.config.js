import mongoose from 'mongoose';

if(process.env.APP_ENV ==='dev'){
    mongoose.set('debug',true);
}

export default () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify:false,
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
