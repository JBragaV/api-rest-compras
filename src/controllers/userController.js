const knex = require('../config/db');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const authConf = require('../config/auth/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConf.secret, {
        expiresIn: 7200
    })
}

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
    },

    async login(req, res, next) {
        try {
            const { nome, senha } = req.body;
        
            const user = await knex("users").select("id", "nome", "senha").where({nome});
            
            
            if(!user) return res.status(400).send({Erro: "Usuário não encontrado"});
        
            if(!await bcrypt.compare(senha, user[0].senha)) return res.status(400).send({Erro: "Senha incorreta!!!"});
            
            //user.senha = undefined;
            //console.log("Até aqui está rodando bem!!!");
            //res.send({ user });
            res.send({ user, token: generateToken({id: user[0].id}) })
            
        } catch (error) {
           console.log(error);
           next(error); 
        }
    }
}