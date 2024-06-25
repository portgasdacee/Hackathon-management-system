const express = require('express');
const userController = require('../Controllers/userController');
const route = express.Router();

route.post('/signup', userController.signup);
route.post('/login', userController.login);
route.get('/logout', userController.logout);

module.exports = route;