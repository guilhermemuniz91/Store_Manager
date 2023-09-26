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

describe('Testes da camada Controller da rota /products', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it('Verifica se retorna status 200 e todos os produtos pelo endpoint GET', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'readAllProducts').resolves({ type: null, message: allProductsController });
      await productsController.readAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsController);
    });
  
    it('Verifica se retorna status 200 e o produto especifico pelo endpoint GET', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'readProductsById').resolves({ type: null, message: productsByIdController });
      await productsController.readProductsById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsByIdController);
    });

    it('Verifica se retorna status 404 e um erro se o productId não existir pelo endpoint GET', async function () {
      const res = {};
      const req = { params: { id: 9999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'readProductsById').resolves({ type: 404, message: 'Product not found' });
      await productsController.readProductsById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Verifica se retorna status 201 e a adição de um novo produto pelo endpoint POST', async function () {
      sinon.stub(productsService, 'createProduct').resolves({ type: null, message: { id: 5, name: 'Novo Produto' } });  
      const req = { body: { name: 'Novo Produto' } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();  
      await productsController.createProduct(req, res);  
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ id: 5, name: 'Novo Produto' });
    });

    it('Verifica se returna status 400 se product.name não existir pelo endpoint POST', async function () {
      const res = {};
      const req = { body: {} };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves({
        type: 400,
        message: '"name" is required',
      });
      await productsController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('Verifica se returna status 422 se product.name tiver menos que 5 caracteres pelo endpoint POST', async function () {
      const res = {};
      const req = {
        body: {
          name: '',
        },
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'createProduct').resolves({
        type: 422,
        message: '"name" length must be at least 5 characters long',
      });
      await productsController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });
});