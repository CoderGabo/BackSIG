const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    'postgres',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        // timezone: process.env.DB_TZ,
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //     },
        // },

    }
);

// const sequelize = new Sequelize(
//     'CentroComercial',
//     'postgres',
//     'Restaurante',
//     {
//         host: 'localhost',
//         dialect: "postgres",
//     }
// );
module.exports = { sequelize };