const { sequelize } = require('../config/db');
const { Sequelize } = require("sequelize");
const Comercio = require('../models/Comercio');

exports.ObtenerComercios = async (req, res) => {
    try {
        const comercio = await Comercio.findAll();

        res.json({comercio});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
}