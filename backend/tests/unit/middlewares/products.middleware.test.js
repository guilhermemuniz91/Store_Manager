const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');
const validateNewProduct = require('../../../src/middlewares/validateNewProduct');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

describe('Testes de Middleware da rota /products', function () {
  afterEach(sinon.restore);
  it('Verifica se a função validateNewProduct retorna status 400 e uma mensagem de erro caso o campo "name" esteja vazio', async function () {
    const req = { 
        body: [
      {
        quantity: 1,
      },
    ] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateNewProduct.validateNewProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWithExactly({ message: '"name" is required' });
    expect(next).to.not.have.been.calledWith();
  });

  it('Verifica se a função validateNewProduct chama a função Next', async function () {
    const req = { body: { name: 'ProdutoX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateNewProduct.validateNewProduct(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  it('Verifica se a função validateNewProduct retorna status 422 e uma mensagem de erro caso o campo "name" tenha menos de 5 caracteres', async function () {
    const req = { body: { name: 'four' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    validateNewProduct.validateNewProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWithExactly({ message: '"name" length must be at least 5 characters long' });
    expect(next).to.not.have.been.calledWith();
  });
});