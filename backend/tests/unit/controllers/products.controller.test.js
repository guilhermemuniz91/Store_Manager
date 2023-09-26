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
      const req = { params: { id: 999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'readProductsById').resolves({ type: 404, message: 'Produto não encontrado' });
      await productsController.readProductsById(req, res);
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Produto não encontrado' });
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

    it('Verifica se returna status 400 caso product.name não existir pelo endpoint POST', async function () {
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

    it('Verifica se returna status 422 caso product.name tiver menos que 5 caracteres pelo endpoint POST', async function () {
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

    it('Verifica se deleta com sucesso um produto específico através do productId pelo endpoint DELETE', async function () {
      sinon.stub(productsService, 'deleteProduct').resolves({ type: null, message: undefined });
  
      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();
  
      await productsController.deleteProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(204);
      expect(res.end).to.have.been.calledWith();
    });
  
    it('Verifica se retorna um erro ao tentar deletar um produto específico através de um productId inválido pelo endpoint DELETE', async function () {
      sinon.stub(productsService, 'deleteProduct').resolves({ type: 404, message: 'Product not found' });
  
      const req = { params: { id: 999 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await productsController.deleteProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Verifica se atualiza com sucesso um produto específico através do productId pelo endpoint PUT', async function () {
      sinon.stub(productsService, 'updateProduct').resolves({ type: null, message: { id: 1, name: 'Produto Atualizado' } });
  
      const req = { params: { id: 1 }, body: { name: 'Produto Atualizado' } };
  
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await productsController.updateProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ id: 1, name: 'Produto Atualizado' });
    });
  
    it('Verifica se retorna um erro ao tentar atualizar um produto específico através de um productId inválido pelo endpoint PUT', async function () {
      sinon.stub(productsService, 'updateProduct').resolves({ type: 404, message: 'Product not found' });
  
      const req = { params: { id: 18451495 }, body: { name: 'Produto Atualizado' } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await productsController.updateProduct(req, res);
  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
});