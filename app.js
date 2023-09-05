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

const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1)
app.use(rateLimiter({
  windowsMS: 15 * 60 * 1000, // 15 minutes
  max: 100,// limit each IP to 100 Requests per windowMs
})) // we wanna set it up as our first middleware
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


app.use(express.json());
// extra packages 

// a dummy route -> so we know we've deployed the application
app.get('/', (req, res) => {
  res.send(' The Jobs API')
})
// routes or middleware
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

