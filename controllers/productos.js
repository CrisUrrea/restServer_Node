const { response, request } = require("express");
const { Producto } = require("../models");

const obtenerProducto = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const estado = { estado: true };

    // const usuarios = await Usuario.find(estado)
    //     .skip(parseInt(desde))
    //     .limit(parseInt(limite));

    // const total = await Usuario.countDocuments(estado);

    const [total, productos] = await Promise.all([
        Producto.countDocuments(estado),
        Producto.find(estado)
            .populate('usuario', 'name')
            .populate('categoria', 'nombre')
            .skip(parseInt(desde))
            .limit(parseInt(limite))
    ]);

    res.json({
        total,
        productos
    });
}

const obtenerProductoId = async (req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'name');

    res.json(producto);
}

const crearProducto = async (req, res = response) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    }

    const producto = new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
}

const actualizarProducto = async (req, res = response) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

const productoDelete = async (req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        producto
    });
}

module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductoId,
    actualizarProducto,
    productoDelete
}