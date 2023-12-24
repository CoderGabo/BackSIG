const {Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db');

const CentroComercial = sequelize.define('centro_comercial', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.TEXT(),
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING(8),
        allowNull: true,
    },
    mail: {
        type: Sequelize.STRING(),
        allowNull: false,
        unique: true,
        validate: {
        isEmail: true,
        },
    },
    pagina: {
        type: Sequelize.STRING(),
        allowNull: true,
    },
    latitud: {
        type: DataTypes.DECIMAL(12, 8),
        allowNull: false,
    },
    longitud: {
        type: DataTypes.DECIMAL(12, 8),
        allowNull: false,
    },
}, {
    tableName: 'centro_comercial',
    timestamps: false,
});

module.exports = CentroComercial;