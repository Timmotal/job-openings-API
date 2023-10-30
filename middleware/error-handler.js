// const { CustomAPIError } = require('../errors') // we removed this
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // we have this customError one and essentially we are looking for the statusCode property
  // on the err object coming in (just above, in the params)
  // cos remember we are setting up A new one -> customError
  // and the same goes for message

  // because we know we will be manipulating those values
  let customError = {
    // set default -> if there is already something provided -> send back that, if not then the default
    // there will be multiple IFs that will manipulate this value
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    // says if in the error, we already have the statusCodes,
  //  then use that, then we will setup the generic response
    msg:err.message || 'Something went wrong, will you try again later'
  }
  // console.log(err)

  // if (err instanceof CustomAPIError) { //Error Classes
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  
  


}

