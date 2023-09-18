const express = require('express');

const app = express();
app.use(express.json());

const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

module.exports = app;
