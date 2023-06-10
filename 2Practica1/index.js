const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 2500;

    this.paths = {
      products: '/api/products',
      categories: '/api/categories',
      tipoGas: '/api/tipo-gas',
    };

    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use('/uploads/', express.static('uploads'));
  }

  routes() {
    this.app.use(this.paths.products, require('./routes/products'));
    this.app.use(this.paths.categories, require('./routes/categories'));
    this.app.use(this.paths.tipoGas, require('./routes/tpGasolina'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor ejecutándose en puerto ${this.port}`);
    });
  }
}

module.exports = Server;