const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { allProducts } = require('./mocks/products.service.mock');

describe('Testes do endpoint GET na camada service da rota /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se é possível retornar todos os produtos', async function () {
    sinon.stub(productsModel, 'readAllProducts').resolves(allProducts);
    const result = await productsService.readAllProducts();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });
  it('Verifica se é possível retornar um produto especifico se ele existir', async function () {
    sinon.stub(productsModel, 'readProductsById').resolves(allProducts[0]);
    const result = await productsService.readProductsById(1);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allProducts[0]);
  });
});