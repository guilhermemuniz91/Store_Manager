const productService = require('../services/products.service');

const validationProduct = async (req, res, next) => {
  const validationId = req.body.some(({ productId }) => !productId);
    if (validationId) {
        return res.status(400).json({ message: '"productId" is required' });
    }
  const productExists = req.body.map(async ({ productId }) => {
    const { type } = await productService.readProductsById(productId);
    return !type;
  });
  const result = await Promise.all(productExists);
     if (result.includes(false)) {
       return res.status(404).json({ message: 'Product not found' });
     }
  next();
};

const validationQuantity = async (req, res, next) => {
  const hasQuantity = req.body.some(({ quantity }) => quantity === undefined);
  if (hasQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  const valQuantity = req.body.some(({ quantity }) => quantity < 1);
  if (valQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = { validationProduct, validationQuantity };