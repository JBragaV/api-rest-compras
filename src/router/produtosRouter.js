const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConf = require('../config/auth/auth.json');
const itensControler = require('../controllers/itensControlle');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConf.secret, {
        expiresIn: 7200
    })
}

router.post('/register', itensControler.adicionar);
router.get('/', itensControler.listar);
router.get('/:itemId', itensControler.listarItem);
router.get('/user/:userId', itensControler.listarItemUsuario);
router.put('/:itemId', itensControler.atualizar);
router.delete('/:itemId', itensControler.deletar);


module.exports = router;
//module.exports = app => app.use('/item', router)