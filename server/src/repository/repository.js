/**
 * @name repository
 * @description Base repository implementation
 */
const pool = require('./connection-pool.js');

/**
 * Constructor function for our Repository object
 * @param {string} table
 * @returns {object}
 */
const Repository = function (table) {
    this.table = table;
};

/**
 * Gets a record by its id
 * @param {number} id
 * @returns {object | null}
 */
const get = async function (id) {
    const results = await pool.get().query('SELECT * FROM $1 WHERE Id = $2', [this.table, id]);
    if (results && results.rows && results.rows.length) {
        return results.rows[0];
    }
    return null;
};

/**
 * Gets all records for the table
 * @returns {Array}
 */
const getAll = async function () {
    const results = await pool.get().query('SELECT * FROM $1', [this.table]);
    return results && results.rows ? results.rows : [];
};

/**
 * Adds a record to the database
 * @param {object} record
 * @returns {object}
 */
const add = async function (record) {
    const params = [];
    if (record.id) {
        delete record.id;
    }
    Object.keys(record).forEach((key, idx) => params.push({
        param: `$${idx + 2}`,
        key
    }));
    const sql = `INSERT INTO $1(${params.map(p => p.key).join(', ')}) ` +
        `VALUES(${params.map(p => p.param).join(', ')}) RETURNING id`;
    const result = await pool.get().query(sql, [this.table].concat(Object.values(record)));
    // TODO: test to see how this works.
    // console.log(result);
    if (result && result.rows) {
        record.id = result.rows[0].id;
    }
    return record;
};

/**
 * Updates an existing record
 * @param {object} record
 */
const update = async function (record) {
    if (!record.id) {
        throw new Error('Record requires an ID.');
    }

    const params = Object.keys(record)
        .filter((p) => p.toLowerCase() !== 'id')
        .map((key, idx) => ({
            param: `$${idx + 3}`,
            key,
            value: record[key]
        }));

    const valArr = params
        .filter((p) => p.key.toLowerCase() !== 'id')
        .map((p) => `${p.key}=${p.param}`);

    const sql = `UPDATE $1 SET ${valArr.join(', ')} WHERE ID = $2`;

    await pool.get().query(sql,
        [this.table, record.id].concat(params.map((p) => p.value)));
};

/**
 * Deletes a record from the database
 * @param {number} id
 */
const del = async function (id) {
    await pool.get().query('DELETE FROM $1 WHERE ID = $2', [this.table, id]);
};

Repository.prototype.get = get;
Repository.prototype.getAll = getAll;
Repository.prototype.add = add;
Repository.prototype.update = update;
Repository.prototype.del = del;

module.exports = {
    new: (table) => new Repository(table)
};
