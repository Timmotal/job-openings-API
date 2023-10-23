const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')// there is an index file, no need to specify

// a middleware
const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization

    // says some setups do not have "spaces" and it doesn't really matter (07:54:44)
    // but how do these setups verify the token jumbled together with 'Bearer'
  


}


