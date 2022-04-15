const CreateAccountModel = require('../models/CreateAccount');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcrypt')

class CreateAccountController {
  async store(req, res) {
    try {
      const { firstName, lastName, email, passwordVirtual } = req.body;

      const emailExists = await CreateAccountModel.findOne({ email: email });
      if (emailExists) return res.status(401).json({ error: "email is already being used" });

      if (!email) return res.status(404).json({ error: "Required a E-mail " });
      if (!passwordVirtual) return res.status(404).json({ error: "Required a Password" });

      const password = await bcrypt.hash(passwordVirtual, 8);

      const newUser = await CreateAccountModel.create({ firstName, lastName, email, password });
      return res.json(newUser);
    } catch (e) {
      return console.log(e)
    }
  }

  async index(req, res) {
    const users = await CreateAccountModel.find();
    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;
    const user = await CreateAccountModel.findById({ _id: id });

    if (!user) return res.status(401).json({ error: "User dont found" });

    return res.json(user);
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const userDeleted = await CreateAccountModel.findByIdAndDelete({ _id: id });
      const { firstName, lastName, email } = userDeleted;
      if (userDeleted) {
        return res.json(firstName, lastName, email);
      }
      return res.status(404).json({ error: 'User não encontrado' });
    } catch (e) {
      console.log(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, passwordVirtual } = req.body;

      if (!passwordVirtual) return res.status(400).json({ error: "Required a Password" });
      const password = await bcrypt.hash(passwordVirtual, 8);

      const newUser = await CreateAccountModel.findByIdAndUpdate({ _id: id }, { firstName, lastName, email, password });
      return res.json({ firstName, lastName, email, password });
    } catch (e) {
      console.log(e)
    }
  }

  async login(req, res) {
    try {
      const { email, passwordVirtual } = req.body;
      const user = await CreateAccountModel.findOne({ email: email});
      if (!user) {
        return res.status(404).json({ error: 'User not exists.' })
      }

      if (user) {
        if (!passwordVirtual) return res.status(400).json({ error: "Password required" });
        if (!bcrypt.compareSync(passwordVirtual, user.password)) {
          res.status(400).json({ error: 'Password incorrect.' });
          return;
        }
      }
      const secret = process.env.TOKEN_SECRET
      const token = jwt.sign({id: user._id}, secret)

      return res.status(200).json({msg: "Authentication done successfully", token})
    } catch (e) {
      return console.log(e);
    }
  }

  async home(req, res){
    const id = req.params.id

    const user = await CreateAccountModel.findById( id, '-password' );
    if(!user) return res.status(404).json({error: "user not exists"})

    res.status(200).json({ user });
  }
}

module.exports = new CreateAccountController();
