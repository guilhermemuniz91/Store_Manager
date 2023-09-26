const { expect } = require('chai');
const sinon = require('sinon');
const productModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/products.model.mock');

describe('Testes da camada Model da rota /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se retorna todos os produtos pelo endpoint GET', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const result = await productModel.readAllProducts();
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Verifica se retorna um produto especifico pelo Id pelo endpoint GET', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    const result = await productModel.readProductsById(1);
    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal(allProducts[0]);
  });

  it('Verifica se retorna a adição correta de um novo produto pelo endpoint POST', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 39 }]);
    const result = await productModel.createProduct('Novo Produto');
    expect(result).to.be.deep.equal({ id: 39, name: 'Novo Produto' });
  });

  it('Verifica se deleta com sucesso um produto específico através do productId pelo endpoint DELETE', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);
    const result = await productModel.deleteProduct(1);
    expect(result).to.be.deep.equal(undefined);
  });

  it('Verifica se atualiza com sucesso um produto específico através do productId pelo endpoint PUT', async function () {
    sinon.stub(connection, 'execute').resolves({ id: 1, name: 'produto modificado' });
    const result = await productModel.updateProduct({ name: 'produto modificado', id: 1 });
    expect(result).to.be.deep.equal({ id: 1, name: 'produto modificado' });
  });
});