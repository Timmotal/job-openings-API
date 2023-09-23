const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

// CRUD Functionality
const getAllJobs = async (req, res) => {
    // that user property is going to be in every request, since in the app.js
    // we place the auth middleware -> infront of all of our jobs route
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt') // feel this once more -> avoid IDs
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length  })
    // res.send('get all tha frigging jobs')
}





