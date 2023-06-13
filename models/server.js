const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion

        this.routes();
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
        this.app.use(this.usersRoutePath, require('../routes/user.js'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server