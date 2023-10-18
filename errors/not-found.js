const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class NotFoundError extends CustomAPIError {

}
