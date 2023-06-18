const { Categoria, Producto, Role, Usuario } = require('../models/index.js');

/**
 * 
 * @param {string} role 
 */
const esRoleValido = async (role = '') => {
    const existeRole = await Role.findOne({ role });
    if (!existeRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }
}

/**
 * 
 * @param {string} email 
 */
const emailExiste = async (email = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email} ya se encuentra en la base de datos`);
    }
}

/**
 * 
 * @param {string} id 
 */
const existeUsuarioPorId = async (id) => {
    //Verificar si el correo existe
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`el id ${id} no existe`);
    }
}

/**
 * 
 * @param {string} id 
 */
const categoriaPorId = async (id) => {
    //Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`el id ${id} no existe`);
    }
}

/**
 * 
 * @param {string} id 
 */
const productoPorId = async (id) => {
    //Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`el id ${id} no existe`);
    }
}

/**
 * 
 * @param {string} coleccion 
 * @param {Array} colecciones 
 */
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida -- ${colecciones}`);
    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    categoriaPorId,
    productoPorId,
    coleccionesPermitidas
}