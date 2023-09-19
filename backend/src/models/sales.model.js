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

// const createSale = async () => {
//   const [{ insertId }] = await connection.execute(
//     'INSERT INTO StoreManager.sales () VALUE ()',
//   );
//   return { insertId };
// };

// const createSaleProducts = async (id, { productId, quantity }) => {
//   await connection.execute(
//     'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
//     [id, productId, quantity],
//   );
//   const objReturn = { id, productId, quantity };
//   return objReturn;
// };

const createSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const createSaleProducts = async ({ id, sales }) => {
  const queries = [];
  sales.forEach(({ productId, quantity }) => {
    queries.push(
      connection.execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [id, productId, quantity],
      ),
    );
  });  
  await Promise.all(queries);
  return { id, itemsSold: sales };
};

module.exports = {
  readAllSales,
  readSalesById,
  createSale,
  createSaleProducts,
};