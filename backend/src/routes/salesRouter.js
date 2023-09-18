const express = require('express');
const salesController = require('../controllers/sales.controller');

const salesRouter = express.Router();

salesRouter.get('/', salesController.readAllSales);
salesRouter.get('/:id', salesController.readSalesById);

module.exports = salesRouter;