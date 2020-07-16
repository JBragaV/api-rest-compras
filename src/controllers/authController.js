const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try{
        const user = await User.create(req.body);
        user.senha = undefined;
        return res.send({user});
    }catch(err){
        console.log(err);
        return res.status(400).send({error: 'Registration failed'});
    }
});

router.post('/authenticate', async (req, res) => {
    const { nome, senha } = req.body;

    const user = await User.findOne({ nome }).select("+senha");

    if(!user) return res.status(400).status({Erro: "Usuário não encontrado"});

    if(!await bcrypt.compare(senha, user.senha)) return res.status(400).status({Erro: "Senha incorreta!!!"});

    res.send({ user })
})


module.exports = app => app.use('/user', router)