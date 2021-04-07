const express = require('express');
const route = express.Router();
const homeController = require('./src/controller/HomeController');
const loginController = require('./src/controller/LoginController');


// Rotas da home
route.get('/', homeController.index);

//rotas de login
route.get('/login/index',loginController.index);

module.exports = route;