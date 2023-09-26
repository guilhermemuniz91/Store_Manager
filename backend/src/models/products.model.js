const camelize = require('camelize');
const connection = require('./connection');

const readAllProducts = async () => {
  const [products] = await connection.execute(
      'SELECT * FROM StoreManager.products',
    );
  return camelize(products); 
};

const readProductsById = async (productId) => {
  const [[products]] = await connection.execute(
      'SELECT * FROM StoreManager.products WHERE id = ?',
      [productId],
    );
  return camelize(products); 
};

const createProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );
  return { id: insertId, name };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
};

const updateProduct = async ({ name, id }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
};

module.exports = {
  readAllProducts,
  readProductsById,
  createProduct,
  deleteProduct,
  updateProduct,
};