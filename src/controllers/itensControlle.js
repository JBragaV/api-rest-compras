const express = require('express');

const authMiddleware = require('../midleware/auth');

//router.use(authMiddleware);

const knex = require('../config/db');

module.exports = {
    async adicionar(req, res, next) {
        try {
            const {produto, quantidade, user_id, lista_id} = req.body;
            await knex("produtos").insert({produto, quantidade, user_id, lista_id});

            res.status(201).send("Item criado com sucesso!!!");
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async listar(req, res, next){
        try{
            const { page=1 } = req.query;
            const items = await knex("produtos")
                .limit(10).offset((page - 1)*10).select()
                .join('users', 'users.id', "=", "produtos.user_id")
                .select("produtos.*", "users.nome")
            
            const [ count ] = await knex("produtos").count();
            res.header("X-Total-Count", count["count(*)"]);
            res.send({ items })
        }catch(err){
            console.log(err);
            next(err);
        }
    },
    async listarItem(req, res, next){
        try {
            const id = req.params.itemId;
            const item = await knex("produtos")
                .select().where({id});
            const [ count ] = await knex("produtos").where({id}).count();
            res.header("X-Total-Count", count["count(*)"]);
            res.send({item});
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    async listarItemUsuario(req, res, next){
        try {
            const user_id = req.params.userId;
            const items = await knex("produtos")
                .where({user_id})
                .join('users', 'users.id', "=", "produtos.user_id")
                .select("produtos.*", "users.nome")
            const [ count ] = await knex("produtos").where({user_id}).count();
            res.header("X-Total-Count", count["count(*)"]);
            res.send({items});
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    async atualizar(req, res, next) {
        res.send("A rota atualizar está funcionando perfeitamente!!!");
    },
    async deletar(req, res, next) {
        res.send("A rota deletar está funcionando perfeitamente!!!");
    }
}