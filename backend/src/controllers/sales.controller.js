const salesService = require('../services/sales.service');

const readAllSales = async (_req, res) => {
  const { message } = await salesService.readAllSales();

  return res.status(200).json(message);
};

const readSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.readSalesById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
    readAllSales,
    readSalesById,
};