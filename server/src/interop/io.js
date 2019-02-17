/**
 * @name io
 * @description I/O interop for the retropie
 */
const cmd = require('./cmd.js');
const logger = require('../service/logger.js').get('interop/io');
const crypto = require('../service/crypto.js');

/**
 * Gets a list of systems that this RetroPie supports
 * @param {RetroPie}
 * @returns {Array}
 */
const getSystemList = async (retropie) => {
    try {
        const privateKey = await crypto.decrypt(retropie.private_key);
        let command = `PRIVATEKEY="${privateKey}"; `;
        command += `USERNAME="${retropie.username}"; `;
        command += `HOST="${retropie.host}"; `;
        command += `echo "$PRIVATEKEY" | ssh -i /dev/stdin "$USERNAME"@"$HOST" "ls ~/RetroPie/roms"`;
        const resText = await cmd.execAsync(command);
        const folders = resText.split('\n');
        return folders.filter(x => x) || [];
    } catch (e) {
        logger.error(`Error getting system list from retropie ${retropie.id}`);
        return [];
    }
};

module.exports = {
    getSystemList
};
