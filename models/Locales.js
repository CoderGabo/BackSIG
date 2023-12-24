const {Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db');

const CentroComercial = require('./CentroComercial');
const Comercio = require('./Comercio');

const Local = sequelize.define('local', {
    nro:{
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    latitud: {
        type: DataTypes.DECIMAL(12, 8),
        allowNull: false,
    },
    longitud: {
        type: DataTypes.DECIMAL(12, 8),
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    idCentroComercial:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idComercio:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'local',
    timestamps: false,
});

Local.belongsTo(CentroComercial, {
    foreignKey: 'idCentroComercial',
    allowNull: false,
});
  
Local.belongsTo(Comercio, {
    foreignKey: 'idComercio',
    allowNull: false,
});

module.exports = Local;