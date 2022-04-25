const express = require('express');
const route = express.Router();

const DashFinancesController = require('../controllers/DashFinancesController');
const checkToken = require('../middleware/token');

route.post('/', DashFinancesController.store) // Create new finance
route.get('/', DashFinancesController.index) // Read finances
route.put('/:id', DashFinancesController.update) // Update fincance
route.delete('/:id', DashFinancesController.delete) // Delete finance

module.exports = route;