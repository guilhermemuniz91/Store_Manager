const camelize = require('camelize');
const connection = require('./connection');

const readAllSales = async () => {
  const [allSales] = await connection.execute(
    `SELECT
        table2.sale_id, 
        table1.date,
        table2.product_id,
        table2.quantity
    FROM StoreManager.sales AS table1
    INNER JOIN StoreManager.sales_products AS table2
    ON table1.id = table2.sale_id`,
    );
  return camelize(allSales); 
};

const readSalesById = async (saleId) => {
  const [salesById] = await connection.execute(
    `SELECT
        table1.date,
        table2.product_id,
        table2.quantity
    FROM StoreManager.sales AS table1
    INNER JOIN StoreManager.sales_products AS table2
    ON table1.id = table2.sale_id
    WHERE id = ?
    ORDER BY id, product_id`,
    [saleId],
    );
  return camelize(salesById); 
};

const createSales = async (arraySales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ();',
  );
  const promise = arraySales.map(async ({ productId, quantity }) => {
     await connection.execute(
       'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
       [insertId, productId, quantity],
     );
  });
  await Promise.all(promise);
  return insertId;
};

module.exports = {
  readAllSales,
  readSalesById,
  createSales,
};