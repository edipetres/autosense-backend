const mongoose = require("mongoose");
const Vehicle = mongoose.model('Vehicle')

exports.getAllVehicles = async () => {
  return await Vehicle.find({})
}

exports.importVehicles = async (vehicles) => {
  let saveCount = 0

  for (let vehicleObject of vehicles) {
    const vehicleDocument = new Vehicle(vehicleObject)
    await vehicleDocument.save()
    saveCount++
  }

  return saveCount
}

exports.updateVehicle = async (id, newRegistrationNumber) => {
  const updatedVehicle = await Vehicle.findByIdAndUpdate(id, {
    $set: {
      registration: newRegistrationNumber
    }
  }, {
    new: true
  })

  return updatedVehicle
}