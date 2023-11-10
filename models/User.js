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
  
        // maxLength: 50, // removed because of hashedPasswords
    },

})





