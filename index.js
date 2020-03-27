import mongoDatabase from './src/config/mongo.config';
import expressConfig from './src/config/express.config';
import envVariaveis from './src/config/environment.config';

mongoDatabase();

// run this peace of code to insert categories
import CategoriaService from "./src/services/categoria.service";
//new CategoriaService().categoriaPopularColecao();

expressConfig().listen(envVariaveis.variables.port,()=>{

    console.log('Ambiente: ',process.env.APP_ENV);
    console.log('o servidor esta trabalhando na porta :',envVariaveis.variables.port )

});
