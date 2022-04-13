const express = require('express');
const route = express.Router();

const createAccountController = require('../controllers/createAccountController');

route.get('/', createAccountController.index) // Lista user
route.post('/', createAccountController.store) // Create new user


module.exports = route;