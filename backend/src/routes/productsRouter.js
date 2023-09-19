const express = require('express');
const { validateNewProduct } = require('../middlewares/validateNewProduct');
const productController = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productController.readAllProducts);
productsRouter.get('/:id', productController.readProductsById);
productsRouter.post('/', validateNewProduct, productController.createProduct);
    
module.exports = productsRouter;