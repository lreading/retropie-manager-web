const expect = require('chai').expect;
const winston = require('winston');

const logLib = require('../../src/service/logger.js');

describe('logger', function () {

    beforeEach(function () {
        this.logger = logLib.get('test');
        this.winston = {
            silly: this.sandbox.stub(winston, 'silly'),
            debug: this.sandbox.stub(winston, 'debug'),
            info: this.sandbox.stub(winston, 'info'),
            warn: this.sandbox.stub(winston, 'warn'),
            error: this.sandbox.stub(winston, 'error')
        };
        this.assertLogging = function (logLevel) {
            expect(this.winston[logLevel]).to.have.been.called;
        };
    });

    it('has a namespace', function () {
        expect(this.logger.namespace).to.eq('test');
    });

    it('writes silly string messages', function () {
        this.logger.silly('Test');
        this.assertLogging('silly');
    });

    it('writes silly object messages', function () {
        this.logger.silly({ type: 'test', deets: 'something' });
        this.assertLogging('silly');
    });

    it('writes debug string messages', function () {
        this.logger.debug('Test');
        this.assertLogging('debug');
    });

    it('writes debug object messages', function () {
        this.logger.debug({ type: 'test', deets: 'something' });
        this.assertLogging('debug');
    });

    it('writes info string messages', function () {
        this.logger.info('Test');
        this.assertLogging('info');
    });

    it('writes info object messages', function () {
        this.logger.info({ type: 'test', deets: 'something' });
        this.assertLogging('info');
    });

    it('writes warn string messages', function () {
        this.logger.warn('Test');
        this.assertLogging('warn');
    });

    it('writes warn object messages', function () {
        this.logger.warn({ type: 'test', deets: 'something' });
        this.assertLogging('warn');
    });

    it('writes error string messages', function () {
        this.logger.error('Test');
        this.assertLogging('error');
    });

    it('writes error object messages', function () {
        this.logger.error({ type: 'test', deets: 'something' });
        this.assertLogging('error');
    });
});
