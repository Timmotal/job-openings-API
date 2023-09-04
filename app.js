require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// <<<<<<<--EXTRA-SECURITY-PACKAGES-->>>>>>>>>>>
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit') // will need a little bit of configuration

// connectDB
const connectDB = require('./db/connect')





