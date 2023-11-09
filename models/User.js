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
    

        
    },

})





