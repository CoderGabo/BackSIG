const {Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db');

const Catalogo = sequelize.define('catalogo', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
}, {
    tableName: 'catalogo',
    timestamps: false,
});
module.exports = Catalogo;