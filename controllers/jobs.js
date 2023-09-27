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

const getJob = async (req, res) => {
    const { 
        user: { userId }, // nested destructuring
     params: { id: jobId } // nested destructure and aliasing (renaming)
    } = req

    const job = await Job.findOne({
        // we wanna check for both otherwise someone can just get the ID and access the job
        _id: jobId,
        createdBy: userId,
    })

    if (!job) {
        throw new NotFoundError(`couldn't find that job you asked of`)
    }
    res.status(StatusCodes.CREATED).json({ job })
    // res.send('a single job you get')
}



const createJob = async (req, res) => {
    // we wanna create on req.body a new property on req.body the name of createdBy ->
    // in job model, that is what we call the property ()
    console.log(req.body.createdBy)
    // he added the property on req.body -> and it is located here req.user.userId 
    // i think he added this line because -> he didnt want to get confused using different IDs 
    req.body.createdBy = req.user.userId // we need this to search for jobs and update jobs
    // we set createdby property to be equal to the user
     console.log(req.body.createdBy)
// we are missing is that user, it located in the req.user, what we are really looking for is the ID
    const job = await Job.create(req.body) 
    res.status(StatusCodes.CREATED).json({ job })
    // res.json(req.user)
}

const updateJob = async (req, res) => {
    const { 
        user: { userId }, // nested destructuring
        body: { company, position },
     params: { id: jobId }, // nested destructure and aliasing (renaming)
    } = req
    // res.send('Update those Jobs')

    if ( company === '' || position === '' ) {
        // he will talk about why he prefers setting uo the check in the controllers 
        throw new BadRequestError|(' hey hey company or position cannot not be with words')
    }

    const job = await Job
        .findByIdAndUpdate(
            { _id: jobId, createdBy: userId},
            req.body, { new: true, runValidators: true} // the update body
            )

    if (!job) {
        throw new NotFoundError(`Not any job with such an id of numerical value ${jobId}`)
    }
}



// setup the functions as object and then export them

