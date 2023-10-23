const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')// there is an index file, no need to specify

// a middleware
const auth = async (req, res, next) => {
  


}


