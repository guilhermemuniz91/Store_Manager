const salesModel = require('../models/sales.model');

const readAllSales = async () => {
  const result = await salesModel.readAllSales();
  return { type: null, message: result };
};

const readSalesById = async (id) => {
  const result = await salesModel.readSalesById(id);
  if (result.length === 0) return { type: 404, message: 'Sale not found' };

  return { type: null, message: result };
};

const createSale = async (sales) => {
  const saleId = await salesModel.createSale();
  const result = await salesModel.createSaleProducts({ id: saleId, sales });
  return { type: null, message: result };
};

module.exports = {
    readAllSales,
    readSalesById,
    createSale,
};