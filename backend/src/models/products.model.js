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
  const [{ rowDeleted }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return rowDeleted;
};

const updateProduct = async (id, name) => {
  const [results] = await connection.execute('SELECT * FROM products', []);
  const toUpdate = results.findIndex((result) => (result.id === id));
  results.splice(toUpdate, 1, { id, name });
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return results[toUpdate];
};

module.exports = {
  readAllProducts,
  readProductsById,
  createProduct,
  deleteProduct,
  updateProduct,
};