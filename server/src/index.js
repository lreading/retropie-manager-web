/**
 * @name index
 * @description entry point for the server app
 */
const express = require('express');
const path = require('path');

const logLib = require('./service/logger.js');
const api = require('./routes/api.js');

/**
 * Commands to execute prior to starting the server
 */
const preStart = () => {
    logLib.init();
};

/**
 * Starts the server
 */
const start = () => {
    preStart();
    const logger = logLib.get('index.js');

    const app = express();
    app.use(express.json());

    app.use('/docs', express.static(path.join(__dirname, `..${path.sep}`, 'doc')));
    app.use(api.addRoutes());

    app.get('/', (req, res) => {
        res.json({ status: 200, message: 'hey there' });
    });

    app.listen(process.env.PORT, () => {
        logger.info(`Server started on http://localhost:${process.env.PORT}`);
    });
};

start();
