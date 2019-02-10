/**
 * @name cmd
 * @description Abstraction for interop functions
 */
const childProcess = require('child_process');

const logger = require('../service/logger.js').get('service/cmd');

/**
 * Executes a command in bash as a child process.
 * @param {string} cmd
 * @returns {Promise}
 */
const execAsync = async (cmd) => {
    const p = new Promise((resolve, reject) => {
        let output = '';
        logger.debug(`Running command: ${cmd}`);

        const child = childProcess.spawn('bash', ['-c', cmd], {
            stdio: ['ignore', 'pipe', 'ignore']
        });

        child.stdout.on('data', (data) => output += data.toString());
        child.stdout.on('error', reject);
        child.stdout.on('end', resolve);
    });

    await p;
};

module.exports = {
    execAsync
};
