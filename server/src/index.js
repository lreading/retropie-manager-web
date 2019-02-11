/**
 * @name index
 * @description entry point for the server app
 */
//const express = require('express');

const logger = require('./service/logger.js');

const retropieRepo = require('./repository/retropie.js');

const preStart = () => {
    logger.init();
};

preStart();

retropieRepo.get().getAll()
    .then(console.log)
    .catch(console.error);
