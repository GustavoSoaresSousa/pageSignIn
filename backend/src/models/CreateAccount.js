const mongoose = require('mongoose');
const validator = require('validator');

const CreateAccountSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
});

const CreateAccountModel = mongoose.model('CreateAccount', CreateAccountSchema);

module.exports = CreateAccountModel;