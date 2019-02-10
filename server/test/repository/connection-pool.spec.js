const expect = require('chai').expect;

const pool = require('../../src/repository/connection-pool.js');

describe('connection-pool', () => {
    it('returns an object', () => {
        expect(typeof pool.get()).to.eql('object');
    });
});
