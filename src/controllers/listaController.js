const express = require('express');

const authMiddleware = require('../midleware/auth');

const Lista = require('../models/lista');
const Produto = require('../models/produto');

const itemController = require('./itensControlle');

const router = express.Router();

router.use(authMiddleware);

router.post('/', (req, res) => {
    
});

router.get('/', (req, res) => {

});

router.put("/:listaid", async (req, res) => {
    
});



module.exports = app => app.use('/lista', router);