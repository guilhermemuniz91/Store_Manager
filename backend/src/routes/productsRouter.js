// const express = require('express');
// const { productModel } = require('../models');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const productsData = await productModel.listAllProducts();  
//   return res.status(200).json(productsData); 
// });
    
// router.get('/:id', async (req, res) => {
//   const productsDataById = await productModel.listProductsById(req.params.id);
//   if (productsDataById) {
//   return res.status(200).json(productsDataById);
// } 
//   return res.status(404).json({ message: 'Product not found' });
// });

// module.exports = router;