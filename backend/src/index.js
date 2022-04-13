const express = require('express');
require('dotenv').config();

// const bodyParser = require('body-parser');

const createAccountRoute = require('./routes/createAccountRoute')
class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }
  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  routes() {
    this.app.use('/', createAccountRoute);
  }
}


module.exports = new App().app;