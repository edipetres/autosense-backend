const mongoose = require("mongoose");
const Schema = mongoose.Schema

const vehicleSchema = new Schema({
  location: {
    latitude: Number,
    longitude: Number
  },
  registration: {
    required: true, 
    type: String
  },
  mileage: Number,
  fuel: {
    level: Number,
    liters: Number
  },
  bat: String
}, {
  timestamps: true
})

module.exports = mongoose.model('Vehicle', vehicleSchema)