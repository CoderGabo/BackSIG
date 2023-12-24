const {Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db');

const Comercio = require('./Comercio');
const Catalogo = require('./Catalogo');

const Producto = sequelize.define('producto', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    producto: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
    },
    precio:{
        type: DataTypes.INTEGER,
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    foto:{
        type: DataTypes.BLOB,
        allowNull: true,
    },
    disponible: {
        type: DataTypes.BOOLEAN,
    },
    idCatalogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idComercio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'producto',
    timestamps: false,
});

Producto.belongsTo(Comercio, {
    foreignKey: 'idComercio',
    allowNull: false,
});

Producto.belongsTo(Catalogo, {
    foreignKey: 'idCatalogo',
    allowNull: false,
});

module.exports = Producto;