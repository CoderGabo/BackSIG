const Local = require('../models/Locales');
const Centrocomercial = require('../models/CentroComercial');
const Comercio = require('../models/Comercio');

const { sequelize } = require('../config/db');
const { Sequelize } = require("sequelize");

exports.ObtenerLocales = async (req, res) => {
    try {
        const local = await Local.findAll();

        res.json({local});
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