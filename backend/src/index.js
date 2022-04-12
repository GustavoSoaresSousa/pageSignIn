const express = require('express');
require('dotenv').config();

const routes = require('./routes/routes')
class App {
  constructor() {
    this.app = express();
    this.routes();
    this.middlewares();
  }
  routes() {
    this.app.use(routes);
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json())
  }
}


module.exports = new App().app;