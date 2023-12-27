const {Sequelize} = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(
//     process.env.BD_NAME,
//     process.env.BD_USER,
//     process.env.BD_PASSWORD,
//     {
//         host: process.env.BD_HOST,
//         dialect: "postgres",
//         timezone: process.env.BD_TZ,
//         dialectOptions: {
//             ssl: {
//                 require: true,
//             },
//         },

//     }
// );

const sequelize = new Sequelize(
    'CentroComercial',
    'postgres',
    'Restaurante',
    {
        host: 'localhost',
        dialect: "postgres",
    }
);
module.exports = { sequelize };