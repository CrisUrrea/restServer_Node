const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/users.js');
const { generarJWT } = require("../helpers/generar-jwt.js");


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //Verificar si el usuario esta activo
        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - state: False'
            })
        }

        //Verificar la contraseña
        const validatePassword = bcryptjs.compareSync(password, usuario.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}