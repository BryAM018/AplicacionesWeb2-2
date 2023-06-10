const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 2500;

    this.paths = {
      parqueos: '/api/parqueos',
      espacios: '/api/espacios',
      vehiculos: '/api/vehiculos',
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
    this.app.use(this.paths.parqueos, require('./routes/parqueos'));
    this.app.use(this.paths.espacios, require('./routes/espacios'));
    this.app.use(this.paths.vehiculos, require('./routes/vehiculos'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor ejecutándose en puerto ${this.port}`);
    });
  }
}

module.exports = Server;