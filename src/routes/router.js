const express = require('express');

const rota = express.Router();

rota.get('/', (req, res)=> {
    res.send("Estou funcionando!!!");
});

module.exports = app => app.use('/', rota);
