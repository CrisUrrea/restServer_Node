const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersRoutePath = '/api/users';
        this.authPath = '/api/auth';

        //Conectar base de datos
        this.connectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion

        this.routes();
    }

    async connectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura y pareo del body
        this.app.use(express.json());
        // Directorio Publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.js'));
        this.app.use(this.usersRoutePath, require('../routes/user.js'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server