import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import mongoDatabase from './src/config/mongo.config';
import expressConfig from './src/config/express.config';

const args = process.argv;
const path = args.includes('env-prd') ? 'prd.env' : 'dev.env';
const env  = dotenv.config({path});
dotenvExpand(env);

mongoDatabase();

// run this peace of code to insert categories
import CategoriaService from "./src/services/categoria.service";
//new CategoriaService().categoriaPopularColecao();

expressConfig().listen(process.env.PORT,()=>{

    console.log('Ambiente: ', process.env.APP_ENV);
    console.log('o servidor esta trabalhando na porta :', process.env.PORT)

});