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
