const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/models/connection');
const { allProducts } = require('./mocks/products.model.mock');

describe('Testes da camada Model da rota /products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se retorna todos os produtos pelo endpoint GET', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const result = await productsModel.readAllProducts();
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Verifica se retorna um produto especifico pelo Id pelo endpoint GET', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    const result = await productsModel.readProductsById(1);
    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal(allProducts[0]);
  });

  it('Verifica se retorna a adição correta de um novo produto pelo endpoint POST', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 39 }]);
    const result = await productsModel.createProduct('Novo Produto');
    expect(result).to.be.deep.equal({ id: 39, name: 'Novo Produto' });
  });

  it('Verifica se deleta com sucesso um produto específico através do productId pelo endpoint DELETE', async function () {
    sinon.stub(connection, 'execute').resolves([{ deletedRow: 1 }]);
    const result = await productsModel.deleteProduct(1);
    expect(result).to.be.deep.equal(1);
  });
});