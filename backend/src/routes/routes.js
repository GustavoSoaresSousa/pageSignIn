const express = require('express');
const route = express.Router();

const createAccountController = require('../controllers/createAccountController')

route.get('/', createAccountController.login)

module.exports = route;