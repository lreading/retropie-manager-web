/**
 * @name api
 * @description Exposes the API endpoints
 */
const router = require('express').Router();

const retropie = require('./retropie.js');

const addRoutes = () => {
    router.use(`/api/${retropie.resource}`, retropie.getRouter());
    return router;
};

module.exports = {
    addRoutes
};
