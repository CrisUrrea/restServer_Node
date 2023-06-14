const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/users.js');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const estado = { state: true }

    // const usuarios = await Usuario.find(estado)
    //     .skip(parseInt(desde))
    //     .limit(parseInt(limite));

    // const total = await Usuario.countDocuments(estado);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(estado),
        Usuario.find(estado)
            .skip(parseInt(desde))
            .limit(parseInt(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = new Usuario({ name, email, password, role });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    //ToDo validar contra base de datos
    if (password) {
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const userDB = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - Controlador',
        id,
        userDB
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    const usuario = await Usuario.findByIdAndUpdate(id, { state: false });

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}

