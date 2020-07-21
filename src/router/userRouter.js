const express = require('express');

const authMiddleware = require('../midleware/auth');

const userControler = require('../controllers/userController');

const router = express.Router();

router.post('/register', userControler.addUser);

router.post('/login', userControler.login);

//autorizações
router.use(authMiddleware);
router.get('/', userControler.listar);
router.get('/:userId', userControler.litarUser);
router.put('/:userId', userControler.atualizar);
router.delete('/:userId', userControler.deletar);


module.exports = router;