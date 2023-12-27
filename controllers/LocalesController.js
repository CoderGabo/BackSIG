const Local = require('../models/Locales');
const Centrocomercial = require('../models/CentroComercial');
const Comercio = require('../models/Comercio');
const Catalogo = require('../models/Catalogo');
const Producto = require('../models/Productos');

const { sequelize } = require('../config/db');
const { Sequelize } = require("sequelize");

exports.ObtenerLocales = async (req, res) => {
    try {
        const locales = await Local.findAll({
            include: [{
                model: Comercio,
                as: 'comercio',
                attributes: ['nombre']
            }]
        });

        const datosLocal = [];
        locales.map(local => {
            const datos = {};
            datos.nro = local.dataValues.nro
            datos.status = local.dataValues.status

            if(local.dataValues.comercio === null){
                datos.nombre = '';
            }else{
                datos.nombre = local.dataValues.comercio.dataValues.nombre
            }
            
        
            datosLocal.push(datos)
        })

        res.json({datosLocal});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};

exports.ObtenerLocalesAbiertos = async (req, res) => {
    try {
        const local = await Local.findAll({
            where: {
                status: 'A'
            }
        });

        res.json({local});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};

exports.ObtenerLocalesComercio = async (req, res) => {

    const {idComercio} = req.params;

    try {
        const local = await Local.findAll({
            where: {
                idComercio: idComercio
            }
        });

        res.json({local});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};

exports.ObtenerLocal = async (req, res) => {

    const {nroLocal} = req.params;

    try {
        const datosLocal = {
        };

        const local = await Local.findOne({
            where: {
                nro: nroLocal
            },
            attributes: ['nro', 'status', 'longitud', 'latitud'],
            include: [
                {
                    model: Comercio,
                    as: 'comercio',
                    attributes: ['id', 'nombre', 'sigla', 'imagen', 'direccion', 'telefono', 'mail', 'pagina']
                }
            ]
        });

        if(local.dataValues.status === 'B'){
            res.json({datosLocal: local, mensaje: 'Este local no ha sido comprado'});
            return;
        }

        datosLocal.local = {
            nro: local.dataValues.nro,
            status: local.dataValues.status,
            longitud: local.dataValues.longitud,
            latitud: local.dataValues.latitud,
            nombre: local.dataValues.comercio.dataValues.nombre,
            sigla: local.dataValues.comercio.dataValues.sigla,
            imagen: local.dataValues.comercio.dataValues.imagen,
            direccion: local.dataValues.comercio.dataValues.direccion,
            telefono: local.dataValues.comercio.dataValues.telefono,
            mail: local.dataValues.comercio.dataValues.mail,
            pagina: local.dataValues.comercio.dataValues.pagina
        };

        const idComercio = local.dataValues.comercio.dataValues.id

        const productos = await Producto.findAll({
            where: {
                idComercio: idComercio
            },
            attributes: ['id', 'producto', 'color', 'precio', 'cantidad', 'foto', 'disponible'],
            include: [
                {
                    model: Catalogo,
                    as: 'catalogo',
                    attributes: ['id', 'nombre']
                }
            ]
        });

        const listaProducto = [];

        productos.map(producto => {
            const Objetoproducto = {
                id: producto.dataValues.id,
                producto: producto.dataValues.producto,
                color: producto.dataValues.color,
                precio: producto.dataValues.precio,
                cantidad: producto.dataValues.cantidad,
                foto: producto.dataValues.foto,
                disponible: producto.dataValues.disponible,
                catalogo: producto.dataValues.catalogo.dataValues.nombre
            };

            listaProducto.push(Objetoproducto)
        })

        datosLocal.productos = listaProducto

        res.json({datosLocal});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};

exports.ObtenerLocalNombre = async (req, res) => {

    const {nombreComercio} = req.params;
    const datosComercio = {
        comercio: {
            locales: []
        }
    };
    try {
        const comercio = await Comercio.findOne({
            where: {
                nombre: nombreComercio
            }
        });

        const locales = await Local.findAll({
            where:{
                idComercio: comercio.dataValues.id
            }
        });

        datosComercio.comercio = comercio;
        datosComercio.comercio.locales = locales;

        res.json({datosComercio});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};

exports.ObtenerLocalesCatalogo = async (req, res) => {

    const {idCatalogo} = req.params;

    const datosComercio = {
        comercio: {
            locales: []
        }
    };
    try {
        const catalogo = await Catalogo.findOne({
            where: {
                id: idCatalogo
            }
        });

        if(catalogo === null){
            res.json({mensaje: 'No existe ese catalogo'});
            return;
        }

        const productos = await Producto.findAll({
            where: {
                idCatalogo: idCatalogo
            },
            attributes: ['idComercio']
        });

        // Eliminar elementos duplicados usando un conjunto (Set)
        const idComerciosUnicos = [...new Set(productos.map(producto => producto.idComercio))];

        const localesNro = [];

        await Promise.all(idComerciosUnicos.map(async idComercio => {
            const locales = await Local.findAll({
                where: {
                    idComercio: idComercio
                },
                attributes: ['nro']
            });

            locales.forEach(local => {
                localesNro.push(local.dataValues.nro);
            });
        }));
        // datosComercio.comercio = comercio;
        // datosComercio.comercio.locales = locales;

        res.json({localesNro});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
};
