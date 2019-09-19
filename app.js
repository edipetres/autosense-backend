'use strict';

const express = require('express')
const sls = require('serverless-http')
const app = express()
const bodyParser = require('body-parser')
const customResponses = require('./src/middlewares/customResponses')
// load env vars in development mode
require('dotenv').config()

app.use(bodyParser.json({limit: '50mb'}))
app.use(customResponses)

// enable cors and preflight requests
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  next();
})

// connect to Mongo
require('./src/config/mongodb')(app)
// init routes
require('./src/app/index')(app)

// default route for /
app.get('/', async (req, res, next) => {
  res.status(200).send('Hello, this is a serverless Autosense Backend!')
})

// export server object for serverless framework to use
module.exports.server = sls(app)
