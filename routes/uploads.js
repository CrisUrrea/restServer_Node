const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarArchivo } = require('../middlewares');

const router = Router();

router.post('/', validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'El Id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarArchivo,
    validarCampos
], actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
    check('id', 'El Id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;