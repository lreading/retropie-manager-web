/**
 * @name error
 * @description Handles error messages from the API 
 */

/**
 * Sends an error to the client
 * @param {string} error
 * @param {number} code
 * @param {string} message
 * @param {*} res 
 */
const sendError = (error, code, message, res) => {
    return res.status(code)
        .json({
            status: code,
            message,
            details: error
        });
};

/**
 * Returns a 400 Bad Request error
 * @param {*} error
 * @param {*} res
 * 
 * 
 * @apiDefine BadRequest
 * @apiError BadRequest
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *      "status": 400,
 *      "message": "Bad Request",
 *      "details": "startDate is a required field"
 *  }
 */
const badRequest = (error, res) => sendError(error, 400, 'Bad Request', res);

/**
 * Returns a 404 error
 * @param {string} error
 * @param {*} res
 * 
 * 
 * @apiDefine NotFound
 * @apiError Resourcenotfound
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 40$ Not Found
 *  {
 *      "status": 404,
 *      "message": "Not Found"
 *  }
 */
const notFound = (error, res) => sendError(error, 404, 'Not Found', res);

/**
 * Returns a 500 error
 * @param {*} error
 * @param {*} res
 */
const serverError = (error, res) => sendError(error, 500, 'Internal Server Error', res);

module.exports = {
    notFound,
    badRequest,
    serverError
};
