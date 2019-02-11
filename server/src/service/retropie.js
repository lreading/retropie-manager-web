/**
 * @name retropie
 * @description Service abstraction for the retropie entity
 */
const moment = require('moment');

const crypto = require('./crypto.js');
const logger = require('./logger.js').get('service/retropie');
const cacheFactory = require('./cache.js');
const repo = require('../repository/retropie.js');
const io = require('../interop/io.js');

/**
 * The allowed properties of a retropie entity
 * @type {Array}
 */
const allowedProps = [
    {
        name: 'name',
        maxLength: 50
    },
    {
        name: 'private_key'
    },
    {
        name: 'username',
        maxLength: 50
    },
    {
        name: 'host',
        maxLength: 50
    }];

/**
 * A cache for use with our repository
 * @type {Cache}
 */
const repoCache = cacheFactory.get();

/**
 * A cache for use with the supported systems
 * @type {Cache}
 */
const systemsCache = cacheFactory.get();

/**
 * The default TTL to use for caching
 * @type {number}
 */
const TTL = 10 * 60 * 1000;

/**
 * Gets a retropie by its id
 * @param {number} id
 * @returns {object|null}
 */
const get = async (id) => {
    const cached = repoCache.get(id);
    if (cached !== null) {
        return cached;
    }
    const record = await repo.get(id);
    if (record) {
        repoCache.put(id, record, TTL);
    }
    return record;
};

/**
 * Validates an incoming entity and only allows the allowed params
 * @param {object} body
 * @returns {object}
 */
const validate = (body) => {
    const pi = {};
    allowedProps.forEach((prop) => {
        if (!body[prop.name]) {
            pi.error = `Missing parameter: ${prop.name}`;
            return pi;
        }

        if (prop.maxLength && body[prop.name].length > prop.maxLength) {
            pi.error = `${prop.name} has a maximum length of ${prop.maxLength}`;
            return pi;
        }

        pi[prop.name] = body[prop.name];
    });

    return pi;
};

/**
 * Adds a new RetroPie
 * @param {object} body
 */
const add = async (body) => {
    body.created_on = moment();
    body.private_key = await crypto.encrypt(body.private_key);

    console.log('Length of key: ', body.private_key.length);

    const pi = await repo.add(body);
    repoCache.put(pi.id, pi, TTL);
    logger.debug(`Added new RetroPi ${pi.id}`);
};

/**
 * Gets the supported systems for the pi
 * @param {number} id
 * @returns {Array}
 */
const getSystems = async (id) => {
    const cached = systemsCache.get(id);
    if (cached) {
        return cached;
    }
    const pi = await get(id);

    if (pi === null) {
        throw new Error(`RetroPie with id ${id} not found`);
    }
    const systems = await io.getSystemList(pi);
    if (systems) {
        systemsCache.put(id, systems, TTL);
    }
    return systems;
};

module.exports = {
    add,
    get,
    getSystems,
    validate
};
