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

  if (err.name === 'ValidationError') {
    console.log(Object.values(err.errors))// incase you are confused -> I am a bit confused
    // join all the object values back with a comma
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400  
  }

  if (err.code && err.code === 11000 ) {
    // if the error.code is 11000 we know then we can access keyValue prop
    // we are overriding the message -> feel this method Object.keys
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)}
    field, choose another value`
    customError.statusCode = 400 // we also wanna change this
  }

  if (err.name === 'CastError') {
    customError.msg = `We do not have such ID of : ${err.value}`
    customError.statusCode = 404
  }
  // we will do more work with the Error Handler
  //  he wants to show us how to check for multiple mongoose errors
  // instead of sending back this 500 one -> with one error message
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }) // we will use this in other videos
  // we are now doing that mongoose error sh*t -> (08:52:00)
  return res.status(customError.statusCode).json({ msg: customError.msg}) // now back to this again
}

module.exports = errorHandlerMiddleware



