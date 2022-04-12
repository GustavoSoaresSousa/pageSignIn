const mongoose = require('mongoose');

const CreateAccountSchema = new mongoose.Schema({
  email: {type: String, require: true},
  password: {type: String, require: true},
});

const CreateAccountModel = mongoose.model('CreateAccount', CreateAccountSchema);

class CreateAccount {

}

module.exports = CreateAccount;