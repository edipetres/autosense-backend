// This file imports the objects from ./sample.js into the database
// Run from the CLI with node to import the data

// load local env vars (store the Mongo connection string here in dev)
require('dotenv').config() 
const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URL
require('../vehicles/model') // load model
const sampleData = require('./sample').data
const vehicleRepository = require('../vehicles/repository.js')

const run = async () => {
  // First wait for DB connection
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  const savedCount = await vehicleRepository.importVehicles(sampleData) || 0
  console.log(`Successfully saved ${savedCount} vehicles into the database`)

  mongoose.connection.close(function () {
    process.exit(0)
  })

}

run()