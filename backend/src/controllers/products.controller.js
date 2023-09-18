const productService = require('../services/products.service');

const readAllProducts = async (_req, res) => {
  const { type, message } = await productService.readAllProducts();

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const readProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.readProductsById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
    readAllProducts,
    readProductsById,
};