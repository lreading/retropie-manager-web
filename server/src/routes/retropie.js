/**
 * @name retropie
 * @description Routes for retropie
 */
const router = require('express').Router();

const logger = require('../service/logger.js').get('routes/retropie');
const service = require('../service/retropie.js');
const error = require('./error.js');

/**
 * The resource identifier
 * @type {string}
 */
const resource = 'retropie';

/**
 * @apiDefine RetroPieResponse
 * @apiSuccess {json} retropie
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *      "id": 1234,
 *      "name": "my retropie",
 *      "created_on": "2019-02-11T04:36:27.818Z",
 *      "username": "bob",
 *      "host": "retropie.local"
 *  }
 * 
 */

/**
 * Gets a RetroPie by its id
 * 
 * @api {get} /api/retropie/{id}
 * @apiName Get
 * @apiGroup RetroPie
 * @apiDescription Gets a RetroPie by its id
 * @apiUse RetroPieResponse
 * @apiUse BadRequest
 * @apiParam {number} id
 * @apiSuccess {number} id
 * @apiSuccess {string} name
 * @apiSuccess {date} created_on
 * @apiSuccess {string} username
 * @apiSuccess {string} host
 */
const get = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return error.badRequest('Invalid ID parameter', res);
        }
        const pi = await service.get(req.params.id);
        if (pi === null) {
            return error.notFound(`RetroPie with id ${req.params.id} not found`, res);
        }
        delete pi.private_key;
        res.status(200)
            .json(pi);
    } catch (e) {
        logger.error(`Error getting retropie ${req.params.id}`);
        logger.error(e);
        return error.serverError('Internal server error', res);
    }
};

/**
 * Inserts a new Retropie
 *
 * @api {post} /api/retropie/
 * @apiName Post
 * @apiGroup RetroPie
 * @apiDescription Creates a new RetroPie
 * @apiUse RetroPieResponse
 * @apiUse BadRequest
 * @apiParam {string} name (Body) - What you want to name this RetroPie, eg Bedroom RetroPie
 * @apiParam {string} username (Body) - The username on the pi associated with the SSH key.  Typically "pi"
 * @apiParam {string} host (Body) - The host (can be ip or host, eg 192.168.1.12 or retropie.local)
 * @apiParam {string} ssh_key (Body) - The private key that allows interop between this app and the RetroPie
 * @apiSuccess {number} id
 * @apiSuccess {string} name
 * @apiSuccess {date} created_on
 * @apiSuccess {string} username
 * @apiSuccess {string} host
 */
const post = async (req, res) => {
    try {
        const pi = service.validate(req.body);
        if (pi.error) {
            return error.badRequest(pi.error, res);
        }

        await service.add(pi);
        delete pi.private_key;
        res.status(200).json(pi);
    } catch (e) {
        if (e.message.indexOf('retropie_name_key') !== -1) {
            return error.badRequest('Name must be unique', res);
        }
        logger.error('Error creating new retropie');
        logger.error(e);
        return error.serverError('Internal Server Error', res);
    }
};

/**
 * Gets a list of systems supported by the RetroPie
 *
 * @api {get} /api/retropie/{id}/systems
 * @apiName Get Supported Systems
 * @apiGroup RetroPie
 * @apiDescription Gets a list of systems supported by the RetroPie
 * @apiUse BadRequest
 * @apiParam {string} id The RetroPie's unique id
 * @apiSuccess {Array} systems
 */
const getSystems = async (req, res) => {
    try {
        if (isNaN(req.params.id)) {
            return error.badRequest('Invalid id parameter', res);
        }

        const systems = await service.getSystems(req.params.id);
        res.status(200).json(systems);
    } catch (e) {
        if (e.message.indexOf('RetroPie with id') !== -1) {
            return error.notFound(`RetroPie with id ${req.params.id} not found`, res);
        }
        logger.error(`Error getting systems for pi ${req.params.id}`);
        logger.error(e);
        return error.serverError('Internal Server Error', res);
    }
};

/**
 * Gets the router object
 * @returns {Router}
 */
const getRouter = () => {
    router.get('/:id', get);
    router.get('/:id/systems', getSystems);
    router.post('/', post);

    return router;
};

module.exports = {
    getRouter,
    resource
};
