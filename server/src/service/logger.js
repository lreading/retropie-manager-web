/**
 * @name logger
 * @description Logging abstraction
 */
const winston = require('winston');
const path = require('path');

/**
 * Gets a message to use in the log
 * @param {string} message
 */
const getMessage = function (message) {
    return `${new Date().toUTCString()} [${this.namespace}]: ${message}`;
};

/**
 * Writes to the log. 
 * The message should not already be formatted
 * @param {string} message
 * @param {silly|debug|info|warn|error} logLevel
 */
const writeToLog = function (message, logLevel) {
    if (typeof message !== 'string') {
        winston[logLevel](this.getMessage('Object:'));
        return winston[logLevel](message);
    }
    return winston[logLevel](this.getMessage(message));
};

/**
 * Writes a silly message
 * @param {string|object} message
 */
const silly = function (message) {
    this.writeToLog(message, 'silly');
};

/**
 * Logs a debug message
 * @param {string|object} message
 */
const debug = function (message) {
    this.writeToLog(message, 'debug');
};

/**
 * Logs an info message
 * @param {string|object} message
 */
const info = function (message) {
    this.writeToLog(message, 'info');
};

/**
 * Logs a warn message
 * @param {string|object} message
 */
const warn = function (message) {
    this.writeToLog(message, 'warn');
};

/**
 * Logs an error message
 * @param {string|object} message
 */
const error = function (message) {
    this.writeToLog(message, 'error');
};

/**
 * General purpose logger abstraction
 * @param {string} namespace 
 */
const Logger = function (namespace) {
    this.namespace = namespace || '{unknown}';
};

Logger.prototype.writeToLog = writeToLog;
Logger.prototype.getMessage = getMessage;
Logger.prototype.silly = silly;
Logger.prototype.debug = debug;
Logger.prototype.info = info;
Logger.prototype.warn = warn;
Logger.prototype.error = error;

/**
 * Initializes the logging functionality
 */
const init = () => {
    const upDir = `..${path.sep}`;

    const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'debug';

    winston.level = logLevel;
    winston.add(winston.transports.File, { filename: path.join(__dirname, upDir, upDir, 'retropie-manager-web-server.log'), maxzie: 2097152 });
    winston.addColors({
        debug: 'blue',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    });
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, {
        level: logLevel,
        prettyPrint: true,
        colorize: true,
        silent: false,
        timestamp: true
    });
};

module.exports = {
    get: (namespace) => new Logger(namespace),
    init
};
