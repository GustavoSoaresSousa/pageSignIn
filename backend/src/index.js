const express = require('express');
require('dotenv').config();

const cors = require('cors');

const createAccountRoute = require('./routes/createAccountRoute');
const dashFinaceRoute = require('./routes/dashFinanceRoutes');



class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }
  middleware() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  routes() {
    this.app.use('/createAccount/', createAccountRoute);
    this.app.use('/finances/', dashFinaceRoute);
  }
}


module.exports = new App().app;