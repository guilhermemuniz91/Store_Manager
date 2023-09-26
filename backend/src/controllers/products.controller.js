const productService = require('../services/products.service');

const readAllProducts = async (req, res) => {
  const { type, message } = await productService.readAllProducts();
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const readProductsById = async (req, res) => {
  const { type, message } = await productService.readProductsById(req.params.id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { type, message } = await productService.createProduct(req.body.name);
  if (type) return res.status(400).json({ message });
  return res.status(201).json(message);
};

const deleteProduct = async (req, res) => {
  const { type, message } = await productService.deleteProduct(req.params.id);
  if (type) return res.status(404).json({ message });
  res.status(204).end();
};

const updateProduct = async (req, res) => {
  const { type, message } = await productService.updateProduct(req.params.id, req.body.name);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

module.exports = {
    readAllProducts,
    readProductsById,
    createProduct,
    deleteProduct,
    updateProduct,
};