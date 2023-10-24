const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')// there is an index file, no need to specify

// a middleware
const auth = async (req, res, next) => {
    // check header
    const authHeader = req.headers.authorization

    // says some setups do not have "spaces" and it doesn't really matter (07:54:44)
    // but how do these setups verify the token jumbled together with 'Bearer'
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
         
        //  <<<<-----a SYNTAX YOU MIGHT come ACROSS--(08:06:00)----->>>>>>>>
        // where instead of creating a object -> they look for the user in the database
        // so they take a model and findByID or  findOne and pass in the ID coming from the token
        // in most cases they would use select to remove the password
        // no point to pass the password to the upcoming middleware
        // they then set (req.user) equal to the "user"
        // says HE DIDNT go with this because -> 
        // we really have no functionality to remove the user anyways
        // so if he gets the ID from the token -> he is really sure there is a user on the other-side
        // const user = User.findById(payload.id).select('-password')
        // req.user = user
    }
}


