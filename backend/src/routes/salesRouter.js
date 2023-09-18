const express = require('express');
const { salesModel } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const salesData = await salesModel.readAllSales();  
  return res.status(200).json(salesData); 
});
    
router.get('/:id', async (req, res) => {
  const salesDataById = await salesModel.readSalesById(Number(req.params.id));
  if (salesDataById === 0) {
  return res.status(200).json(salesDataById);
} 
  return res.status(404).json({ message: 'Sale not found' });
});

module.exports = router;