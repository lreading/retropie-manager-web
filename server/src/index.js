/**
 * @name index
 * @description entry point for the server app
 */
//const express = require('express');

const logger = require('./service/logger.js');

const preStart = () => {
    logger.init();
};

preStart();