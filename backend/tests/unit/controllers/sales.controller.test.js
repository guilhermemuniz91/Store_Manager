const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');

const { sales } = require('./mocks/sales.controller.mock');

describe('Testes da camada Controller da rota /sales', function () {
    it('Verifica se retorna todas as vendas pelo endpoint GET', async function () {
      sinon.stub(salesService, 'readAllSales').resolves({ type: null, message: sales });
  
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await salesController.readAllSales(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });
  
    it('Verifica se retorna uma venda especifica pelo Id pelo endpoint GET', async function () {
      sinon.stub(salesService, 'readSalesById').resolves({ type: 404, message: 'Sale not found' });
  
      const req = { params: 99 };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      await salesController.readSalesById(req, res);
  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
});