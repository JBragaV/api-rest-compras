const knex = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = {

    async addUser(req, res, next) {
        try {
            const {nome, senha} = req.body;
            
            const hash = await bcrypt.hash(senha, 10);

            await knex('users').insert({nome, senha: hash});

            res.status(201).send("Usuário criado com sucesso!!!");
        }catch(err) {
            console.log(err);
            next(err);
        }
    },

    async listar(req, res, next) {
        try {
            const users = await knex("users").select("id","nome");  
            res.send(users);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async litarUser(req, res, next){
        try {
            const id = req.params.userId;
            const user = await knex("users").select("id", "nome").where({id})
            res.send(user);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async atualizar(req, res, next){
        try {
            const id = req.params.userId;

            const { nome, senha } = req.body;
            const hash = await bcrypt.hash(senha, 10);

            await knex("users").update({nome, senha: hash}).where({id});

            res.status(201).send("Usuário atualizado com sucesso!!!");
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

    async deletar(req, res, next) {
        try {
            const id = req.params.userId;
            await knex("users").where({id}).del();
            res.status(201).send("Usuário deletado com sucesso!!!");
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}