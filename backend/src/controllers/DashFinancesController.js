const DashFinancesModel = require('../models/DashFinances');

class DashFinancesController {
  async store(req, res) {
    try {
    const {name, description, value} = req.body;
    if(!name || !description || !value) return res.status(400).json({error: 'Fill in all required fields'})
    const createdAt = new Date();
    const finance = await DashFinancesModel.create({
      name,
      description,
      value,
    })
    return res.status(201).json(finance)
    }catch(e) {
      console.log(e);
    }
  }

  async index(req, res) {
    try {
    const finances = await DashFinancesModel.find()
    if(!finances) return res.status(401).json({error: 'Finances not found'})
    return res.status(201).json(finances)
    }catch(e) {
      console.log(e);
    }

  }
  async update(req, res) {
    try {
    const { id } = req.params;
    const { name, description, value } = req.body;
    const created = new Date();

    if(!name || !description || !value) return res.status(400).json({error: 'Fill in all fields to update finances'})

    const newFinance = await DashFinancesModel.findByIdAndUpdate({ _id: id }, {
      name,
      description,
      value,
    });
    return res.json({ name, description, value});
    }catch(e) {
      console.log(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const financeDeleted = await DashFinancesModel.findByIdAndDelete({ _id: id });
      const { name, description, value } = financeDeleted;
      if (!financeDeleted) res.status(404).json({error: 'Finance not exists'})
      return res.status(201).json({name, description, value});
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new DashFinancesController();