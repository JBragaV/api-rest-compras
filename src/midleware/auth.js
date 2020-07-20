const jwt = require("jsonwebtoken");
const authConf = require("../config/auth/auth.json");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).send({Erro: "Token não foi informado!!!"});

    const parts = authHeader.split(" ");

    if(!parts.length === 2) return res.status(401).send({Erro:"Erro de token"});

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) return res.status(401).send({Erro: "Token Malformado"});

    jwt.verify(token, authConf.secret, (err, decoded) => {
        if(err) return res.status(401).send({Erro: "Token Inválido"});

        req.userId = decoded.id;

        return next();
    })
}