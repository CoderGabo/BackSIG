const {Sequelize, DataTypes} = require('sequelize');
const { sequelize } = require('../config/db');

const Comercio = sequelize.define('comercio', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    sigla:{
        type: DataTypes.STRING(8),
        allowNull: false,
    },
    imagen:{
        type: DataTypes.BLOB,
        allowNull: true,
    },
    direccion:{
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING(8),
        allowNull: true,
    },
    mail: {
        type: Sequelize.STRING(),
        allowNull: true,
        unique: true,
        validate: {
        isEmail: true,
        },
    },
    pagina: {
        type: Sequelize.STRING(),
        allowNull: true,
    },
    idSig: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'comercio', 
    timestamps: false,
});
module.exports = Comercio;