const productService = require('../services/products.service');

const readAllProducts = async (req, res) => {
  const { type, message } = await productService.readAllProducts();
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const readProductsById = async (req, res) => {
  const { type, message } = await productService.readProductsById(req.params.id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { type, message } = await productService.createProduct(req.params.name);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

module.exports = {
    readAllProducts,
    readProductsById,
    createProduct,
};