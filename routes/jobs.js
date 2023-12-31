const express = require('express')

const router = express.Router()
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} = require('../controllers/jobs')

router.route('/').post(createJob).get(getAllJobs)

