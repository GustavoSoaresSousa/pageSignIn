const CreateAccount = require('../models/CreateAccount')

CreateAccount.create({
  email: 'gustavosoaresexamplo@email.com',
  password: '123456',
})
  .then(dados => console.log(dados))
  .catch(e => console.log(e));

exports.login = (req, res) => {
  res.send('Hello world')
}