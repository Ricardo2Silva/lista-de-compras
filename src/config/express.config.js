import express from 'express';
import rotasConfig from './rotas.config';

export default () => {
    const app= express();
    app.use(express.json());
    rotasConfig(app);

    return app;

}