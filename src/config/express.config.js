import express from 'express';

export default () => {
    const app =express();

    app.get('/teste',(req,res)=>{

        res.json('o servidor esta trabalhando!');
    })

    return app;

}