const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const {
    allProductsController,
    productsByIdController,
} = require('./mocks/products.controller.mock');

describe('Testes do endpoint GET na camada controller da rota /products', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it('Verifica se retorna status 200 e todos os produtos', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'readAllProducts').resolves({ type: null, message: allProductsController });
      await productsController.readAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsController);
    });
  
    it('Verifica se retorna status 200 e o produto especifico', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'readProductsById').resolves({ type: null, message: productsByIdController });
      await productsController.readProductsById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsByIdController);
    });
});