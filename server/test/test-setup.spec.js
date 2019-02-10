const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

before(() => {
    chai.use(sinonChai);
});

beforeEach(function beforeEachSetup() {
    this.sandbox = sinon.createSandbox();
});

afterEach(function afterEachSetup() {
    this.sandbox.restore();
});
