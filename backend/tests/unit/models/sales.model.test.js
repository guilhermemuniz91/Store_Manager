const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');

const { sales, salesProductsById1, salesProductsResult, getByIdMockWithData } = require('./mocks/sales.model.mock');

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

  it('getById with data', async function () {
    sinon.stub(connection, 'execute').resolves([getByIdMockWithData]);

    const result = await salesModel.readSalesById(1);

    expect(result).to.be.an('array');
    expect(result).to.deep.equal(getByIdMockWithData);
  });

  afterEach(sinon.restore);
});