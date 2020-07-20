const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConf = require('../config/auth/auth.json');
const userControler = require('../controllers/userController');

const knex = require('../config/db');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConf.secret, {
        expiresIn: 7200
    })
}

router.post('/register', userControler.addUser);
router.get('/', userControler.listar);
router.get('/:userId', userControler.litarUser);
router.put('/:userId', userControler.atualizar);
router.delete('/:userId', userControler.deletar);



router.post('/authenticate', async (req, res) => {
    const { nome, senha } = req.body;

    //const user = await User.findOne({ nome }).select("+senha");//Mudar a busca pelo usuario;
    
    if(!user) return res.status(400).send({Erro: "Usuário não encontrado"});

    if(!await bcrypt.compare(senha, user.senha)) return res.status(400).send({Erro: "Senha incorreta!!!"});
    
    user.senha = undefined;
    
    //res.send({ teste });
    res.send({ user, token: generateToken({id: user.id}) })
});

module.exports = router;
//module.exports = app => app.use('/user', router)