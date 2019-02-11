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
        const command = `echo "${privateKey}" | ssh -i /dev/stdin ${retropie.username}@${retropie.host} "ls ~/RetroPie/roms"`;
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
