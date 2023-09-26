const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

const { sales, salesProductsResult } = require('./mocks/sales.service.mock');

describe('Testes da camada Service da rota /sales', function () {
  it('Verifica se retorna todas as vendas pelo endpoint GET', async function () {
    sinon.stub(salesModel, 'readAllSales').resolves(sales);
    const response = { type: null, message: sales };
    const result = await salesService.readAllSales();
    expect(result).to.be.deep.equal(response);
  });

  it('Verifica se retorna uma venda especifica pelo Id pelo endpoint GET', async function () {
    sinon.stub(salesModel, 'readSalesById').resolves(salesProductsResult);
    const response = { type: null, message: salesProductsResult };
    const result = await salesService.readSalesById(1);
    expect(result).to.be.deep.equal(response);
  });

  afterEach(sinon.restore);
});