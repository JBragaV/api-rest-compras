const mongoose = require('mongoose');

const listaSchema = new mongoose.Schema({
    produto: {},
    quantidade: {},
    autor: {},
    dataInclusao: {}
})