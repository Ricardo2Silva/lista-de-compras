import express from 'express';
import SwaggerDocs from 'swagger-jsdoc';
import SWaggerUI from 'swagger-ui-express';

const router =express.Router();


// Extended: https://swagger.io/specification/#infoObject

const swaggerOptions={
    swaggerDefinition:{
        info:{
            title:'Lista de Compras APP',
            description: 'Lista de Compras REST API',
            contact:{
                name:'Ricardo Jonas'
            },
            serves:[`${process.env.APP_HOST}:${process.env.PORT}`]
        }
    },
    apis:['./src/routes/*.js']
};

const swaggerSpecs=SwaggerDocs(swaggerOptions);
 router.use('/api-docs',SWaggerUI.serve);
 router.get('/api-docs',SWaggerUI.setup(swaggerSpecs));

export default router