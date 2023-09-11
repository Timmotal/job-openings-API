const User =  require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
// const bcrypt = require('bcryptjs') refactored out to mongoose error (User.js)
// const jwt = require('jsonwebtoken') // refactored to mongoose


const register = async (req, res) => {

    // <<<<<<<<< START OF REFACTOR TO MONGOOSE>>>>>>>
    // CREATE TEMPORARY OBJECT ---->>>>>>>>>>
    // const { name, email, password } = req.body
    // // salt essentially means random bytes, the higher the number, more processing power required and security
    // con

    // res
    // .status(StatusCodes.CREATED)
    // // says we can generate the token using the instance method instead
    // .json({ user: { name: user.getName()}, token }) // 201 & i see us  object calling a function (this)
}

