const Producto = require('../models/Productos');
const Catalogo = require('../models/Catalogo');
const Comercio = require('../models/Comercio');

const Local = require('../models/Locales');

const { sequelize } = require('../config/db');
const { Sequelize } = require("sequelize");

exports.ObtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();

        res.json({productos});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};

exports.ObtenerProductosDisponibles = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            where: {
                disponible: true
            }
        });

        res.json({productos});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};

exports.ObtenerProductosComercio = async (req, res) => {

    const {idComercio} = req.params;

    try {
        const productos = await Producto.findAll({
            where: {
                idComercio: idComercio
            }
        });

        if (productos.length === 0){
            res.json({mensaje: 'Esta tienda no tiene productos a vender.'});
            return;
        }


        res.json({productos});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};

exports.ObtenerProductosCatalogo = async (req, res) => {

    const {catalogo} = req.params;

    console.log(catalogo);

    const idCatalogo = await Catalogo.findOne({where: {
        nombre: catalogo
    }});

    if(!idCatalogo){
        return res.json({mensaje: 'Ese catalogo no existe'})
    };

    console.log(idCatalogo.id)

    try {
        const productos = await Producto.findAll({
            where: {
                idCatalogo: idCatalogo.id
            }
        });

        if (productos.length === 0){
            res.json({mensaje: 'No existe un producto para ese catalogo'});
            return;
        }

        res.json({productos});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};