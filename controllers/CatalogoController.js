const Catalogo = require('../models/Catalogo');

const { sequelize } = require('../config/db');
const { Sequelize } = require("sequelize");

exports.ObtenerCatalogo = async (req, res) => {
    try {
        const catalogo = await Catalogo.findAll();

        res.json({catalogo});
    } catch (error) {
        console.log(error);
        res.json({mensaje: 'Ocurrio un error'});
        return;
    }
}