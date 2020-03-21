import sistemaVariaveis from 'dotenv';
import prd from '../environments/environment.prd';
import  dev from '../environments/environment.dev';


const config = () =>{
    const env ={};

    sistemaVariaveis.config();
    if (process.env.APP_ENV=== 'dev') {
        env.variables =dev();
    }

    if (process.env.APP_ENV=== 'prd') {
        env.variables =prd();
    }
    return env;

};

export default config();