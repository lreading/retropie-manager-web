/**
 * @name cache
 * @description light-weight caching object
 */
const moment = require('moment');

/**
 * Constructor function for our cache
 */
const Cache = function () {
    this.cache = {};
};

/**
 * Gets an item from the cache
 * @param {string} key
 * @returns {*|null}
 */
const get = function (key) {
    const item = this.cache[key];
    if (!item) {
        return null;
    }

    if (moment().isAfter(item.expires)) {
        this.del(key);
        return null;
    }

    return item.value;
};

/**
 * Adds an item to the cache with the given expiration
 * @param {string} key
 * @param {*} item
 * @param {number} ttlMs
 */
const put = function (key, item, ttlMs) {
    this.cache[key] = {
        value: item,
        added: moment(),
        expires: moment().add(ttlMs, 'millisecond')
    };
};

/**
 * Deletes an item from the cache
 * @param {string} keyS
 */
const del = function (key) {
    delete this.cache[key];
};

Cache.prototype.get = get;
Cache.prototype.put = put;
Cache.prototype.del = del;

module.exports = {
    get: () => new Cache()
};
