const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

const { sales, salesProductsById1, salesProductsResult } = require('./mocks/sales.model.mock');

describe('Testes da camada Model da rota /sales', function () {
  it('Verifica se retorna todas as vendas pelo endpoint GET', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);
    const result = await salesModel.readAllSales();
    expect(result).to.be.deep.equal(sales);
  });

  it('Verifica se retorna uma venda especifica pelo Id pelo endpoint GET', async function () {
    sinon.stub(connection, 'execute').resolves([salesProductsById1]);
    const result = await salesModel.readSalesById(2);
    expect(result).to.be.deep.equal(salesProductsResult);
  });

//   it('Registra uma venda e retorna o ID', async function () {
//     sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
//     const result = await salesModel.insertSale();
//     expect(result).to.be.deep.equal(42);
//   });

//   it('Registra um produto em uma venda', async function () {
//     sinon.stub(connection, 'execute').resolves([{ insertId: 42 }]);
//     const { productId, quantity } = salesProductsResult[0];
//     const result = await salesModel.insertProductsSale(18, { productId, quantity });
//     expect(result).to.be.deep.equal({ id: 18, productId, quantity });
//   });

//   it('Atualiza produtos de uma venda', async function () {
//     sinon.stub(connection, 'execute').resolves();
//     const { productId } = salesProductsResult[0];
//     const result = await salesModel.updateProductsSale(18, { productId, quantity: 90 });
//     expect(result).to.be.deep.equal({ id: 18, productId, quantity: 90 });
//   });

//   it('Deleta a venda e seus produtos', async function () {
//     sinon.stub(connection, 'execute').resolves();
//     const result = await salesModel.deleteSale(18);
//     expect(result).to.be.deep.equal();
//   });

  afterEach(sinon.restore);
});