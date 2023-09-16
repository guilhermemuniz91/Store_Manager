const express = require('express');

const app = express();
app.use(express.json());

const { productModel } = require('./models');
// const productsRouter = require('./routes/productsRouter');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

// app.use('/products', productsRouter);

app.get('/products', async (req, res) => {
  const productsData = await productModel.listAllProducts();  
  return res.status(200).json(productsData); 
});
    
app.get('/products/:id', async (req, res) => {
  const productsDataById = await productModel.listProductsById(req.params.id);
  if (productsDataById) {
  return res.status(200).json(productsDataById);
} 
  return res.status(404).json({ message: 'Product not found' });
});

module.exports = app;
