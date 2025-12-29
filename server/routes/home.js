const { Router } = require('express');
const controller = require('../controllers/home');
const home = Router();

home.get('/', controller.home);


module.exports = home;