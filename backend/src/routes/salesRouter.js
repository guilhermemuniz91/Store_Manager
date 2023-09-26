const express = require('express');
const salesController = require('../controllers/sales.controller');
const { validationProduct, validationQuantity } = require('../middlewares/validateNewSale');

const salesRouter = express.Router();

salesRouter.get('/', salesController.readAllSales);
salesRouter.get('/:id', salesController.readSalesById);
salesRouter.post('/', validationProduct, validationQuantity, salesController.createSale);

module.exports = salesRouter;