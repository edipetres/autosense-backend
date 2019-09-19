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