const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')// there is an index file, no need to specify

// a middleware
const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication invalid unfortunately')
    }
// we split this into an  array and then we want the second items
    const token = authHeader.split(' ')[1]

    try {
        // we are getting the payload that we are setting up in the route (auth) but how so?
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // attach the user to the job routes
        req.user = { userId: payload.userId, name: payload.name} // we create an object here
        // we need to invoke the next () otherwise we wont get to the job route
        next()
         
       
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid unfortunately')
    }
}

module.exports = auth

