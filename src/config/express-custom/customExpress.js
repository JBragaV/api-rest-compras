const express = require('express');
const consign = require('consign');
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

consign().include('./src/routes').into(app);

require('../../controllers/authController')(app);

module.exports = app;