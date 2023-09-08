import bcrypt from "bcrypt"; // allows for password encryption
import jwt from "jsonwebtoken"; // sends a user a web token they will use for authorization
import User from "../models/User.js"; // Model -> how the data will be structured in MongoDB

/* REGISTER USER */
export const register = async (req, res) => { // making a call to the database -> so async
  // req -> is coming from the frontend
  // res -> is what the server sends back
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body; //  grab this from the frontend, destructured from the request body

    const salt = await bcrypt.genSalt(); // generate salt we then use to encrypt the password
    const passwordHash = await bcrypt.hash(password, salt); // hash them together
    // <<<<<<<<<I AM NOT FOCUSED ON THE PROCESS BUT IN A RUSH TO THEM END GOAL>>>>>>>>>>>

    // the way the register function will work
    //  we encrypt the password and then save it
    // after we save it and when the user tries to login, 
    // they provide the password, we are salt that again
    // we make sure it is the correct one and give them a JSON web token


};
