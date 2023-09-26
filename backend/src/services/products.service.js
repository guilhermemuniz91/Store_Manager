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

const createProduct = async (name) => {
  const result = await productModel.createProduct(name);
  return { type: null, message: result };
};

// const deleteProduct = async (idString) => {
//   const id = Number(idString);
//   const { type } = await readProductsById(id);

//   if (type) return { type: 404, message: 'Product not found' };
//   const result = await productModel.deleteProduct(id);
//   return { type: null, message: result };
// };

const deleteProduct = async (id) => {
  const result = await productModel.readProductsById(id);
  if (result === undefined) return { type: 404, message: 'Product not found' };
  await productModel.deleteProduct(id);
  return { type: null, message: [] };
};

const updateProduct = async (idString, name) => {
  const id = Number(idString);
  const { type } = await readProductsById(id);

  if (type) return { type: 404, message: 'Product not found' };
  const result = await productModel.updateProduct({ id, name });
  return { type: null, message: result };
};

// const updateProduct = async (name, id) => {
//   const getProduct = await productModel.readProductsById(name);
//   if (getProduct === undefined) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
//   const updatedProduct = await productModel.updateProduct({ name, id });
//   return { type: null, message: updatedProduct };
// };

module.exports = {
    readAllProducts,
    readProductsById,
    createProduct,
    deleteProduct,
    updateProduct,
};