const expect = require('chai').expect;

const crypto = require('../../src/service/crypto.js');

describe('crypto', () => {
    beforeEach(() => {
        process.env.CRYPTO_KEY = 'thisisjustatestthisisjustatestth';
    });

    it('encrypts text', async () => {
        const text = 'This is my text.';
        const encrypted = await crypto.encrypt(text);
        expect(encrypted).not.to.eql(text);
    });

    it('decrypts text that was encrypted', async () => {
        const text = 'This is my OTHER text.';
        const encrypted = await crypto.encrypt(text);
        const decrypted = await crypto.decrypt(encrypted);
        expect(decrypted).to.eql(text);
    });
});