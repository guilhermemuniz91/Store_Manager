const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { allProducts, newProduct } = require('./mocks/products.service.mock');

describe('Testes da camada Service da rota /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se é possível retornar todos os produtos pelo endpoint GET', async function () {
    sinon.stub(productsModel, 'readAllProducts').resolves(allProducts);
    const result = await productsService.readAllProducts();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });

  it('Verifica se é possível retornar um produto especifico se ele existir pelo endpoint GET', async function () {
    sinon.stub(productsModel, 'readProductsById').resolves(allProducts[0]);
    const result = await productsService.readProductsById(1);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allProducts[0]);
  });

  it('Verifica se retorna um erro se o productId não existir pelo endpoint GET', async function () {
    sinon.stub(productsModel, 'readProductsById').resolves(undefined);
    const result = await productsService.readProductsById(999);
    expect(result.type).to.equal(404);
    expect(result.message).to.equal('Product not found');
  });

  it('Verifica se retorna a inclusão correta de um novo produto pelo endpoint POST', async function () {
    sinon.stub(productsModel, 'createProduct').resolves(newProduct);
    const response = { type: null, message: newProduct };
    const result = await productsService.createProduct('Varinha do Harry Potter');
    expect(result).to.be.deep.equal(response);
  });

  it('Verifica se deleta com sucesso um produto específico através do productId pelo endpoint DELETE', async function () {
    sinon.stub(productsModel, 'readProductsById').resolves(true);
    sinon.stub(productsModel, 'deleteProduct').resolves();
    const response = { type: null, message: undefined };
    const result = await productsService.deleteProduct(1);
    expect(result).to.be.deep.equal(response);
  });

  it('Verifica se retorna um erro ao tentar deletar um produto específico através de um productId inválido pelo endpoint DELETE', async function () {
    sinon.stub(productsModel, 'readProductsById').resolves(false);
    const response = { type: 404, message: 'Product not found' };
    const result = await productsService.deleteProduct(999);
    expect(result).to.be.deep.equal(response);
  });
});