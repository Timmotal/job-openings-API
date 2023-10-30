// const { CustomAPIError } = require('../errors') // we removed this
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // we have this customError one and essentially we are looking for the statusCode property
  // on the err object coming in (just above, in the params)
  // cos remember we are setting up A new one -> customError
  // and the same goes for message

  // because we know we will be manipulating those values
 
  


}

