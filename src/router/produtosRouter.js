const express = require('express');

const authMiddleware = require('../midleware/auth');

const itensControler = require('../controllers/itensControlle');

const router = express.Router();

router.use(authMiddleware);
router.post('/register', itensControler.adicionar);
router.get('/', itensControler.listar);
router.get('/:itemId', itensControler.listarItem);
router.get('/user/:userId', itensControler.listarItemUsuario);
router.put('/:itemId', itensControler.atualizar);
router.delete('/:itemId', itensControler.deletar);


module.exports = router;
//module.exports = app => app.use('/item', router)