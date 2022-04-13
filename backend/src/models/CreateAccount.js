const mongoose = require('mongoose');

const CreateAccountSchema = new mongoose.Schema({
  firstName: {type: String, require: true},
  lastName: {type: String},
  email: {type: String, require: true},
  password: {type: String, require: true},
});

const CreateAccountModel = mongoose.model('CreateAccount', CreateAccountSchema);


module.exports = CreateAccountModel;