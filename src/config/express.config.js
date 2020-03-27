import express from 'express';
import rotasConfig from './rotas.config';

export default () => {
    const app= express();

    app.set('view engine', 'ejs');
    app.set('views', './src/views');

    app.use(express.json());
    app.use(express.static('./src/static'));
    rotasConfig(app);

    return app;

}