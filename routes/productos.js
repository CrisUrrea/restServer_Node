const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { productoPorId, categoriaPorId } = require('../helpers/db-validators');
const { obtenerProductoId, obtenerProducto, crearProducto, actualizarProducto, productoDelete } = require('../controllers/productos');

const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerProducto);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un Id de mongo').isMongoId(),
    check('id').custom(productoPorId),
    validarCampos
], obtenerProductoId);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de mongo').isMongoId(),
    check('categoria').custom(categoriaPorId),
    validarCampos
], crearProducto);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de mongo').isMongoId(),
    check('id').custom(productoPorId),
    validarCampos
], actualizarProducto);

// Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un Id de mongo').isMongoId(),
    check('id').custom(productoPorId),
    validarCampos
], productoDelete);

module.exports = router;