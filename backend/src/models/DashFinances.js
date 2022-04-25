const mongoose = require('mongoose');
const date = new Date();

const DashFinancesSchema = new mongoose.Schema({
  name: {type: 'string', required: true},
  description: {type: 'string', required: true},
  value: {type: 'number', required: true},
  createdAt: {type: 'number', default: date.getDate()}
});

const DashFinancesModel = mongoose.model('DashFinances', DashFinancesSchema);

module.exports = DashFinancesModel;