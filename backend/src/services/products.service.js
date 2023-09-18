const productModel = require('../models/products.model');

const readAllProducts = async () => {
  const result = await productModel.readAllProducts();
  return { type: null, message: result };
};

const readProductsById = async (id) => {
  const result = await productModel.readProductsById(id);
  if (!result) return { type: 404, message: 'Product not found' };

  return { type: null, message: result };
};

const createProduct = async ({ name }) => {
  const result = await productModel.createProduct(name);
  return { type: null, message: result };
};

module.exports = {
    readAllProducts,
    readProductsById,
    createProduct,
};