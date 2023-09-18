const express = require('express');
const productController = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productController.readAllProducts);
productsRouter.get('/:id', productController.readProductsById);
    
module.exports = productsRouter;