const salesService = require('../services/sales.service');

const readAllSales = async (req, res) => {
  const { message } = await salesService.readAllSales();
  return res.status(200).json(message);
};

const readSalesById = async (req, res) => {
  const { type, message } = await salesService.readSalesById(req.params.id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const { type, message } = await salesService.createSale(req.body);
  if (type) return res.status(404).json({ message });
  return res.status(201).json(message);
};

module.exports = {
    readAllSales,
    readSalesById,
    createSale,
};