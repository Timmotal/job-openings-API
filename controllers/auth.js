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
    const token = user.createJWT() // the madness of code astounds me
    // taking this out -> to mongoose
    // below is object property renaming, i mistakenly thought it was destructure re-assignment
    // const token = jwt.sign({ userID: user._id, name: user.name }, 'jwtSecret', {
    //     expiresIn: '30d',
    // }) 
    // this is the case (as always) there is multiple setups that you can have
    // e.g send back only the token, maybe frontend need the name directly 
    // there are setups where frontend decodes the token instead of object property aliasing above
    // res.status(StatusCodes.CREATED).json({ token }) // 201
    // the object renaming got confusing to me, but as i guessed (unsure though)
    // chatgpt said sometimes, it is done to structure the responses\
    // i'm still not cool with it, with time i believe i will
    // console.log('after the beginning') after the  beginning of the --<<<BUG >>>>
    res.status(StatusCodes.CREATED).json({ user: { name: user.name}, token }) // 201

    // WE TOOK THIS OUT AND FOR WHAT?
    // res
    // .status(StatusCodes.CREATED)
    // // says we can generate the token using the instance method instead
    // .json({ user: { name: user.getName()}, token }) // 201 & i see us  object calling a function (this)
}

const login = async (req, res) => {
    const { email, password } = req.body

    //says he finds it easier to check for errors, here rather than chase it in the error handler
    // says it his preference though
    if (!email || !password) {
        throw new BadRequestError('have you no email and passwords eh')
    }
    const user = await User.findOne({email})

}

