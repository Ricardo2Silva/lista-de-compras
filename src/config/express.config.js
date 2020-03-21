import express from 'express';
import rotasConfig from './rotas.config';

export default () => {
    const app= express();

    rotasConfig(app)

    return app;

}