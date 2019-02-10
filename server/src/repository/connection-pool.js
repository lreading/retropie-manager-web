/**
 * @name connection-pool
 * @description Connection pool for the database layer
 */
const { Pool } = require('pg');

const pool = new Pool();

module.exports = {
    get: () => pool
};
