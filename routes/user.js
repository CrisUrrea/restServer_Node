const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio y mas de 6 caracteres').isLength({ min: 6 }),
    check('email').custom(emailExiste),
    // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;