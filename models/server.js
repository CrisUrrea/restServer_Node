const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config.js');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            users: '/api/users',
            uploads: '/api/upload'
        }

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
        //Fileupload - Cargar archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.js'));
        this.app.use(this.paths.buscar, require('../routes/buscar.js'));
        this.app.use(this.paths.categorias, require('../routes/categorias.js'));
        this.app.use(this.paths.productos, require('../routes/productos.js'));
        this.app.use(this.paths.users, require('../routes/user.js'));
        this.app.use(this.paths.uploads, require('../routes/uploads.js'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server