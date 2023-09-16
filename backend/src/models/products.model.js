const camelize = require('camelize');
const connection = require('./connection');

const listAllProducts = async () => {
  const [products] = await connection.execute(
      'SELECT * FROM StoreManager.products',
    );
  return camelize(products); 
};

const listProductsById = async (productId) => {
  const [[products]] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [productId],
    );
  return camelize(products); 
};

module.exports = {
  listAllProducts,
  listProductsById,
};