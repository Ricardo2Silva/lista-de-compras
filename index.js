import expressConfig from './src/config/express.config';

expressConfig().listen(3000,()=>{
    const porta = 3000;
    const env = 'dev';
    console.log('Ambiente: ', env);
    console.log('o servidor esta trabalhando na porta :',porta )

});
