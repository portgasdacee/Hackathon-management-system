const express = require('express');
const hackathonController = require('../Controllers/hackathonController');
const userController = require("../Controllers/userController")
const route = express.Router();


route.use(userController.isLoggedIn);
route.get('/', hackathonController.landingPage);
route.post('/', hackathonController.createEntry);
route.post('/updateEntry', hackathonController.updateEntry);
route.post('/deleteEntry', hackathonController.deleteEntry);

module.exports = route;
