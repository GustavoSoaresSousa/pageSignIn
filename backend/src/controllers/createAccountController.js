const CreateAccount = require('../models/CreateAccount');

const bcrypt = require('bcrypt')

class CreateAccountController {
  async store(req, res) {
    try{
      const {firstName, lastName, email, passwordVirtual} = req.body;

      const emailExists = await CreateAccount.findOne({ email: email });
      if(emailExists) return res.status(401).json({error: "email is already being used"});

      if(!email ) return res.status(404).json({error: "Required a E-mail "});
      if(!passwordVirtual) return res.status(404).json({error: "Required a Password"});

      const password = await bcrypt.hash(passwordVirtual, 8);

      const newUser = await CreateAccount.create({ firstName, lastName, email, password});
      return res.json({firstName, lastName, email, password});
    }catch(e){
      return console.log(e)
    }
  }

  async index(req, res) {
    const users = await CreateAccount.find();
    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;
    //const {email, password } = req.body;

    const user = await CreateAccount.findById({ _id: id });

    if(!user) return res.status(401).json({ error: "User dont found"});

    return res.json(user);
  }

  async delete(req, res) {
    try{
      const { id } = req.params
      const userDeleted = await CreateAccount.findByIdAndDelete({ _id:  id });
       const {firstName, lastName, email} = userDeleted;
      if(userDeleted) {
        return res.json( firstName, lastName, email );
      }
       return res.status(401).json({ error: 'User não encontrado' });
    }catch(e){
      console.log(e);
    }
  }

  async update(req, res) {
    try {
    const { id } = req.params;
    const {firstName, lastName, email, passwordVirtual} = req.body;

    if(!passwordVirtual) return res.status(404).json({error: "Required a Password"});
    const password = await bcrypt.hash(passwordVirtual, 8);

    const newUser = await CreateAccount.findByIdAndUpdate({_id: id}, {firstName, lastName, email, password});
    return res.json({firstName, lastName, email, password});
    }catch(e){
      console.log(e)
    }
  }
}

module.exports = new CreateAccountController();
