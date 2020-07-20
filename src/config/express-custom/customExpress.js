const express = require('express');
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const userRouter = require("../../router/userRouter");
const itemRouter = require("../../router/produtosRouter");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/user', userRouter);
app.use('/produto', itemRouter);
//require('../../controllers/index')(app);

app.use((req, res, next) => {
    const error = new Error('End Point não encontrado!!!');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    const status = error.status || 500;
    var mensage ="Ocorreu um erro aqui dentro de mim... Desculpe, tente mais tarde!!!"
    if(status !== 500) {
        mensage = error.message;
    }
    res.status(status).send({erro: mensage});
})

module.exports = app;