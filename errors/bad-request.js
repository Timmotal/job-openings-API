const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class BadRequestError extends CustomAPIError {
  }
}

