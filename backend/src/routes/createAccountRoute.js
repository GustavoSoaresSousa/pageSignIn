const express = require('express');
const route = express.Router();

const createAccountController = require('../controllers/CreateAccountController');
const checkToken = require('../middleware/token');

route.get('/', createAccountController.index) // Lista user
route.get('/:id', createAccountController.show) // Lista a user
route.post('/', createAccountController.store) // Create new user
route.put('/:id', createAccountController.update) // Update user
route.delete('/:id', createAccountController.delete) // Delete user

route.post('/login', createAccountController.login) // Login User

route.get('/home/:id', checkToken, createAccountController.home);
module.exports = route;