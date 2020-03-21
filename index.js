import mongoDatabase from './src/config/mongo.config';
import expressConfig from './src/config/express.config';
import envVariaveis from './src/config/environment.config';

mongoDatabase();

expressConfig().listen(envVariaveis.variables.port,()=>{

    console.log('Ambiente: ',process.env.APP_ENV);
    console.log('o servidor esta trabalhando na porta :',envVariaveis.variables.port )

});
