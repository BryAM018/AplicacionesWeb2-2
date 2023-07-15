const express =  require('express');
const cors = require('cors');

const { dbConnection } =  require('./database/config');

class Server 
{
    constructor()
    {
        this.port = process.env.PORT
        this.app = express.Router()
        this.router = express.Router()

        

        this.paths = {
            parqueos: '/parqueos',
            espacios: '/espacios',
            vehiculos: '/vehiculos'
        }

        this.connectDB();
        this.addMiddleware();
        this.routes();
        this.router.use('/v1/inventory', this.app); 
        this._express = express().use(this.router);
    }
   async connectDB(){
        await dbConnection();
    }
    addMiddleware(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'));
        this.app.use( '/uploads/', express.static('uploads'))

    }
    configRoutes(){
        this.app.use(this.paths.parqueos, require('./routes/parqueos')   )
        this.app.use(this.paths.espacios, require('./routes/espacios')   )
        this.app.use(this.paths.vehiculos, require('./routes/vehiculos')   )
    }

    listen(){
        this._express.listen(this.port, ()=>{
            console.log(`Servidor ejecuntando en puerto ${this.port}`)
        })
    }


}


module.exports = Server;