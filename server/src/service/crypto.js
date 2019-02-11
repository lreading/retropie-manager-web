/**
 * @name crypto
 * @description Abstraction layer for crypto functions
 * @see http://vancelucas.com/blog/stronger-encryption-and-decryption-in-node-js/
 */
const crypto = require('crypto');
const logger = require('./logger.js').get('service/crypto');

const encoding = 'hex';
const algo = 'aes-256-cbc';
const ivLength = 16;

/**
 * Encrypts text using AES-256
 * @param {string} secret
 * @returns {Promise}
 */
const encrypt = async (secret) => {
    const p = new Promise((resolve, reject) => {
        try {
            const iv = crypto.randomBytes(ivLength);
            const cipher = crypto.createCipheriv(algo, Buffer.from(process.env.CRYPTO_KEY), iv);
            let encrypted = cipher.update(secret);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            resolve(`${iv.toString(encoding)}:${encrypted.toString(encoding)}`);
        } catch (e) {
            logger.error('Error encrypting secret.');
            logger.error(e);
            reject(e);
        }
    });
    return await p;
};

/**
 * Decrypts text
 * @param {string} hash
 * @returns {Promise}
 */
const decrypt = async (hash) => {
    const p = new Promise((resolve, reject) => {
        try {
            const parts = hash.split(':');
            const iv = Buffer.from(parts.shift(), encoding);
            const encryptedText = Buffer.from(parts.join(':'), encoding);
            const decipher = crypto.createDecipheriv(algo, Buffer.from(process.env.CRYPTO_KEY), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            resolve(decrypted.toString());
        } catch (e) {
            logger.error('Error decrypting secret');
            logger.error(e);
            reject(e);
        }
    });
    return await p;
};

module.exports = {
    encrypt,
    decrypt
};
