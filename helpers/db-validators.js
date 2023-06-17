const { Categoria, Producto, Role, Usuario } = require('../models/index.js');

const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({ role });
    if (!existeRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }
}

const emailExiste = async (email = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email} ya se encuentra en la base de datos`);
    }
}

const existeUsuarioPorId = async (id) => {
    //Verificar si el correo existe
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`el id ${id} no existe`);
    }
}

const categoriaPorId = async (id) => {
    //Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`el id ${id} no existe`);
    }
}

const productoPorId = async (id) => {
    //Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`el id ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    categoriaPorId,
    productoPorId
}