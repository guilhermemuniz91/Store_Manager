const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/products.model.mock');

describe('Testes do endpoint GET', function () {
    afterEach(function () {
      sinon.restore();
    });
    it('Verifica se retorna todos os produtos na rota /products', async function () {
      sinon.stub(connection, 'execute').resolves([allProducts]);
      const result = await productsModel.listAllProducts();
      expect(result).to.be.deep.equal(allProducts);
    });
  
    it('Verifica se retorna um produto especifico pelo Id na rota /products/:id', async function () {
      sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
      const result = await productsModel.listProductsById(1);
      expect(result).to.be.deep.equal(allProducts[0]);
    });
  });