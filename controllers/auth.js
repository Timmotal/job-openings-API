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
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)
    // // ES6 syntax, name is equal to name
    // const tempUser = { name, email, password:hashedPassword }
    // // THERE WILL BE SOME CASES WHERE WE HAVE TO SETUP CHECKING IN THE CONTROLLERS
    // // const { name, email, password } = req.body
    // // if (!name || !email || !password ) {
    // //     throw new BadRequestError(' will you provide a name eh, PO box electric and hubaloo')
    // // }
    // // since we want mongoose to do all the validation, we simply pass in the body
    // // const user = await User.create({...req.body}) //refactored 
    // // why use a rest operator here -> to collect the arguments and dump them as an array (unsure)
    // const user = await User.create({...tempUser})
    // <<<<<<<<<END OF REFACTOR TO MONGOOSE>>>>>>>>>>>>

    // res.send('Register Aug 24th 1638 hours 2023')
    // res.status(StatusCodes.CREATED).json(req.body) // 201
    
    const user = await User.create({ ...req.body }) //create an object here,
    // console.log('before the beginiing') beginning of the ---> BUG


    // WE TOOK THIS OUT AND FOR WHAT?
    // res
    // .status(StatusCodes.CREATED)
    // // says we can generate the token using the instance method instead
    // .json({ user: { name: user.getName()}, token }) // 201 & i see us  object calling a function (this)
}

