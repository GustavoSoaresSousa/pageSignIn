const CreateAccount = require('../models/CreateAccount')

class CreateAccountController {
  async store(req, res) {
    try{
      const {firstName, lastName, email, password} = req.body;

      if(!firstName || !email || !password) {
        return res.status(404).json({error: "Required a First Name | E-mail | Password"});
      }
      const newUser = await CreateAccount.create(req.body);
      return res.json({firstName, lastName, email, password});
    }catch(e){
      return console.log(e)
    }
  }

  async index(req, res) {
    const users = await CreateAccount.find();
    // const { firstName, lastName, email, password } = user;
    return res.json(users);
  }
}

module.exports = new CreateAccountController();
