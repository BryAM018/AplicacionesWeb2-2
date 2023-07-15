require('dotenv').config();
//const { Espacio, Parqueo,Vehiculo } =  require('./models')
const Server  = require('./server');


const server = new Server();


server.listen();