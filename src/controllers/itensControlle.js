const express = require('express');

const authMiddleware = require('../midleware/auth');

//router.use(authMiddleware);

module.exports = {
    async adicionar(req, res, next) {
        res.send("A rota add está funcionando perfeitamente!!!");
    },

    async listar(req, res, next){
        try{
            //await knex("produtos").select()

            res.send("A rota está funcionando perfeitamente!!!")
        }catch(err){

        }
    },
    async listarItem(req, res, next){
        res.send("A rota listar 1 está funcionando perfeitamente!!!");
    },
    async atualizar(req, res, next) {
        res.send("A rota atualizar está funcionando perfeitamente!!!");
    },
    async deletar(req, res, next) {
        res.send("A rota deletar está funcionando perfeitamente!!!");
    }
}