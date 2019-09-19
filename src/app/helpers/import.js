// This file imports the objects from ./sample.js into the database
// Run from the CLI with node to import the data

require('dotenv').config() // load local env vars
const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URL
require('../vehicles/model') // load model
const sampleData = require('./sample').data
const vehicleRepository = require('../vehicles/repository.js')

// First connect to DB
const run = async () => {
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