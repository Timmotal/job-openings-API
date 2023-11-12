const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,       
        required: [true, 'you dont have a name eh?'],
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'vamos if you no get email'],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'non valid email are excused',
        ],
        unique: true,//  creates unique index
        // technically not a validator, becomes important when we run validate method manually
        // or when writing automated tests
        // for example when trying to save a user and the email provided is already in use
        // then user gets the duplicate error message
        
    },
    password: {
        type: String,
        required: [true, 'okay have you heard about passwords?'],
        minLength: 3,
        // maxLength: 50, // removed because of hashedPasswords
    },

})

// he suggests using the good old function keyword value →
//  that way → this  → will be scoped to our document

// UserSchema.pre('save', async function(next){ // removed next, we used async-await
    UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)  // this will point to the document (UserSchema)
    // next() // pass it on to the next middleware, removed it Async-Await will take care of it
})

// says we can generate the token using the instance method instead
// we are trying to keep all our logic in one place
// function can be async, but we want "this" to reference this document so we use keyword (function)
// UserSchema.methods.getName = function () {
    // <<<<<<<CAAN ONE BE A BACKEND WITHOUT READING THE DOCS

//     return this.name // why can we not just say name, why add this?
// }

UserSchema.methods.createJWT = function () {
    // remember -> in the function, we can access the document, by using the below
    // (I think I meant to say using "this")
    return jwt.sign(
        { userId: this._id, name: this.name },
         process.env.JWT_SECRET,
    
}

