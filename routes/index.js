const express = require('express');
const router = express.Router();

const ComercioController = require('../controllers/ComercioController');
const LocalController = require('../controllers/LocalesController');
const ProductoController = require('../controllers/ProductoController');
const CatalogoController = require('../controllers/CatalogoController');

module.exports = function(){

    // Comercio o tiendas
    router.get('/comercio',
        ComercioController.ObtenerComercios,
    );

    // Locales
    router.get('/locales',
        LocalController.ObtenerLocales,
    );

    router.get('/locales/abiertos',
        LocalController.ObtenerLocalesAbiertos,
    );

    router.get('/locales/:idComercio',
        LocalController.ObtenerLocalesComercio,
    );


    // Productos
    router.get('/productos',
        ProductoController.ObtenerProductos,
    );

    router.get('/productos/disponibles',
        ProductoController.ObtenerProductosDisponibles,
    );

    router.get('/productos/comercio/:idComercio',
        ProductoController.ObtenerProductosComercio,
    );

    router.get('/productos/catalogo/:catalogo',
        ProductoController.ObtenerProductosCatalogo,
    );

    // Catalogo
    router.get('/catalogo',
        CatalogoController.ObtenerCatalogo
    );

    return router
};
