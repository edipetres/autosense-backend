const repository = require('./repository')

exports.getAllVehicles = async (req, res) => {
  try {
    const allVehicles = await repository.getAllVehicles()
    return res.success(allVehicles)
  } catch (error) {
    console.error('Error getting all vehicles, see further error log below.')
    return res.preconditionFailed(error)
  }
}

// Updates the registration number of one vehicle
// Must match the ID specified in req params with an object in DB
exports.updateVehicle = async (req, res) => {
  const id = req.params.id
  const newRegistrationNumber = req.body.newRegistrationNumber

  if (!id || !newRegistrationNumber)
    return res.preconditionFailed('Must provide a valid document ID and registration number.')

  try {
    const updatedVehicle = await repository.updateVehicle(id, newRegistrationNumber)
    return res.success(updatedVehicle)
    
  } catch (error) {
    return res.preconditionFailed(error)
  }

}