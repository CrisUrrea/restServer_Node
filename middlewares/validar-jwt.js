const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/users.js');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe DB'
            })
        }

        //Verificar si el usuario esta en estado true
        if(usuario.status){
            return res.status(401).json({
                msg: 'Token no valido - Usuario Status False'
            })
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}